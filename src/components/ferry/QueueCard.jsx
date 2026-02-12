import React from 'react';
import { motion } from 'framer-motion';
import { Ship, Car, Truck, Bus as BusIcon, User, Clock, QrCode } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const vehicleConfig = {
  car: { icon: Car, label: 'Легковой', color: 'from-blue-500 to-cyan-400' },
  truck: { icon: Truck, label: 'Грузовой', color: 'from-amber-500 to-orange-400' },
  bus: { icon: BusIcon, label: 'Автобус', color: 'from-green-500 to-emerald-400' },
  pedestrian: { icon: User, label: 'Пешеход', color: 'from-purple-500 to-pink-400' }
};

const statusConfig = {
  waiting: { color: 'bg-amber-100 text-amber-700', label: 'В очереди' },
  boarding: { color: 'bg-green-100 text-green-700', label: 'Посадка' },
  completed: { color: 'bg-slate-100 text-slate-700', label: 'Завершено' },
  cancelled: { color: 'bg-red-100 text-red-700', label: 'Отменено' }
};

export default function QueueCard({ queue, index = 0 }) {
  const vehicle = vehicleConfig[queue.vehicle_type] || vehicleConfig.car;
  const status = statusConfig[queue.status] || statusConfig.waiting;
  const VehicleIcon = vehicle.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white/80 backdrop-blur rounded-3xl overflow-hidden shadow-lg shadow-slate-200/30 border border-white/50"
    >
      <div className={`h-2 bg-gradient-to-r ${vehicle.color}`} />
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${vehicle.color} flex items-center justify-center shadow-lg`}>
              <VehicleIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800">{queue.crossing_name}</h3>
              <p className="text-sm text-slate-500">
                {queue.direction === 'to_yakutsk' ? '→ В Якутск' : '← Из Якутска'}
              </p>
            </div>
          </div>
          <Badge className={`${status.color} border-0`}>{status.label}</Badge>
        </div>

        <div className="grid grid-cols-3 gap-3 p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl">
          <div className="text-center">
            <p className="text-3xl font-bold bg-gradient-to-br from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              {queue.queue_position || '—'}
            </p>
            <p className="text-xs text-slate-500 mt-1">Позиция</p>
          </div>
          <div className="text-center border-x border-slate-200/50">
            <p className="text-lg font-bold text-slate-800">#{queue.ticket_number?.slice(-4) || '—'}</p>
            <p className="text-xs text-slate-500 mt-1">Билет</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-amber-600">~{queue.estimated_wait_minutes || '—'}</p>
            <p className="text-xs text-slate-500 mt-1">минут</p>
          </div>
        </div>

        {queue.status === 'waiting' && (
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-500">
            <QrCode className="w-4 h-4" />
            <span>Показать QR-код при посадке</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}