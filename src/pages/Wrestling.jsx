import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Users, Play, Calendar, MapPin, ChevronRight, Swords, Radio } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

import PageHeader from '@/components/ui/PageHeader';

const mockTournaments = [
  { id: 1, name: 'Республиканский турнир', date: '2026-02-15', location: 'Триумф', status: 'live', participants: 64 },
  { id: 2, name: 'Кубок Главы РС(Я)', date: '2026-03-01', location: 'Дохсун', status: 'upcoming', participants: 128 },
  { id: 3, name: 'Игры Манчаары', date: '2026-06-21', location: 'Ус Хатын', status: 'upcoming', participants: 256 },
];

const mockMatches = [
  { id: 1, mat: 1, wrestler1: 'Иванов А.', wrestler2: 'Петров Б.', category: 'до 70 кг', status: 'live', score: '2:1' },
  { id: 2, mat: 2, wrestler1: 'Сидоров В.', wrestler2: 'Николаев Г.', category: 'до 80 кг', status: 'live', score: '0:0' },
  { id: 3, mat: 3, wrestler1: 'Федоров Д.', wrestler2: 'Алексеев Е.', category: 'до 90 кг', status: 'upcoming', score: null },
];

export default function Wrestling() {
  const [activeTab, setActiveTab] = useState('live');

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <PageHeader title="Хапсагай" subtitle="Вольная борьба" action=""/>

      <div className="max-w-lg mx-auto px-4 py-4 space-y-5 pb-24">
        {/* Live Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-red-500 via-rose-500 to-pink-500 p-6 text-white shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-40 h-40 opacity-20">
            <Swords className="w-full h-full" />
          </div>
          
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur rounded-full px-3 py-1.5">
                <Radio className="w-4 h-4 animate-pulse" />
                <span className="text-sm font-medium">Прямая трансляция</span>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold mb-2">Республиканский турнир</h2>
            
            <div className="flex items-center gap-4 text-sm text-white/80">
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                <span>64 участника</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                <span>СК Триумф</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full bg-white/80 backdrop-blur rounded-2xl p-1.5 h-auto shadow-lg">
            <TabsTrigger value="live" className="flex-1 rounded-xl py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-rose-500 data-[state=active]:text-white transition-all">
              <Play className="w-4 h-4 mr-2" />
              Сейчас
            </TabsTrigger>
            <TabsTrigger value="tournaments" className="flex-1 rounded-xl py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-rose-500 data-[state=active]:text-white transition-all">
              <Trophy className="w-4 h-4 mr-2" />
              Турниры
            </TabsTrigger>
          </TabsList>

          <TabsContent value="live" className="mt-5 space-y-4">
            <h3 className="font-bold text-slate-800">Активные ковры</h3>
            {mockMatches.map((match, index) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white/80 backdrop-blur rounded-3xl p-5 shadow-lg hover:shadow-xl transition-all cursor-pointer border border-white/50"
              >
                <div className="flex items-center justify-between mb-4">
                  <Badge className={`${match.status === 'live' ? 'bg-red-500' : 'bg-slate-500'} text-white border-0`}>
                    {match.status === 'live' ? (
                      <><span className="w-2 h-2 bg-white rounded-full mr-1.5 animate-pulse inline-block" />Ковёр {match.mat}</>
                    ) : (
                      `Ковёр ${match.mat} — Скоро`
                    )}
                  </Badge>
                  <span className="text-sm text-slate-500">{match.category}</span>
                </div>
                
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center mx-auto mb-2">
                      <span className="text-2xl">🔵</span>
                    </div>
                    <p className="font-bold text-slate-800">{match.wrestler1}</p>
                  </div>
                  
                  <div className="w-20 text-center">
                    {match.score ? (
                      <p className="text-2xl font-bold text-slate-800">{match.score}</p>
                    ) : (
                      <p className="text-lg font-medium text-slate-400">VS</p>
                    )}
                  </div>
                  
                  <div className="flex-1 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-100 to-red-50 flex items-center justify-center mx-auto mb-2">
                      <span className="text-2xl">🔴</span>
                    </div>
                    <p className="font-bold text-slate-800">{match.wrestler2}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="tournaments" className="mt-5 space-y-4">
            {mockTournaments.map((tournament, index) => (
              <motion.div
                key={tournament.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white/80 backdrop-blur rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all cursor-pointer border border-white/50"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ${
                    tournament.status === 'live' 
                      ? 'bg-gradient-to-br from-red-500 to-rose-500' 
                      : 'bg-gradient-to-br from-amber-500 to-orange-500'
                  }`}>
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-800">{tournament.name}</h3>
                      {tournament.status === 'live' && (
                        <Badge className="bg-red-500 text-white border-0 text-[10px]">LIVE</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-sm text-slate-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(tournament.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{tournament.participants}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-300" />
                </div>
              </motion.div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}