import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { 
  Bus, 
  Ship, 
  CreditCard, 
  Calendar, 
  ShoppingBag, 
  Newspaper,
  Snowflake,
  Trophy,
  TreePine,
  Crosshair,
  Building2,
  Heart
} from 'lucide-react';

const actions = [
  { icon: Bus, label: 'Транспорт', page: 'Transport', gradient: 'from-blue-500 to-cyan-400' },
  { icon: Ship, label: 'Переправа', page: 'Ferry', gradient: 'from-cyan-500 to-teal-400' },
  { icon: CreditCard, label: 'ЖКХ', page: 'Payments', gradient: 'from-emerald-500 to-green-400' },
  { icon: Calendar, label: 'Афиша', page: 'Events', gradient: 'from-purple-500 to-pink-400' },
  { icon: ShoppingBag, label: 'Маркет', page: 'Market', gradient: 'from-orange-500 to-amber-400' },
  { icon: Newspaper, label: 'Новости', page: 'News', gradient: 'from-rose-500 to-red-400' },
  { icon: Snowflake, label: 'Актировка', page: 'Actuated', gradient: 'from-sky-500 to-blue-400' },
  { icon: Trophy, label: 'Борьба', page: 'Wrestling', gradient: 'from-amber-500 to-yellow-400' },
  { icon: TreePine, label: 'Ысыах', page: 'Ysyakh', gradient: 'from-amber-400 to-yellow-400' },
  { icon: Heart, label: 'Традиции', page: 'Traditions', gradient: 'from-purple-500 to-violet-400' },
  { icon: Crosshair, label: 'Спорт', page: 'Sports', gradient: 'from-green-500 to-emerald-400' },
];

// Future modules (can be easily enabled)
const futureModules = [
  { icon: Crosshair, label: 'Охотник', page: 'Hunter', gradient: 'from-stone-500 to-zinc-400', soon: true },
  { icon: Building2, label: 'Услуги', page: 'Services', gradient: 'from-indigo-500 to-violet-400', soon: true },
];

export default function QuickActions({ showFuture = false }) {
  const allActions = showFuture ? [...actions, ...futureModules] : actions;

  return (
    <div className="grid grid-cols-4 gap-4">
      {allActions.map((action, index) => (
        <motion.div
          key={action.label}
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ 
            delay: index * 0.05, 
            type: 'spring', 
            stiffness: 400, 
            damping: 20 
          }}
        >
          {action.soon ? (
            <div className="flex flex-col items-center gap-2 group opacity-50">
              <div className={`bg-gradient-to-br ${action.gradient} w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg relative`}>
                <action.icon className="w-6 h-6 text-white" />
                <span className="absolute -top-1 -right-1 text-[8px] bg-slate-800 text-white px-1.5 py-0.5 rounded-full">
                  скоро
                </span>
              </div>
              <span className="text-xs font-medium text-slate-400 text-center">{action.label}</span>
            </div>
          ) : (
            <Link 
              to={createPageUrl(action.page)}
              className="flex flex-col items-center gap-2 group"
            >
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className={`bg-gradient-to-br ${action.gradient} w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg shadow-slate-300/50 group-hover:shadow-xl transition-shadow`}
              >
                <action.icon className="w-6 h-6 text-white" />
              </motion.div>
              <span className="text-xs font-medium text-slate-600 text-center group-hover:text-slate-900 transition-colors">
                {action.label}
              </span>
            </Link>
          )}
        </motion.div>
      ))}
    </div>
  );
}