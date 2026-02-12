import React from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, ChevronRight, Navigation } from 'lucide-react';

export default function RouteCard({ route, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, type: 'spring' }}
      className="bg-white/80 backdrop-blur rounded-2xl p-4 shadow-lg shadow-slate-200/30 hover:shadow-xl transition-all cursor-pointer group border border-white/50"
    >
      <div className="flex items-center gap-4">
        <motion.div 
          whileHover={{ scale: 1.05, rotate: 5 }}
          className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/30"
        >
          {route.number}
        </motion.div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-slate-800 truncate">{route.name}</h3>
          <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>каждые {route.interval} мин</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-slate-400" />
              <span>{route.stops_count} ост.</span>
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="flex items-center gap-2 mb-1">
            <Navigation className="w-4 h-4 text-green-500" />
            <span className="text-lg font-bold text-green-600">{route.next_arrival}</span>
          </div>
          <p className="text-xs text-slate-400">ближайший</p>
        </div>
        
        <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-500 group-hover:translate-x-1 transition-all" />
      </div>
    </motion.div>
  );
}