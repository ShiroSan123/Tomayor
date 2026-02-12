import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Sun, Calendar, MapPin, Clock, Car, Navigation, ChevronRight, Sparkles, Users, Music, Utensils } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import moment from 'moment';

import PageHeader from '@/components/ui/PageHeader';

const eventTypes = {
  ceremony: { label: 'Обряд', emoji: '🙏', color: 'from-amber-500 to-yellow-400' },
  concert: { label: 'Концерт', emoji: '🎵', color: 'from-purple-500 to-pink-400' },
  competition: { label: 'Состязание', emoji: '🏆', color: 'from-red-500 to-rose-400' },
  workshop: { label: 'Мастер-класс', emoji: '🎨', color: 'from-cyan-500 to-blue-400' },
  food: { label: 'Кухня', emoji: '🍖', color: 'from-orange-500 to-amber-400' },
  exhibition: { label: 'Выставка', emoji: '🖼️', color: 'from-green-500 to-emerald-400' },
  other: { label: 'Другое', emoji: '✨', color: 'from-slate-500 to-gray-400' }
};

const parkingZones = [
  { id: 1, name: 'P1 — Главная', spots: 500, free: 120, distance: '5 мин' },
  { id: 2, name: 'P2 — Восточная', spots: 300, free: 85, distance: '8 мин' },
  { id: 3, name: 'P3 — VIP', spots: 50, free: 12, distance: '2 мин' },
];

const zones = [
  { id: 'main', name: 'Главная сцена', emoji: '🎪' },
  { id: 'ritual', name: 'Ритуальная поляна', emoji: '🔥' },
  { id: 'craft', name: 'Город мастеров', emoji: '🎨' },
  { id: 'food', name: 'Гастрозона', emoji: '🍖' },
  { id: 'sport', name: 'Спортплощадка', emoji: '🏋️' },
  { id: 'kids', name: 'Детская зона', emoji: '🎠' },
];

export default function Ysyakh() {
  const [activeTab, setActiveTab] = useState('schedule');
  const [selectedDate, setSelectedDate] = useState('2026-06-21');

  const { data: events = [] } = useQuery({
    queryKey: ['ysyakh-events'],
    queryFn: () => base44.entities.YsyakhEvent.list('date_start', 100),
  });

  const filteredEvents = events.filter(e => moment(e.date_start).format('YYYY-MM-DD') === selectedDate);
  const mainEvents = filteredEvents.filter(e => e.is_main);
  const sortedEvents = filteredEvents.sort((a, b) => new Date(a.date_start) - new Date(b.date_start));

  const daysUntil = moment('2026-06-21').diff(moment(), 'days');

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <PageHeader title="Ысыах Туймаады" subtitle="21-22 июня 2026" action=""/>

      <div className="max-w-lg mx-auto px-4 py-4 space-y-5 pb-24">
        {/* Hero Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-amber-400 via-yellow-400 to-orange-400 p-6 text-white shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-48 h-48 opacity-30">
            <Sun className="w-full h-full animate-spin-slow" style={{ animationDuration: '20s' }} />
          </div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/20 rounded-full blur-2xl" />
          
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <Badge className="bg-white/30 backdrop-blur border-0 text-white">
                <Sparkles className="w-3 h-3 mr-1" />
                Главный праздник Якутии
              </Badge>
            </div>
            
            <h2 className="text-3xl font-bold mb-2">Ыһыах Туймаады</h2>
            <p className="text-white/90 mb-4">Встреча солнца • Ус Хатын</p>
            
            <div className="flex items-center gap-4">
              <div className="bg-white/20 backdrop-blur rounded-2xl px-4 py-3 text-center">
                <p className="text-3xl font-bold">{daysUntil > 0 ? daysUntil : 0}</p>
                <p className="text-xs text-white/80">дней до</p>
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>21-22 июня 2026</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>Ус Хатын, Якутск</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full bg-white/80 backdrop-blur rounded-2xl p-1.5 h-auto shadow-lg">
            <TabsTrigger value="schedule" className="flex-1 rounded-xl py-2.5 text-xs data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-yellow-500 data-[state=active]:text-white transition-all">
              <Calendar className="w-4 h-4 mr-1" />
              Расписание
            </TabsTrigger>
            <TabsTrigger value="map" className="flex-1 rounded-xl py-2.5 text-xs data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-yellow-500 data-[state=active]:text-white transition-all">
              <MapPin className="w-4 h-4 mr-1" />
              Карта
            </TabsTrigger>
            <TabsTrigger value="parking" className="flex-1 rounded-xl py-2.5 text-xs data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-yellow-500 data-[state=active]:text-white transition-all">
              <Car className="w-4 h-4 mr-1" />
              Парковки
            </TabsTrigger>
          </TabsList>

          <TabsContent value="schedule" className="mt-5 space-y-4">
            {/* Date Selector */}
            <div className="flex gap-3">
              {['2026-06-21', '2026-06-22'].map(date => (
                <button
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={`flex-1 p-4 rounded-2xl border-2 transition-all ${
                    selectedDate === date 
                      ? 'border-amber-400 bg-amber-50' 
                      : 'border-slate-200 bg-white hover:border-amber-200'
                  }`}
                >
                  <p className="font-bold text-slate-800">{moment(date).format('D MMMM')}</p>
                  <p className="text-sm text-slate-500">{date === '2026-06-21' ? 'День 1' : 'День 2'}</p>
                </button>
              ))}
            </div>

            {/* Main Event */}
            {mainEvents.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-amber-500 to-yellow-400 rounded-2xl p-4 text-white"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm font-medium">Главное событие</span>
                </div>
                <h3 className="font-bold text-lg">{mainEvents[0].title}</h3>
                <p className="text-sm text-white/80 mt-1">
                  {moment(mainEvents[0].date_start).format('HH:mm')} • {mainEvents[0].location_zone}
                </p>
              </motion.div>
            )}

            {/* Timeline */}
            <div className="space-y-3">
              {sortedEvents.map((event, index) => {
                const type = eventTypes[event.event_type] || eventTypes.other;
                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="bg-white/80 backdrop-blur rounded-2xl p-4 shadow-lg border border-white/50 flex gap-4"
                  >
                    <div className="text-center w-14">
                      <p className="text-lg font-bold text-slate-800">{moment(event.date_start).format('HH:mm')}</p>
                      <p className="text-xs text-slate-400">{moment(event.date_end).format('HH:mm')}</p>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{type.emoji}</span>
                        <Badge className="bg-slate-100 text-slate-600 border-0 text-xs">{type.label}</Badge>
                      </div>
                      <h4 className="font-semibold text-slate-800">{event.title}</h4>
                      {event.location_zone && (
                        <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3" />
                          {event.location_zone}
                        </p>
                      )}
                    </div>
                  </motion.div>
                );
              })}

              {sortedEvents.length === 0 && (
                <div className="text-center py-12">
                  <Sun className="w-16 h-16 text-amber-200 mx-auto mb-4" />
                  <p className="text-slate-500">Программа формируется</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="map" className="mt-5 space-y-4">
            {/* Zone List */}
            <div className="grid grid-cols-2 gap-3">
              {zones.map((zone, index) => (
                <motion.div
                  key={zone.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white/80 backdrop-blur rounded-2xl p-4 shadow-lg border border-white/50 cursor-pointer hover:shadow-xl transition-all"
                >
                  <span className="text-3xl mb-2 block">{zone.emoji}</span>
                  <p className="font-semibold text-slate-800 text-sm">{zone.name}</p>
                </motion.div>
              ))}
            </div>

            <Button className="w-full h-14 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-semibold">
              <Navigation className="w-5 h-5 mr-2" />
              Открыть навигатор
            </Button>

            <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200">
              <p className="text-sm text-amber-800">
                <strong>💡 Совет:</strong> Скачайте офлайн-карту заранее — на территории может быть слабый интернет
              </p>
            </div>
          </TabsContent>

          <TabsContent value="parking" className="mt-5 space-y-4">
            {parkingZones.map((parking, index) => (
              <motion.div
                key={parking.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white/80 backdrop-blur rounded-2xl p-4 shadow-lg border border-white/50"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                      <Car className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">{parking.name}</h4>
                      <p className="text-sm text-slate-500">{parking.distance} до входа</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-300" />
                </div>
                
                <div className="flex items-center justify-between bg-slate-50 rounded-xl p-3">
                  <div>
                    <p className="text-2xl font-bold text-green-600">{parking.free}</p>
                    <p className="text-xs text-slate-500">свободно</p>
                  </div>
                  <div className="w-px h-10 bg-slate-200" />
                  <div>
                    <p className="text-2xl font-bold text-slate-800">{parking.spots}</p>
                    <p className="text-xs text-slate-500">всего мест</p>
                  </div>
                  <div className="w-24 h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"
                      style={{ width: `${(parking.free / parking.spots) * 100}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200">
              <p className="text-sm text-blue-800">
                <strong>🚌 Бесплатные автобусы</strong> от автовокзала каждые 15 минут с 5:00
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}