import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Search, MapPin, Thermometer, Bus, Navigation } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

import PageHeader from '@/components/ui/PageHeader';
import TransportMap from '@/components/transport/TransportMap';
import RouteCard from '@/components/transport/RouteCard';

const mockRoutes = [
  { number: '1', name: 'Авиапорт — Сергелях', interval: '8', stops_count: 24, next_arrival: '2 мин' },
  { number: '3', name: 'Покровский тракт — ЦУМ', interval: '10', stops_count: 18, next_arrival: '5 мин' },
  { number: '7', name: 'Птицефабрика — Рынок', interval: '12', stops_count: 21, next_arrival: '8 мин' },
  { number: '14', name: 'Залог — Автовокзал', interval: '15', stops_count: 16, next_arrival: '3 мин' },
];

export default function Transport() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('map');

  const { data: stops = [] } = useQuery({
    queryKey: ['stops'],
    queryFn: () => base44.entities.TransportStop.list('-created_date', 100),
  });

  const warmStops = stops.filter(s => s.is_warm && s.status === 'active');
  const filteredStops = stops.filter(s => 
    s.name?.toLowerCase().includes(search.toLowerCase()) ||
    s.routes?.some(r => r.includes(search))
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <PageHeader title="Транспорт" subtitle="Умный город" action=""/>

      <div className="max-w-lg mx-auto px-4 py-4 space-y-4">
        {/* Search */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            placeholder="Поиск остановки или маршрута"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-12 bg-white/80 backdrop-blur border-slate-200/50 h-14 rounded-2xl shadow-lg shadow-slate-200/30 focus:shadow-xl transition-shadow"
          />
        </motion.div>

        {/* Warm stops banner */}
        {warmStops.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-4 text-white shadow-lg shadow-orange-500/30"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
                <Thermometer className="w-7 h-7" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold">Тёплые остановки</h3>
                <p className="text-sm text-white/80">{warmStops.length} работают сейчас</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">+18°</p>
                <p className="text-xs text-white/70">внутри</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full bg-white/80 backdrop-blur rounded-2xl p-1.5 h-auto shadow-lg shadow-slate-200/30">
            <TabsTrigger value="map" className="flex-1 rounded-xl py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all">
              <MapPin className="w-4 h-4 mr-2" />
              Карта
            </TabsTrigger>
            <TabsTrigger value="routes" className="flex-1 rounded-xl py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all">
              <Bus className="w-4 h-4 mr-2" />
              Маршруты
            </TabsTrigger>
          </TabsList>

          <TabsContent value="map" className="mt-4 space-y-4">
            <TransportMap stops={filteredStops.length > 0 ? filteredStops : stops} />
            
            {/* Nearby stops */}
            <div className="space-y-3">
              <h3 className="font-bold text-slate-800">Рядом с вами</h3>
              {(filteredStops.length > 0 ? filteredStops : stops).slice(0, 5).map((stop, index) => (
                <motion.div
                  key={stop.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white/80 backdrop-blur rounded-2xl p-4 flex items-center gap-4 shadow-lg shadow-slate-200/30 hover:shadow-xl transition-all cursor-pointer border border-white/50"
                >
                  <div className={`w-12 h-12 rounded-xl ${stop.is_warm ? 'bg-gradient-to-br from-orange-500 to-amber-500' : 'bg-gradient-to-br from-blue-500 to-cyan-500'} flex items-center justify-center shadow-lg`}>
                    {stop.is_warm ? (
                      <Thermometer className="w-5 h-5 text-white" />
                    ) : (
                      <Bus className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-800">{stop.name}</p>
                    {stop.routes?.length > 0 && (
                      <div className="flex gap-1 mt-1 overflow-x-auto">
                        {stop.routes.slice(0, 4).map(route => (
                          <Badge key={route} variant="secondary" className="text-xs px-2 py-0 bg-slate-100">
                            {route}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  {stop.is_warm && stop.temperature_inside && (
                    <span className="text-orange-600 font-bold">{stop.temperature_inside}°</span>
                  )}
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="routes" className="mt-4 space-y-3">
            {mockRoutes.map((route, index) => (
              <RouteCard key={route.number} route={route} index={index} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}