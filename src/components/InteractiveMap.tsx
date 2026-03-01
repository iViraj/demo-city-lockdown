import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, Info } from 'lucide-react';

const BUILDINGS = [
  {
    id: 'hospital',
    name: 'Hospital Basement',
    description: 'Safe during lightning. Dangerous during floods.',
    x: 20, y: 30, width: 60, height: 80,
    color: 'bg-emerald-500/20 border-emerald-500',
  },
  {
    id: 'apartments',
    name: 'High-Rise Apartments',
    description: 'Safe during floods. Dangerous during tornadoes.',
    x: 100, y: 50, width: 40, height: 120,
    color: 'bg-blue-500/20 border-blue-500',
  },
  {
    id: 'shops',
    name: 'Downtown Shops',
    description: 'Good for finding items. High risk of blackout.',
    x: 160, y: 40, width: 80, height: 40,
    color: 'bg-amber-500/20 border-amber-500',
  },
  {
    id: 'park',
    name: 'Central Park',
    description: 'Open area. High risk of lightning strikes.',
    x: 60, y: 140, width: 120, height: 60,
    color: 'bg-green-500/20 border-green-500',
  },
];

export default function InteractiveMap() {
  const [selectedBuilding, setSelectedBuilding] = useState<typeof BUILDINGS[0] | null>(null);

  return (
    <div className="relative w-full max-w-3xl mx-auto aspect-video bg-zinc-900/50 rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      
      {/* City Layout */}
      <div className="relative w-full h-full p-8">
        <div className="relative w-full h-full border border-white/5 rounded-lg bg-zinc-950/50">
          {BUILDINGS.map((building) => (
            <motion.div
              key={building.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              onClick={() => setSelectedBuilding(building)}
              className={`absolute cursor-pointer border-2 transition-all duration-300 group ${building.color} rounded-md shadow-lg hover:shadow-glow`}
              style={{
                left: `${building.x}%`,
                top: `${building.y}%`,
                width: `${building.width}px`,
                height: `${building.height}px`,
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <MapPin className="text-white drop-shadow-md" size={20} />
              </div>
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold uppercase tracking-widest text-white/50 opacity-0 group-hover:opacity-100 transition-opacity">
                {building.name}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Popup */}
      <AnimatePresence>
        {selectedBuilding && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute inset-0 flex items-center justify-center p-6 z-20 bg-zinc-950/80 backdrop-blur-sm"
          >
            <div className="relative w-full max-w-sm bg-zinc-900 border border-white/20 rounded-xl p-6 shadow-2xl">
              <button
                onClick={() => setSelectedBuilding(null)}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
              
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-electric-purple/20 rounded-lg text-electric-purple">
                  <Info size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white font-display uppercase tracking-tight">
                    {selectedBuilding.name}
                  </h3>
                  <div className="h-1 w-12 bg-electric-purple mt-1" />
                </div>
              </div>
              
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                {selectedBuilding.description}
              </p>
              
              <button
                onClick={() => setSelectedBuilding(null)}
                className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-lg transition-colors uppercase text-xs tracking-widest"
              >
                Close Map Info
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-4 left-4 flex items-center gap-2 text-[10px] font-bold text-white/30 uppercase tracking-widest">
        <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
        Interactive City Map v1.0.4
      </div>
    </div>
  );
}
