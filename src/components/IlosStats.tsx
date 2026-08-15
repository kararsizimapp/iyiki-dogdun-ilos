import React from 'react';
import { motion } from 'motion/react';
import { BarChart3, Sparkles } from 'lucide-react';
import { funnyStats } from '../data/ilosData';

export const IlosStats: React.FC = () => {
  return (
    <section id="stats-section" className="py-20 px-4 sm:px-6 relative">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-800/40 text-purple-300 text-xs font-mono-code mb-3">
            <BarChart3 className="w-3.5 h-3.5 text-purple-400" />
            <span>SAHNE 12 • İSTATİSTİKLER</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            İloş İstatistikleri
          </h2>
          <p className="text-sm sm:text-base text-purple-300/70 max-w-lg mx-auto mt-2">
            Bilimsel geçerliliği olmayan ama doğruluğu tartışmasız 10 temel veri.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {funnyStats.map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -3 }}
              className="p-4 rounded-2xl bg-purple-950/40 border border-purple-800/40 hover:border-purple-600/50 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono-code text-purple-400 uppercase tracking-wider block mb-1">
                  {stat.label}
                </span>
                <div className="text-xl sm:text-2xl font-bold font-mono-code text-pink-300">
                  {stat.value}
                </div>
              </div>

              <p className="text-[11px] text-purple-200/70 mt-3 font-serif-italic pt-2 border-t border-purple-900/40">
                {stat.note}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
