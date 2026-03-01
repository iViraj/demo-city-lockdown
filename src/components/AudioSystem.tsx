import { useState, useEffect, useRef } from 'react';
import { Howl } from 'howler';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'motion/react';

export default function AudioSystem() {
  const [isMuted, setIsMuted] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const soundRef = useRef<Howl | null>(null);

  useEffect(() => {
    // Storm ambience sound
    soundRef.current = new Howl({
      src: ['https://assets.mixkit.co/active_storage/sfx/2569/2569-preview.mp3'], // Thunder and rain
      loop: true,
      volume: 0.3,
      autoplay: false,
    });

    const handleInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        if (!isMuted) {
          soundRef.current?.play();
        }
      }
    };

    window.addEventListener('click', handleInteraction);
    window.addEventListener('scroll', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      soundRef.current?.unload();
    };
  }, [hasInteracted, isMuted]);

  const toggleMute = () => {
    if (isMuted) {
      soundRef.current?.play();
      setIsMuted(false);
    } else {
      soundRef.current?.pause();
      setIsMuted(true);
    }
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleMute}
      className="fixed top-6 right-6 z-[100] bg-zinc-900/80 backdrop-blur-md border border-white/10 p-3 rounded-full text-white hover:bg-zinc-800 transition-colors shadow-lg"
      aria-label="Toggle Sound"
    >
      {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} className="text-neon-cyan" />}
      {!hasInteracted && (
        <span className="absolute -bottom-10 right-0 whitespace-nowrap text-xs text-white/50 animate-pulse">
          Click to enable sound
        </span>
      )}
    </motion.button>
  );
}

