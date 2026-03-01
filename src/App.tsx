import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Eye, 
  Shield, 
  Zap, 
  Waves, 
  Wind, 
  CloudLightning, 
  AlertTriangle, 
  Users, 
  Flashlight, 
  PlusSquare, 
  Radio, 
  Umbrella,
  ChevronRight,
  ArrowRight,
  Info,
  MapPin
} from 'lucide-react';
import StormBackground from './components/StormBackground';
import AudioSystem from './components/AudioSystem';
import InteractiveMap from './components/InteractiveMap';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const [playerCount, setPlayerCount] = useState(1284);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlayerCount(prev => prev + Math.floor(Math.random() * 5) - 2);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-zinc-950 selection:bg-electric-purple selection:text-white">
      <StormBackground />
      <AudioSystem />

      {/* Warning Banner */}
      <div className="fixed top-0 left-0 w-full z-[90] bg-emergency-red/90 backdrop-blur-sm border-b border-white/10 py-2 overflow-hidden shadow-lg">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex items-center gap-12 whitespace-nowrap text-white font-bold uppercase text-[10px] tracking-[0.2em]"
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <AlertTriangle size={14} className="animate-pulse" />
              <span>STORM WARNING ACTIVE: EVACUATE TO SHELTER IMMEDIATELY</span>
              <AlertTriangle size={14} className="animate-pulse" />
              <span>CITY LOCKDOWN IN EFFECT</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <motion.div 
          style={{ opacity, scale }}
          className="z-10 max-w-5xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
          >
            <Users size={14} className="text-neon-cyan" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">
              <span className="text-neon-cyan">{playerCount.toLocaleString()}</span> Players Surviving Now
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, type: "spring", bounce: 0.4 }}
            className="text-7xl md:text-9xl font-display font-black text-white uppercase tracking-tighter leading-none mb-6 drop-shadow-[0_0_30px_rgba(106,92,255,0.5)]"
          >
            CITY<br />LOCKDOWN
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-xl md:text-2xl text-zinc-400 font-medium tracking-wide mb-12 max-w-2xl mx-auto"
          >
            Survive the Storm. Outrun the Disaster. <br className="hidden md:block" />
            The city is your playground, and your prison.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(106,92,255,0.6)" }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-10 py-5 bg-electric-purple text-white font-black uppercase tracking-widest rounded-xl overflow-hidden transition-all shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span className="relative flex items-center gap-3">
                <Play fill="currentColor" size={20} />
                PLAY ON ROBLOX
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-white/5 border border-white/20 text-white font-black uppercase tracking-widest rounded-xl transition-all backdrop-blur-md"
            >
              <span className="flex items-center gap-3">
                <Eye size={20} />
                WATCH GAMEPLAY
              </span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
        >
          <span className="text-[10px] font-bold uppercase tracking-widest">Scroll to Explore</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
        </motion.div>
      </section>

      {/* Gameplay Section */}
      <section className="relative py-32 px-6 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-display font-black text-white uppercase tracking-tight mb-4">
              HOW IT WORKS
            </h2>
            <div className="h-1.5 w-24 bg-electric-purple mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "RUN", desc: "Avoid disasters.", icon: Zap, color: "text-warning-yellow" },
              { title: "HIDE", desc: "Find shelter.", icon: Shield, color: "text-neon-cyan" },
              { title: "SURVIVE", desc: "Earn rewards.", icon: PlusSquare, color: "text-emergency-red" }
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                whileHover={{ y: -10, rotateX: 5, rotateY: 5 }}
                className="group relative p-12 bg-zinc-900/50 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-md"
              >
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                  <card.icon size={120} />
                </div>
                <card.icon className={cn("mb-8", card.color)} size={48} />
                <h3 className="text-4xl font-black text-white uppercase mb-4 tracking-tighter">{card.title}</h3>
                <p className="text-zinc-400 text-lg font-medium">{card.desc}</p>
                <div className="mt-8 h-1 w-0 group-hover:w-full bg-electric-purple transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Disaster Showcase Section */}
      <section className="relative py-32 px-6 bg-zinc-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <div className="text-left">
              <h2 className="text-4xl md:text-6xl font-display font-black text-white uppercase tracking-tight mb-4">
                DISASTERS
              </h2>
              <p className="text-zinc-500 font-bold uppercase tracking-widest text-sm">The city reacts to the storm in real-time</p>
            </div>
            <div className="h-px flex-1 bg-white/10 hidden md:block mb-6 mx-12" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { 
                name: "TORNADO", 
                desc: "Pulls players and objects into the sky.", 
                icon: Wind, 
                color: "bg-zinc-800",
                img: "https://picsum.photos/seed/tornado/800/600"
              },
              { 
                name: "FLOOD", 
                desc: "Water rises in streets. Find high ground.", 
                icon: Waves, 
                color: "bg-blue-900/20",
                img: "https://picsum.photos/seed/flood/800/600"
              },
              { 
                name: "LIGHTNING", 
                desc: "Strikes open areas. Stay indoors.", 
                icon: CloudLightning, 
                color: "bg-yellow-900/20",
                img: "https://picsum.photos/seed/lightning/800/600"
              },
              { 
                name: "BLACKOUT", 
                desc: "Power shuts down. Use your flashlight.", 
                icon: Zap, 
                color: "bg-zinc-950",
                img: "https://picsum.photos/seed/darkness/800/600"
              }
            ].map((disaster, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="group relative h-[400px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
              >
                <img 
                  src={disaster.img} 
                  alt={disaster.name}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                
                <div className="absolute bottom-0 left-0 p-10 w-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md">
                      <disaster.icon className="text-white" size={24} />
                    </div>
                    <h3 className="text-3xl font-black text-white uppercase tracking-tighter">{disaster.name}</h3>
                  </div>
                  <p className="text-zinc-400 text-lg max-w-md">{disaster.desc}</p>
                </div>

                <div className="absolute top-6 right-6">
                  <div className="px-4 py-1.5 bg-emergency-red text-white text-[10px] font-black uppercase tracking-widest rounded-md animate-pulse">
                    Critical Threat
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-display font-black text-white uppercase tracking-tight mb-4">
            THE CITY
          </h2>
          <p className="text-zinc-500 font-bold uppercase tracking-widest text-sm mb-16">Explore the map and find your survival strategy</p>
          
          <InteractiveMap />
        </div>
      </section>

      {/* Video Section */}
      <section className="relative py-32 px-6 bg-zinc-900/20">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative aspect-video rounded-3xl overflow-hidden border-4 border-electric-purple/30 shadow-[0_0_50px_rgba(106,92,255,0.2)] group cursor-pointer"
          >
            <img 
              src="https://picsum.photos/seed/gameplay/1280/720" 
              alt="Gameplay Preview"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-24 h-24 bg-electric-purple rounded-full flex items-center justify-center shadow-2xl"
              >
                <Play fill="white" size={40} className="ml-2" />
              </motion.div>
            </div>
            <div className="absolute bottom-8 left-8 flex items-center gap-3">
              <div className="w-3 h-3 bg-emergency-red rounded-full animate-ping" />
              <span className="text-white font-black uppercase tracking-widest text-sm">Live Gameplay Preview</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-32 px-6 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-display font-black text-white uppercase tracking-tight mb-4">
              FEATURES
            </h2>
            <div className="h-1.5 w-24 bg-neon-cyan mx-auto rounded-full shadow-[0_0_10px_#00eaff]" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Random Storms", desc: "No two rounds are ever the same.", icon: CloudLightning },
              { title: "Real-Time Danger", desc: "Disasters evolve as you play.", icon: AlertTriangle },
              { title: "Multiplayer Survival", desc: "Team up or go solo to survive.", icon: Users },
              { title: "Dynamic Map", desc: "The city changes with every disaster.", icon: MapPin }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-zinc-900/30 border border-white/5 rounded-2xl hover:border-neon-cyan/50 transition-colors group"
              >
                <feature.icon className="text-neon-cyan mb-6 group-hover:scale-110 transition-transform" size={32} />
                <h3 className="text-xl font-bold text-white uppercase mb-2 tracking-tight">{feature.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Items Section */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-display font-black text-white uppercase tracking-tight mb-20 text-center">
            SURVIVAL ITEMS
          </h2>

          <div className="flex gap-8 overflow-x-auto pb-12 scrollbar-hide snap-x">
            {[
              { name: "Flashlight", desc: "Essential during blackouts.", icon: Flashlight },
              { name: "Medkit", desc: "Heal after disaster strikes.", icon: PlusSquare },
              { name: "Radio", desc: "Get early storm warnings.", icon: Radio },
              { name: "Umbrella", desc: "Stay dry, but watch for wind.", icon: Umbrella }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="min-w-[300px] snap-center p-10 bg-zinc-900/80 border border-white/10 rounded-3xl flex flex-col items-center text-center group"
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                  className="mb-8 p-6 bg-electric-purple/20 rounded-2xl text-electric-purple group-hover:bg-electric-purple group-hover:text-white transition-colors"
                >
                  <item.icon size={48} />
                </motion.div>
                <h3 className="text-2xl font-black text-white uppercase mb-2 tracking-tight">{item.name}</h3>
                <p className="text-zinc-500 font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="relative py-32 px-6 bg-electric-purple/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-display font-black text-white uppercase tracking-tight mb-12">
            WHY CITY LOCKDOWN?
          </h2>
          
          <div className="space-y-8">
            {[
              "No safe zones. Every round is a fight for life.",
              "Dynamic city reactions. No two storms are the same.",
              "Real-time multiplayer chaos with 50+ players.",
              "Unlock rare gear and customize your survivor."
            ].map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-6 p-6 bg-zinc-900/50 border-l-4 border-electric-purple rounded-r-xl text-left"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-electric-purple rounded-full flex items-center justify-center text-white font-black">
                  {i + 1}
                </div>
                <p className="text-xl text-white font-bold tracking-tight">{point}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-48 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/stormy-city/1920/1080')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-zinc-950" />
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-6xl md:text-8xl font-display font-black text-white uppercase tracking-tighter mb-12"
          >
            CAN YOU <span className="text-electric-purple">SURVIVE?</span>
          </motion.h2>

          <motion.button
            whileHover={{ scale: 1.1, boxShadow: "0 0 50px rgba(106,92,255,0.8)" }}
            whileTap={{ scale: 0.9 }}
            className="group relative px-16 py-8 bg-white text-zinc-950 font-black uppercase tracking-[0.2em] text-xl rounded-2xl overflow-hidden transition-all"
          >
            <span className="relative z-10 flex items-center gap-4">
              PLAY NOW
              <ArrowRight size={24} />
            </span>
            <div className="absolute inset-0 bg-electric-purple translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="absolute inset-0 bg-electric-purple opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>

          <div className="mt-16 flex items-center justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all">
            <img src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Roblox_logo.svg" alt="Roblox" className="h-8 invert" />
            <div className="w-px h-8 bg-white/20" />
            <span className="text-white font-black uppercase tracking-widest text-sm">Available on PC, Mobile & Console</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-6 border-t border-white/5 bg-zinc-950">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <h4 className="text-xl font-display font-black text-white tracking-tight">CITY LOCKDOWN</h4>
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">© 2026 Storm Studios. Not an official Roblox product.</p>
          </div>
          
          <div className="flex items-center gap-8">
            {["Terms", "Privacy", "Support", "Community"].map((link) => (
              <a key={link} href="#" className="text-zinc-500 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors">
                {link}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-white hover:bg-electric-purple transition-colors cursor-pointer">
              <Info size={20} />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

