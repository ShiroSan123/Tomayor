import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Home, Bus, CreditCard, Newspaper, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { icon: Home, label: 'Главная', page: 'Home' },
  { icon: Bus, label: 'Транспорт', page: 'Transport' },
  { icon: CreditCard, label: 'ЖКХ', page: 'Payments' },
  { icon: Newspaper, label: 'Новости', page: 'News' },
  { icon: User, label: 'Профиль', page: 'Home' },
];

export default function Layout({ children, currentPageName }) {
  const showNav = ['Home', 'Transport', 'Payments', 'News', 'Events', 'Market'].includes(currentPageName);

  return (
    <div className="min-h-screen bg-slate-50">
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        @supports (padding-bottom: env(safe-area-inset-bottom)) {
          .safe-area-pb {
            padding-bottom: calc(env(safe-area-inset-bottom) + 0.5rem);
          }
        }
      `}</style>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPageName}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {showNav && (
        <motion.nav 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-slate-100/50 safe-area-pb z-50"
        >
          <div className="max-w-lg mx-auto px-2">
            <div className="flex items-center justify-around py-2">
              {navItems.map((item) => {
                const isActive = currentPageName === item.page;
                return (
                  <Link
                    key={item.label}
                    to={createPageUrl(item.page)}
                    className="relative flex flex-col items-center gap-1 py-2 px-4 rounded-2xl transition-all"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl"
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                    <motion.div
                      whileTap={{ scale: 0.9 }}
                      className={`relative z-10 ${isActive ? 'text-blue-600' : 'text-slate-400'}`}
                    >
                      <item.icon className={`w-6 h-6 ${isActive ? 'stroke-[2.5]' : ''}`} />
                    </motion.div>
                    <span className={`relative z-10 text-[10px] font-medium ${isActive ? 'text-blue-600' : 'text-slate-400'}`}>
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </motion.nav>
      )}
    </div>
  );
}