import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, ChevronRight, Flame, Waves, Wind } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const alertTypes = {
  actuated: {
    icon: AlertTriangle,
    gradient: 'from-amber-500 to-orange-500',
    title: 'Актированный день',
  },
  fire: {
    icon: Flame,
    gradient: 'from-red-500 to-orange-500',
    title: 'Пожароопасность',
  },
  flood: {
    icon: Waves,
    gradient: 'from-blue-500 to-cyan-500',
    title: 'Паводок',
  },
  storm: {
    icon: Wind,
    gradient: 'from-slate-600 to-slate-800',
    title: 'Штормовое предупреждение',
  },
};

export default function AlertBanner({ 
  type = 'actuated', 
  message, 
  linkTo,
  onDismiss 
}) {
  const config = alertTypes[type] || alertTypes.actuated;
  const Icon = config.icon;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        className={`bg-gradient-to-r ${config.gradient} rounded-2xl p-4 text-white shadow-lg relative overflow-hidden`}
      >
        <motion.div 
          className="absolute inset-0 bg-white/10"
          animate={{ x: ['0%', '100%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          style={{ width: '50%', transform: 'skewX(-20deg)' }}
        />
        
        <div className="relative flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
            <Icon className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm">{config.title}</p>
            <p className="text-xs text-white/80 truncate">{message}</p>
          </div>
          {linkTo && (
            <Link 
              to={createPageUrl(linkTo)}
              className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </Link>
          )}
          {onDismiss && (
            <button 
              onClick={onDismiss}
              className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}