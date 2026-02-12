import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Search, Calendar, MapPin, Clock, Users, Dumbbell, Trophy, ChevronRight, Phone, Accessibility } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import moment from 'moment';

import PageHeader from '@/components/ui/PageHeader';

const sportTypes = {
  football: { label: 'Футбол', emoji: '⚽', color: 'from-green-500 to-emerald-400' },
  basketball: { label: 'Баскетбол', emoji: '🏀', color: 'from-orange-500 to-amber-400' },
  volleyball: { label: 'Волейбол', emoji: '🏐', color: 'from-blue-500 to-cyan-400' },
  hockey: { label: 'Хоккей', emoji: '🏒', color: 'from-cyan-500 to-blue-400' },
  swimming: { label: 'Плавание', emoji: '🏊', color: 'from-sky-500 to-blue-400' },
  athletics: { label: 'Лёгкая атлетика', emoji: '🏃', color: 'from-red-500 to-rose-400' },
  skiing: { label: 'Лыжи', emoji: '⛷️', color: 'from-slate-500 to-gray-400' },
  mas_wrestling: { label: 'Мас-рестлинг', emoji: '🪵', color: 'from-amber-600 to-yellow-500' },
  archery: { label: 'Стрельба из лука', emoji: '🎯', color: 'from-purple-500 to-violet-400' },
  jumping: { label: 'Прыжки', emoji: '🦘', color: 'from-pink-500 to-rose-400' },
  other: { label: 'Другое', emoji: '🏅', color: 'from-slate-500 to-gray-400' }
};

const eventTypes = {
  training: { label: 'Тренировка', color: 'bg-blue-100 text-blue-700' },
  competition: { label: 'Соревнование', color: 'bg-red-100 text-red-700' },
  open_lesson: { label: 'Открытое занятие', color: 'bg-green-100 text-green-700' },
  championship: { label: 'Чемпионат', color: 'bg-amber-100 text-amber-700' }
};

const venueTypes = {
  stadium: { label: 'Стадион', emoji: '🏟️' },
  gym: { label: 'Спортзал', emoji: '🏋️' },
  pool: { label: 'Бассейн', emoji: '🏊' },
  ice_rink: { label: 'Каток', emoji: '⛸️' },
  outdoor: { label: 'Открытая', emoji: '🌳' },
  complex: { label: 'Комплекс', emoji: '🏢' }
};

export default function Sports() {
  const [activeTab, setActiveTab] = useState('events');
  const [search, setSearch] = useState('');
  const [activeSport, setActiveSport] = useState('all');

  const { data: events = [] } = useQuery({
    queryKey: ['sport-events'],
    queryFn: () => base44.entities.SportEvent.list('date_start', 50),
  });

  const { data: venues = [] } = useQuery({
    queryKey: ['sport-venues'],
    queryFn: () => base44.entities.SportVenue.list('name', 50),
  });

  const filteredEvents = events.filter(e => {
    const matchesSport = activeSport === 'all' || e.sport_type === activeSport;
    const matchesSearch = e.title?.toLowerCase().includes(search.toLowerCase()) ||
                         e.venue_name?.toLowerCase().includes(search.toLowerCase());
    return matchesSport && matchesSearch;
  });

  const filteredVenues = venues.filter(v => 
    v.name?.toLowerCase().includes(search.toLowerCase()) ||
    v.address?.toLowerCase().includes(search.toLowerCase())
  );

  const upcomingEvents = filteredEvents.filter(e => moment(e.date_start).isAfter(moment()));
  const todayEvents = filteredEvents.filter(e => moment(e.date_start).isSame(moment(), 'day'));

  const sportsList = [
    { value: 'all', label: 'Все', emoji: '🏅' },
    ...Object.entries(sportTypes).map(([key, val]) => ({ value: key, ...val }))
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <PageHeader title="Спорт" subtitle="Тренировки и события" action=""/>

      <div className="max-w-lg mx-auto px-4 py-4 space-y-5 pb-24">
        {/* Search */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            placeholder="Поиск по виду спорта или месту"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-12 bg-white/80 backdrop-blur border-slate-200/50 h-14 rounded-2xl shadow-lg"
          />
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Сегодня', value: todayEvents.length, icon: Calendar, color: 'from-green-500 to-emerald-400' },
            { label: 'На неделе', value: upcomingEvents.filter(e => moment(e.date_start).isBefore(moment().add(7, 'days'))).length, icon: Dumbbell, color: 'from-blue-500 to-cyan-400' },
            { label: 'Объектов', value: venues.length, icon: MapPin, color: 'from-purple-500 to-violet-400' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur rounded-2xl p-3 text-center shadow-lg border border-white/50"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-2 shadow-lg`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-xl font-bold text-slate-800">{stat.value}</p>
              <p className="text-xs text-slate-500">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full bg-white/80 backdrop-blur rounded-2xl p-1.5 h-auto shadow-lg">
            <TabsTrigger value="events" className="flex-1 rounded-xl py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white transition-all">
              <Calendar className="w-4 h-4 mr-2" />
              Расписание
            </TabsTrigger>
            <TabsTrigger value="venues" className="flex-1 rounded-xl py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white transition-all">
              <MapPin className="w-4 h-4 mr-2" />
              Объекты
            </TabsTrigger>
          </TabsList>

          <TabsContent value="events" className="mt-5 space-y-4">
            {/* Sport Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
              {sportsList.slice(0, 8).map((sport, index) => (
                <motion.div
                  key={sport.value}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <Badge
                    variant={activeSport === sport.value ? 'default' : 'secondary'}
                    className={`px-3 py-2 cursor-pointer whitespace-nowrap transition-all text-sm ${
                      activeSport === sport.value 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 shadow-lg' 
                        : 'bg-white/80 backdrop-blur hover:bg-white border-slate-200/50'
                    }`}
                    onClick={() => setActiveSport(sport.value)}
                  >
                    <span className="mr-1">{sport.emoji}</span>
                    {sport.label}
                  </Badge>
                </motion.div>
              ))}
            </div>

            {/* Events List */}
            <div className="space-y-3">
              {upcomingEvents.map((event, index) => {
                const sport = sportTypes[event.sport_type] || sportTypes.other;
                const eventType = eventTypes[event.event_type] || eventTypes.training;
                const isToday = moment(event.date_start).isSame(moment(), 'day');
                
                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="bg-white/80 backdrop-blur rounded-2xl p-4 shadow-lg border border-white/50 hover:shadow-xl transition-all"
                  >
                    <div className="flex gap-4">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${sport.color} flex items-center justify-center shadow-lg text-2xl`}>
                        {sport.emoji}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className={`${eventType.color} border-0 text-xs`}>{eventType.label}</Badge>
                          {isToday && <Badge className="bg-green-500 text-white border-0 text-xs">Сегодня</Badge>}
                          {event.is_free && <Badge className="bg-emerald-100 text-emerald-700 border-0 text-xs">Бесплатно</Badge>}
                        </div>
                        <h4 className="font-bold text-slate-800">{event.title}</h4>
                        <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{moment(event.date_start).format('D MMM, HH:mm')}</span>
                          </div>
                          {event.venue_name && (
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              <span className="truncate">{event.venue_name}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-300 self-center" />
                    </div>
                  </motion.div>
                );
              })}

              {upcomingEvents.length === 0 && (
                <div className="text-center py-12">
                  <Dumbbell className="w-16 h-16 text-green-200 mx-auto mb-4" />
                  <p className="text-slate-500">Нет предстоящих событий</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="venues" className="mt-5 space-y-4">
            {filteredVenues.map((venue, index) => {
              const type = venueTypes[venue.venue_type] || venueTypes.complex;
              
              return (
                <motion.div
                  key={venue.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white/80 backdrop-blur rounded-2xl overflow-hidden shadow-lg border border-white/50"
                >
                  {venue.image_url && (
                    <div className="h-32 overflow-hidden">
                      <img src={venue.image_url} alt={venue.name} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">{type.emoji}</span>
                      <Badge className="bg-slate-100 text-slate-600 border-0 text-xs">{type.label}</Badge>
                      {venue.is_accessible && (
                        <Badge className="bg-blue-100 text-blue-700 border-0 text-xs">
                          <Accessibility className="w-3 h-3 mr-0.5" />
                          Доступно
                        </Badge>
                      )}
                    </div>
                    <h4 className="font-bold text-slate-800 mb-1">{venue.name}</h4>
                    <p className="text-sm text-slate-500 flex items-center gap-1 mb-3">
                      <MapPin className="w-4 h-4" />
                      {venue.address}
                    </p>
                    
                    {venue.sports_available?.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {venue.sports_available.slice(0, 4).map(s => {
                          const sp = sportTypes[s];
                          return sp ? (
                            <Badge key={s} className="bg-green-50 text-green-700 border-0 text-xs">
                              {sp.emoji} {sp.label}
                            </Badge>
                          ) : null;
                        })}
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      {venue.working_hours && (
                        <p className="text-sm text-slate-500 flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {venue.working_hours}
                        </p>
                      )}
                      {venue.phone && (
                        <Button size="sm" variant="outline" className="rounded-xl">
                          <Phone className="w-4 h-4 mr-1" />
                          Позвонить
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {filteredVenues.length === 0 && (
              <div className="text-center py-12">
                <MapPin className="w-16 h-16 text-green-200 mx-auto mb-4" />
                <p className="text-slate-500">Объекты не найдены</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}