import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Ticket, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import moment from 'moment';

const categoryConfig = {
  ysyakh: { label: 'Ысыах', gradient: 'from-amber-500 to-yellow-400', emoji: '☀️' },
  wrestling: { label: 'Борьба', gradient: 'from-red-500 to-rose-400', emoji: '🤼' },
  concert: { label: 'Концерт', gradient: 'from-purple-500 to-pink-400', emoji: '🎵' },
  exhibition: { label: 'Выставка', gradient: 'from-cyan-500 to-blue-400', emoji: '🎨' },
  sport: { label: 'Спорт', gradient: 'from-green-500 to-emerald-400', emoji: '⚽' },
  theater: { label: 'Театр', gradient: 'from-rose-500 to-red-400', emoji: '🎭' },
  cinema: { label: 'Кино', gradient: 'from-blue-500 to-indigo-400', emoji: '🎬' },
  other: { label: 'Другое', gradient: 'from-slate-500 to-gray-400', emoji: '📌' }
};

export default function EventCard({ event, index = 0 }) {
  const config = categoryConfig[event.category] || categoryConfig.other;
  
  const formatPrice = () => {
    if (event.is_free) return 'Бесплатно';
    if (event.price_min && event.price_max && event.price_min !== event.price_max) {
      return `${event.price_min} — ${event.price_max} ₽`;
    }
    if (event.price_min) return `от ${event.price_min} ₽`;
    return 'Уточняется';
  };

  const isToday = moment(event.date_start).isSame(moment(), 'day');
  const isTomorrow = moment(event.date_start).isSame(moment().add(1, 'day'), 'day');

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, type: 'spring', stiffness: 300 }}
      className="flex-shrink-0 w-72 bg-white rounded-3xl overflow-hidden shadow-lg shadow-slate-200/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group border border-slate-100/50"
    >
      <div className={`h-32 bg-gradient-to-br ${config.gradient} relative overflow-hidden`}>
        {event.image_url ? (
          <img 
            src={event.image_url} 
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl opacity-30">{config.emoji}</span>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <Badge className="bg-white/90 text-slate-800 border-0 backdrop-blur-sm font-medium">
            {config.label}
          </Badge>
        </div>
        {(isToday || isTomorrow) && (
          <div className="absolute top-3 right-3">
            <Badge className={`${isToday ? 'bg-red-500' : 'bg-amber-500'} text-white border-0`}>
              {isToday ? 'Сегодня' : 'Завтра'}
            </Badge>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-slate-800 line-clamp-2 mb-3 group-hover:text-blue-600 transition-colors">
          {event.title}
        </h3>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-slate-600">
            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
              <Calendar className="w-4 h-4 text-slate-500" />
            </div>
            <div>
              <p className="font-medium">{moment(event.date_start).format('D MMMM')}</p>
              <p className="text-xs text-slate-400">{moment(event.date_start).format('HH:mm')}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-slate-600">
            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-4 h-4 text-slate-500" />
            </div>
            <span className="line-clamp-1">{event.location}</span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Ticket className="w-4 h-4 text-slate-400" />
            <span className={`text-sm font-semibold ${event.is_free ? 'text-green-600' : 'text-slate-800'}`}>
              {formatPrice()}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}