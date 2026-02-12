import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Search, Calendar, MapPin, Ticket } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import moment from 'moment';

import PageHeader from '@/components/ui/PageHeader';

const categories = [
  { value: 'all', label: 'Все', emoji: '✨' },
  { value: 'concert', label: 'Концерты', emoji: '🎵' },
  { value: 'theater', label: 'Театр', emoji: '🎭' },
  { value: 'sport', label: 'Спорт', emoji: '⚽' },
  { value: 'wrestling', label: 'Борьба', emoji: '🤼' },
  { value: 'ysyakh', label: 'Ысыах', emoji: '☀️' },
  { value: 'exhibition', label: 'Выставки', emoji: '🎨' },
];

export default function Events() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const { data: events = [] } = useQuery({
    queryKey: ['events'],
    queryFn: () => base44.entities.Event.list('date_start', 50),
  });

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title?.toLowerCase().includes(search.toLowerCase()) ||
                         event.location?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'all' || event.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const formatPrice = (event) => {
    if (event.is_free) return 'Бесплатно';
    if (event.price_min) return `от ${event.price_min} ₽`;
    return 'Уточняется';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <PageHeader title="Афиша" subtitle="События региона" action=""/>

      <div className="max-w-lg mx-auto px-4 py-4 space-y-5 pb-24">
        {/* Search */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            placeholder="Поиск событий"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-12 bg-white/80 backdrop-blur border-slate-200/50 h-14 rounded-2xl shadow-lg"
          />
        </motion.div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.value}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <Badge
                variant={activeCategory === cat.value ? 'default' : 'secondary'}
                className={`px-4 py-2.5 cursor-pointer whitespace-nowrap transition-all text-sm ${
                  activeCategory === cat.value 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 shadow-lg' 
                    : 'bg-white/80 backdrop-blur hover:bg-white border-slate-200/50'
                }`}
                onClick={() => setActiveCategory(cat.value)}
              >
                <span className="mr-1.5">{cat.emoji}</span>
                {cat.label}
              </Badge>
            </motion.div>
          ))}
        </div>

        {/* Events List */}
        <div className="space-y-4">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => {
              const config = categories.find(c => c.value === event.category) || categories[0];
              const isToday = moment(event.date_start).isSame(moment(), 'day');
              
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white/80 backdrop-blur rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer group border border-white/50"
                >
                  <div className="flex">
                    {event.image_url ? (
                      <div className="w-32 h-32 flex-shrink-0 overflow-hidden">
                        <img 
                          src={event.image_url} 
                          alt={event.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ) : (
                      <div className="w-32 h-32 flex-shrink-0 bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                        <span className="text-4xl">{config.emoji}</span>
                      </div>
                    )}
                    <div className="flex-1 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-purple-100 text-purple-700 border-0 text-xs">
                          {config.emoji} {config.label}
                        </Badge>
                        {isToday && (
                          <Badge className="bg-red-500 text-white border-0 text-xs">Сегодня</Badge>
                        )}
                      </div>
                      <h3 className="font-bold text-slate-800 line-clamp-2 mb-2 group-hover:text-purple-600 transition-colors">
                        {event.title}
                      </h3>
                      <div className="space-y-1 text-sm text-slate-500">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-slate-400" />
                          <span>{moment(event.date_start).format('D MMM, HH:mm')}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-slate-400" />
                            <span className="truncate">{event.location}</span>
                          </div>
                          <span className={`font-semibold ${event.is_free ? 'text-green-600' : 'text-slate-800'}`}>
                            {formatPrice(event)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
              <div className="w-20 h-20 rounded-3xl bg-purple-50 flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-10 h-10 text-purple-300" />
              </div>
              <p className="text-slate-500">Нет событий</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}