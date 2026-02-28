import { motion } from "framer-motion";
import { useMemo } from "react";

const DataStreamBackground = () => {
  const streams = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 10,
      opacity: 0.05 + Math.random() * 0.1,
      chars: Array.from({ length: 20 }, () =>
        String.fromCharCode(0x30A0 + Math.random() * 96)
      ).join(""),
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[hsl(220,30%,5%)] to-background" />

      {/* Data streams */}
      {streams.map((stream) => (
        <motion.div
          key={stream.id}
          className="absolute top-0 font-mono text-xs text-crest-blue whitespace-nowrap writing-mode-vertical"
          style={{
            left: `${stream.x}%`,
            opacity: stream.opacity,
            writingMode: "vertical-rl",
          }}
          animate={{ y: ["-100%", "100vh"] }}
          transition={{
            duration: stream.duration,
            delay: stream.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {stream.chars}
        </motion.div>
      ))}

      {/* Overlay gradient for fading effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
    </div>
  );
};

export default DataStreamBackground;
