import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const CosmicBackground = () => {
  const [stars, setStars] = useState<{ x: number; y: number; size: number; delay: number }[]>([]);

  useEffect(() => {
    const newStars = Array.from({ length: 80 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 3,
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Cosmic nebula gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-[hsl(260,50%,8%)] to-[hsl(220,50%,8%)]" />

      {/* Animated nebula clouds */}
      <motion.div
        className="absolute top-1/4 -left-1/4 w-[60vw] h-[60vw] rounded-full bg-[hsl(260,70%,20%)] blur-[100px] opacity-20"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-1/4 right-0 w-[50vw] h-[50vw] rounded-full bg-[hsl(220,70%,20%)] blur-[100px] opacity-20"
        animate={{
          x: [0, -30, 0],
          y: [0, -50, 0],
          scale: [1.1, 1, 1.1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Stars */}
      {stars.map((star, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-foreground"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{
            duration: 2,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Hexagonal grid overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='52' viewBox='0 0 60 52' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 26-30 26L0 26z' fill='none' stroke='%233B82F6' stroke-opacity='0.3'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 52px",
        }}
      />

      {/* Pulsing hexagon accent */}
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='52' viewBox='0 0 60 52' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 26-30 26L0 26z' fill='none' stroke='%233B82F6' stroke-opacity='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 52px",
        }}
        animate={{ opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};

export default CosmicBackground;
