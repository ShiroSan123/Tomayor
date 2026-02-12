import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Flame, 
  Droplets, 
  Trash2, 
  Wifi, 
  Phone,
  Building,
  AlertCircle,
  CheckCircle,
  ChevronRight
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const serviceConfig = {
  electricity: { icon: Zap, label: 'Электричество', gradient: 'from-amber-500 to-yellow-400' },
  heating: { icon: Flame, label: 'Отопление', gradient: 'from-red-500 to-orange-400' },
  water: { icon: Droplets, label: 'Водоснабжение', gradient: 'from-blue-500 to-cyan-400' },
  gas: { icon: Flame, label: 'Газ', gradient: 'from-orange-500 to-amber-400' },
  garbage: { icon: Trash2, label: 'Вывоз мусора', gradient: 'from-green-500 to-emerald-400' },
  intercom: { icon: Phone, label: 'Домофон', gradient: 'from-purple-500 to-violet-400' },
  internet: { icon: Wifi, label: 'Интернет', gradient: 'from-cyan-500 to-blue-400' },
  other: { icon: Building, label: 'Другое', gradient: 'from-slate-500 to-gray-400' }
};

const statusConfig = {
  pending: { color: 'bg-amber-100 text-amber-700', label: 'К оплате', icon: AlertCircle },
  paid: { color: 'bg-green-100 text-green-700', label: 'Оплачено', icon: CheckCircle },
  overdue: { color: 'bg-red-100 text-red-700', label: 'Просрочено', icon: AlertCircle }
};

export default function PaymentCard({ payment, index = 0, onPay }) {
  const service = serviceConfig[payment.service_type] || serviceConfig.other;
  const status = statusConfig[payment.status] || statusConfig.pending;
  const ServiceIcon = service.icon;
  const StatusIcon = status.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white/80 backdrop-blur rounded-3xl overflow-hidden shadow-lg shadow-slate-200/30 border border-white/50"
    >
      <div className={`h-2 bg-gradient-to-r ${service.gradient}`} />
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg`}>
              <ServiceIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800">{service.label}</h3>
              <p className="text-sm text-slate-500">{payment.provider_name || 'Поставщик'}</p>
            </div>
          </div>
          <Badge className={`${status.color} border-0 flex items-center gap-1`}>
            <StatusIcon className="w-3 h-3" />
            {status.label}
          </Badge>
        </div>

        <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-4 mb-4">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-sm text-slate-500 mb-1">Сумма к оплате</p>
              <p className="text-3xl font-bold text-slate-800">
                {payment.amount?.toLocaleString('ru-RU')} 
                <span className="text-lg font-normal text-slate-400 ml-1">₽</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-500">Период</p>
              <p className="font-semibold text-slate-700">{payment.period || 'Январь 2026'}</p>
            </div>
          </div>
        </div>

        {payment.status !== 'paid' && (
          <Button 
            onClick={() => onPay?.(payment)}
            className={`w-full h-12 rounded-2xl bg-gradient-to-r ${service.gradient} hover:opacity-90 text-white font-semibold shadow-lg transition-all hover:shadow-xl`}
          >
            Оплатить сейчас
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        )}
      </div>
    </motion.div>
  );
}