import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

const AnimatedBackground = () => {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();

  // Scroll-based transformations for parallax effect
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const codeOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.15, 0.3, 0.25, 0.15]
  );
  const circuitScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1, 1.1, 1.05]
  );
  const blueprintRotate = useTransform(scrollYProgress, [0, 1], [0, 15]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Vintage code snippets and mathematical symbols for dadCoder aesthetic
  const codeSymbols = [
    '{ }',
    '<>',
    '( )',
    '[ ]',
    '=>',
    '!=',
    '===',
    '||',
    '&&',
    'fn',
    'var',
    'let',
    'def',
    '∑',
    '∫',
    'π',
    'λ',
    '∞',
    'Σ',
    '01',
    '10',
    'if',
    'else',
    'for',
    'while',
    'return',
    'class',
  ];

  // Generate vintage floating code elements
  const floatingElements = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    symbol: codeSymbols[Math.floor(Math.random() * codeSymbols.length)],
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 30 + 20,
    delay: Math.random() * 5,
    size: Math.random() * 20 + 14,
  }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Sophisticated gradient with vintage computing colors */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-amber-50/20 via-slate-50/10 to-emerald-50/15 dark:from-amber-900/10 dark:via-slate-900/20 dark:to-emerald-950/15 animate-gradient-slow"
        style={{ y: backgroundY }}
      />

      {/* Mesh Gradient Orbs - Vintage terminal/amber glow */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-400/20 dark:bg-amber-500/25 rounded-full blur-3xl"
          style={{ scale: circuitScale }}
          animate={{
            opacity: [0.2, 0.4, 0.2],
            x: [0, 30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute top-2/3 right-1/4 w-80 h-80 bg-emerald-400/15 dark:bg-emerald-500/20 rounded-full blur-3xl"
          style={{ y: backgroundY }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            x: [0, -30, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-slate-400/10 dark:bg-slate-500/15 rounded-full blur-3xl"
          style={{ scale: circuitScale }}
          animate={{
            opacity: [0.15, 0.35, 0.15],
            x: [0, 40, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 4,
          }}
        />
      </div>

      {/* Floating Code Symbols & Mathematical Notations - dadCoder theme */}
      {mounted && (
        <motion.div
          className="absolute inset-0"
          style={{ opacity: codeOpacity }}
        >
          {floatingElements.map((element) => (
            <motion.div
              key={element.id}
              className="absolute font-mono font-bold text-amber-600/40 dark:text-amber-400/30 select-none"
              style={{
                fontSize: `${element.size}px`,
                left: `${element.x}%`,
                top: `${element.y}%`,
              }}
              animate={{
                y: [0, -50, 0],
                opacity: [0.2, 0.4, 0.2],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: element.duration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: element.delay,
              }}
            >
              {element.symbol}
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Vintage Blueprint Grid Pattern */}
      <motion.div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(217, 119, 6, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(217, 119, 6, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          y: backgroundY,
        }}
      />

      {/* Sophisticated Circuit Lines - Monocle-inspired precision */}
      <motion.svg
        className="absolute inset-0 w-full h-full opacity-[0.04] dark:opacity-[0.08]"
        style={{ rotate: blueprintRotate }}
      >
        <defs>
          <pattern
            id="circuit"
            x="0"
            y="0"
            width="200"
            height="200"
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx="50"
              cy="50"
              r="2"
              fill="currentColor"
              className="text-amber-600 dark:text-amber-400"
            />
            <line
              x1="50"
              y1="50"
              x2="150"
              y2="50"
              stroke="currentColor"
              strokeWidth="1"
              className="text-amber-600 dark:text-amber-400"
            />
            <line
              x1="150"
              y1="50"
              x2="150"
              y2="150"
              stroke="currentColor"
              strokeWidth="1"
              className="text-amber-600 dark:text-amber-400"
            />
            <circle
              cx="150"
              cy="150"
              r="2"
              fill="currentColor"
              className="text-amber-600 dark:text-amber-400"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit)" />
      </motion.svg>

      {/* Vintage Paper Texture Overlay */}
      <div
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.025] mix-blend-multiply dark:mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />

      {/* Animated Vintage Spotlight - like a desk lamp on code */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-full bg-gradient-to-b from-amber-300/10 via-transparent to-transparent opacity-40 dark:opacity-30"
        animate={{
          opacity: [0.2, 0.4, 0.2],
          scaleX: [1, 1.15, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Subtle Vignette - Monocle focus effect */}
      <div
        className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-background/20 dark:to-background/30"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 0%, transparent 60%, rgba(0,0,0,0.1) 100%)',
        }}
      />

      {/* Vintage Computing Corner Decorations - Punch Card aesthetic */}
      {mounted && (
        <>
          {/* Top Left Corner */}
          <motion.div
            className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-amber-600/20 dark:border-amber-400/30"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-amber-600/40 dark:bg-amber-400/50" />
          </motion.div>

          {/* Top Right Corner */}
          <motion.div
            className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-amber-600/20 dark:border-amber-400/30"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-600/40 dark:bg-amber-400/50" />
          </motion.div>

          {/* Bottom Left Corner */}
          <motion.div
            className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-emerald-600/20 dark:border-emerald-400/30"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <div className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-emerald-600/40 dark:bg-emerald-400/50" />
          </motion.div>

          {/* Bottom Right Corner */}
          <motion.div
            className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-emerald-600/20 dark:border-emerald-400/30"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
          >
            <div className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full bg-emerald-600/40 dark:bg-emerald-400/50" />
          </motion.div>
        </>
      )}
    </div>
  );
};

export default AnimatedBackground;
