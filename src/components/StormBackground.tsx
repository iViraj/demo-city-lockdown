import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function StormBackground() {
  const [lightning, setLightning] = useState(false);
  const [rainDrops, setRainDrops] = useState<{ id: number; left: string; delay: string; duration: string }[]>([]);

  useEffect(() => {
    // Generate rain drops
    const drops = Array.from({ length: 100 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 2}s`,
      duration: `${0.5 + Math.random() * 0.5}s`,
    }));
    setRainDrops(drops);

    // Lightning interval
    let timeoutId: NodeJS.Timeout;
    const triggerLightning = () => {
      const delay = 8000 + Math.random() * 7000; // 8-15 seconds
      timeoutId = setTimeout(() => {
        setLightning(true);
        setTimeout(() => setLightning(false), 200);
        triggerLightning();
      }, delay);
    };

    triggerLightning();

    return () => clearTimeout(timeoutId);

  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Dark Sky Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-storm-blue to-zinc-950 opacity-80" />
      
      {/* Clouds */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-[200%] h-full bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] animate-[pulse_10s_infinite]" />
      </div>

      {/* Rain */}
      <div className="absolute inset-0">
        {rainDrops.map((drop) => (
          <div
            key={drop.id}
            className="rain-drop"
            style={{
              left: drop.left,
              animationDelay: drop.delay,
              animationDuration: drop.duration,
            }}
          />
        ))}
      </div>

      {/* Lightning Flash */}
      <AnimatePresence>
        {lightning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0.4, 0.8, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-white z-50"
          />
        )}
      </AnimatePresence>

      {/* Fog/Mist */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-zinc-950 to-transparent opacity-60" />
    </div>
  );
}
