import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Snowflake, Thermometer, Wind, Calendar, Bell, CheckCircle, AlertTriangle, Settings } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import moment from 'moment';

import PageHeader from '@/components/ui/PageHeader';

export default function Actuated() {
  const { data: actuated = [] } = useQuery({
    queryKey: ['actuated'],
    queryFn: () => base44.entities.ActuatedDay.list('-date', 30),
  });

  const today = moment().format('YYYY-MM-DD');
  const todayActuated = actuated.find(a => a.date === today && a.is_active);
  const history = actuated.filter(a => a.date !== today);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <PageHeader title="Актированные дни" subtitle="Отмена занятий" action=""/>

      <div className="max-w-lg mx-auto px-4 py-4 space-y-5 pb-24">
        {/* Today Status */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`relative overflow-hidden rounded-[2rem] p-6 text-white shadow-2xl ${
            todayActuated 
              ? 'bg-gradient-to-br from-amber-500 via-orange-500 to-red-500' 
              : 'bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500'
          }`}
        >
          <div className="absolute top-0 right-0 w-40 h-40 opacity-20">
            {todayActuated ? <Snowflake className="w-full h-full" /> : <CheckCircle className="w-full h-full" />}
          </div>
          
          <div className="relative">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
                {todayActuated ? <AlertTriangle className="w-7 h-7" /> : <CheckCircle className="w-7 h-7" />}
              </div>
              <div>
                <p className="text-white/70 text-sm">{moment().format('D MMMM, dddd')}</p>
                <h2 className="text-xl font-bold">
                  {todayActuated ? 'Актированный день' : 'Занятия по расписанию'}
                </h2>
              </div>
            </div>

            {todayActuated ? (
              <>
                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div className="bg-white/20 backdrop-blur rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Thermometer className="w-5 h-5" />
                      <span className="text-sm text-white/80">Температура</span>
                    </div>
                    <p className="text-3xl font-bold">{todayActuated.temperature}°C</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Wind className="w-5 h-5" />
                      <span className="text-sm text-white/80">Ветер</span>
                    </div>
                    <p className="text-3xl font-bold">{todayActuated.wind_speed || 0} м/с</p>
                  </div>
                </div>
                
                <div className="bg-white/20 backdrop-blur rounded-2xl p-4">
                  <p className="text-sm mb-3 text-white/80">Освобождены от занятий:</p>
                  <div className="flex flex-wrap gap-2">
                    {todayActuated.affected_grades?.map(grade => (
                      <Badge key={grade} className="bg-white text-amber-600 border-0 font-semibold">
                        {grade} классы
                      </Badge>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <p className="text-white/80">
                Погодные условия в норме. Все учебные заведения работают.
              </p>
            )}
          </div>
        </motion.div>

        {/* Notification Settings */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur rounded-2xl p-5 shadow-lg border border-white/50"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-blue-500 flex items-center justify-center shadow-lg">
                <Bell className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-bold text-slate-800">Push-уведомления</p>
                <p className="text-sm text-slate-500">Узнавайте первыми</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="rounded-xl">
              <Settings className="w-4 h-4 mr-1" />
              Настроить
            </Button>
          </div>
        </motion.div>

        {/* History */}
        <div>
          <h3 className="font-bold text-slate-800 mb-4">История</h3>
          <div className="space-y-3">
            {history.length > 0 ? (
              history.map((day, index) => (
                <motion.div
                  key={day.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white/80 backdrop-blur rounded-2xl p-4 flex items-center gap-4 shadow-lg border border-white/50"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    day.is_active 
                      ? 'bg-gradient-to-br from-amber-500 to-orange-500' 
                      : 'bg-slate-100'
                  }`}>
                    {day.is_active ? (
                      <Snowflake className="w-5 h-5 text-white" />
                    ) : (
                      <Calendar className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-800">
                      {moment(day.date).format('D MMMM')}
                    </p>
                    <p className="text-sm text-slate-500">
                      {day.temperature}°C • {day.district || 'Якутск'}
                    </p>
                  </div>
                  {day.is_active && day.affected_grades && (
                    <Badge variant="secondary" className="text-xs">
                      {day.affected_grades.join(', ')}
                    </Badge>
                  )}
                </motion.div>
              ))
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-3">
                  <Calendar className="w-8 h-8 text-slate-300" />
                </div>
                <p className="text-slate-500">Нет данных</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}