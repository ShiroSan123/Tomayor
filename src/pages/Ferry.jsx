import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Ship, Plus, Waves, Snowflake, AlertTriangle, Clock, Anchor, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import PageHeader from '@/components/ui/PageHeader';
import QueueCard from '@/components/ferry/QueueCard';

export default function Ferry() {
  const [activeTab, setActiveTab] = useState('ferry');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newQueue, setNewQueue] = useState({
    crossing_name: 'Нижний Бестях — Якутск',
    direction: 'to_yakutsk',
    vehicle_type: 'car',
    phone: ''
  });

  const queryClient = useQueryClient();

  const { data: queues = [] } = useQuery({
    queryKey: ['ferry-queues'],
    queryFn: () => base44.entities.FerryQueue.filter({ status: 'waiting' }, '-created_date', 20),
  });

  const createQueueMutation = useMutation({
    mutationFn: (data) => base44.entities.FerryQueue.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ferry-queues'] });
      setIsDialogOpen(false);
    }
  });

  const handleCreateQueue = () => {
    createQueueMutation.mutate({
      ...newQueue,
      queue_position: queues.length + 1,
      estimated_wait_minutes: (queues.length + 1) * 15,
      ticket_number: `F${Date.now().toString().slice(-6)}`
    });
  };

  const toYakutsk = queues.filter(q => q.direction === 'to_yakutsk');
  const fromYakutsk = queues.filter(q => q.direction === 'from_yakutsk');

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <PageHeader title="Переправа" subtitle="Через Лену" action=""/>

      <div className="max-w-lg mx-auto px-4 py-4 space-y-5 pb-24">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full bg-white/80 backdrop-blur rounded-2xl p-1.5 h-auto shadow-lg">
            <TabsTrigger value="ferry" className="flex-1 rounded-xl py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-white transition-all">
              <Ship className="w-4 h-4 mr-2" />
              Паром
            </TabsTrigger>
            <TabsTrigger value="ice" className="flex-1 rounded-xl py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-white transition-all">
              <Snowflake className="w-4 h-4 mr-2" />
              Ледовая
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ferry" className="mt-5 space-y-5">
            {/* Status Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-500 p-6 text-white shadow-2xl"
            >
              <div className="absolute top-0 right-0 w-40 h-40 opacity-20">
                <Waves className="w-full h-full" />
              </div>
              
              <div className="relative">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
                    <Anchor className="w-7 h-7" />
                  </div>
                  <div>
                    <h2 className="font-bold text-xl">Нижний Бестях — Якутск</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-sm text-white/80">Переправа работает</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-white/10 rounded-2xl backdrop-blur">
                    <p className="text-3xl font-bold">{toYakutsk.length}</p>
                    <p className="text-xs text-white/70 mt-1">В Якутск</p>
                  </div>
                  <div className="text-center p-3 bg-white/10 rounded-2xl backdrop-blur">
                    <p className="text-3xl font-bold">{fromYakutsk.length}</p>
                    <p className="text-xs text-white/70 mt-1">Из Якутска</p>
                  </div>
                  <div className="text-center p-3 bg-white/10 rounded-2xl backdrop-blur">
                    <p className="text-3xl font-bold">~45</p>
                    <p className="text-xs text-white/70 mt-1">мин ожидания</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Add to queue */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full h-14 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90 text-white font-bold text-base shadow-lg">
                  <Plus className="w-5 h-5 mr-2" />
                  Занять очередь онлайн
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md rounded-3xl">
                <DialogHeader>
                  <DialogTitle className="text-xl">Занять очередь</DialogTitle>
                </DialogHeader>
                <div className="space-y-5 pt-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Направление</Label>
                    <Select value={newQueue.direction} onValueChange={(v) => setNewQueue({...newQueue, direction: v})}>
                      <SelectTrigger className="h-12 rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="to_yakutsk">→ В Якутск</SelectItem>
                        <SelectItem value="from_yakutsk">← Из Якутска</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Тип транспорта</Label>
                    <Select value={newQueue.vehicle_type} onValueChange={(v) => setNewQueue({...newQueue, vehicle_type: v})}>
                      <SelectTrigger className="h-12 rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="car">🚗 Легковой</SelectItem>
                        <SelectItem value="truck">🚛 Грузовой</SelectItem>
                        <SelectItem value="bus">🚌 Автобус</SelectItem>
                        <SelectItem value="pedestrian">🚶 Пешеход</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Телефон для уведомлений</Label>
                    <Input 
                      placeholder="+7 (___) ___-__-__"
                      value={newQueue.phone}
                      onChange={(e) => setNewQueue({...newQueue, phone: e.target.value})}
                      className="h-12 rounded-xl"
                    />
                  </div>
                  <Button 
                    onClick={handleCreateQueue}
                    className="w-full h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500"
                    disabled={createQueueMutation.isPending}
                  >
                    {createQueueMutation.isPending ? 'Оформление...' : 'Занять очередь'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Queue list */}
            <div className="space-y-4">
              <h3 className="font-bold text-slate-800">Моя очередь</h3>
              {queues.length > 0 ? (
                queues.map((queue, index) => (
                  <QueueCard key={queue.id} queue={queue} index={index} />
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 rounded-3xl bg-cyan-50 flex items-center justify-center mx-auto mb-4">
                    <Ship className="w-10 h-10 text-cyan-300" />
                  </div>
                  <p className="text-slate-500">Вы пока не в очереди</p>
                  <p className="text-sm text-slate-400 mt-1">Займите место онлайн</p>
                </motion.div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="ice" className="mt-5 space-y-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/80 backdrop-blur rounded-3xl p-6 border border-white/50 shadow-xl"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-lg">
                  <AlertTriangle className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-xl text-slate-800">Ледовая переправа</h2>
                  <p className="text-red-500 font-semibold">Закрыта</p>
                </div>
              </div>
              
              <div className="bg-red-50 rounded-2xl p-4 text-red-700">
                <p className="font-medium mb-1">⚠️ Внимание!</p>
                <p className="text-sm">Выезд на лёд запрещён. Толщина льда недостаточна для безопасного движения.</p>
              </div>
            </motion.div>

            <div className="bg-white/80 backdrop-blur rounded-3xl p-5 shadow-lg">
              <h3 className="font-bold text-slate-800 mb-4">Параметры льда</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-4 text-center">
                  <p className="text-3xl font-bold text-slate-800">42 <span className="text-lg">см</span></p>
                  <p className="text-xs text-slate-500 mt-1">Текущая толщина</p>
                </div>
                <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-4 text-center">
                  <p className="text-3xl font-bold text-cyan-600">70 <span className="text-lg">см</span></p>
                  <p className="text-xs text-slate-500 mt-1">Необходимая</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}