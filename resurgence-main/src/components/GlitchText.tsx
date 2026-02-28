import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface GlitchTextProps {
  fromText: string;
  toText: string;
  className?: string;
}

const GlitchText = ({ fromText, toText, className = "" }: GlitchTextProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isTransformed, setIsTransformed] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; char: string }[]>([]);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end start"]
  });
  
  const progress = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  
  useEffect(() => {
    const unsubscribe = progress.on("change", (value) => {
      if (value > 0.5 && !isTransformed) {
        // Create particles from the text
        const chars = fromText.split("");
        const newParticles = chars.map((char, i) => ({
          id: i,
          x: (Math.random() - 0.5) * 200,
          y: (Math.random() - 0.5) * 200,
          char
        }));
        setParticles(newParticles);
        setIsTransformed(true);
      } else if (value < 0.3 && isTransformed) {
        setIsTransformed(false);
        setParticles([]);
      }
    });
    
    return () => unsubscribe();
  }, [progress, fromText, isTransformed]);

  return (
    <div ref={ref} className={`relative inline-block ${className}`}>
      <AnimatePresence mode="wait">
        {!isTransformed ? (
          <motion.span
            key="from"
            className="relative inline-block glitch-text"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0, 
              scale: 1.1,
              y: -20
            }}
            transition={{ 
              duration: 0.8, 
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            {fromText}
            {/* Glitch layers */}
            <span className="glitch-layer glitch-layer-1" aria-hidden="true">{fromText}</span>
            <span className="glitch-layer glitch-layer-2" aria-hidden="true">{fromText}</span>
          </motion.span>
        ) : (
          <motion.span
            key="to"
            className="inline-block bg-gradient-to-r from-crest-red via-crest-yellow to-crest-green bg-clip-text text-transparent"
            initial={{ 
              opacity: 0, 
              scale: 0.9,
              y: 30
            }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: 0
            }}
            transition={{ 
              duration: 0.9, 
              delay: 0.2,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            {/* Letter-by-letter animation */}
            {toText.split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.4,
                  delay: 0.3 + i * 0.03,
                  ease: "easeOut"
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.span>
        )}
      </AnimatePresence>
      
      {/* Smoother disintegrating particles */}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.span
            key={particle.id}
            className="absolute text-muted-foreground pointer-events-none"
            style={{ left: `${(particle.id / fromText.length) * 100}%` }}
            initial={{ opacity: 0.8, x: 0, y: 0, scale: 1 }}
            animate={{ 
              opacity: 0, 
              x: particle.x * 0.6, 
              y: particle.y * 0.6 - 30, 
              scale: 0.5,
              rotate: (Math.random() - 0.5) * 180
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 1.2, 
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            {particle.char}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default GlitchText;
