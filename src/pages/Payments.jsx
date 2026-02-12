import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { CreditCard, Receipt, Zap, Flame, Droplets, Wallet, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

import PageHeader from '@/components/ui/PageHeader';
import PaymentCard from '@/components/payments/PaymentCard';

export default function Payments() {
  const [activeTab, setActiveTab] = useState('all');

  const { data: payments = [] } = useQuery({
    queryKey: ['payments'],
    queryFn: () => base44.entities.UtilityPayment.list('-due_date', 20),
  });

  const pendingPayments = payments.filter(p => p.status === 'pending' || p.status === 'overdue');
  const totalPending = pendingPayments.reduce((sum, p) => sum + (p.amount || 0), 0);

  const byService = (type) => payments.filter(p => p.service_type === type && p.status !== 'paid')
    .reduce((s, p) => s + (p.amount || 0), 0);

  const filteredPayments = activeTab === 'all' 
    ? payments 
    : payments.filter(p => p.service_type === activeTab);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <PageHeader title="Оплата ЖКХ" subtitle="Единая система" action=""/>

      <div className="max-w-lg mx-auto px-4 py-4 space-y-5 pb-24">
        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 p-6 text-white shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-white/70 text-sm font-medium">Всего к оплате</p>
                <p className="text-4xl font-bold mt-1">{totalPending.toLocaleString('ru-RU')} ₽</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
                <Wallet className="w-7 h-7" />
              </div>
            </div>
            
            <Button 
              className="w-full bg-white text-emerald-600 hover:bg-white/90 h-14 rounded-2xl font-bold text-base shadow-lg"
              disabled={totalPending === 0}
            >
              <Receipt className="w-5 h-5 mr-2" />
              Оплатить всё одной кнопкой
            </Button>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: Zap, label: 'Свет', amount: byService('electricity'), gradient: 'from-amber-500 to-yellow-400' },
            { icon: Flame, label: 'Тепло', amount: byService('heating'), gradient: 'from-red-500 to-orange-400' },
            { icon: Droplets, label: 'Вода', amount: byService('water'), gradient: 'from-blue-500 to-cyan-400' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur rounded-2xl p-4 text-center shadow-lg shadow-slate-200/30 border border-white/50"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mx-auto mb-2 shadow-lg`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-lg font-bold text-slate-800">{stat.amount.toLocaleString()}</p>
              <p className="text-xs text-slate-500">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Filter Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full bg-white/80 backdrop-blur rounded-2xl p-1.5 h-auto shadow-lg overflow-x-auto">
            {[
              { value: 'all', label: 'Все' },
              { value: 'electricity', label: 'Свет' },
              { value: 'heating', label: 'Тепло' },
              { value: 'water', label: 'Вода' },
            ].map(tab => (
              <TabsTrigger 
                key={tab.value}
                value={tab.value} 
                className="flex-1 rounded-xl py-2.5 text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-500 data-[state=active]:text-white transition-all"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Payments List */}
        <div className="space-y-4">
          {filteredPayments.length > 0 ? (
            filteredPayments.map((payment, index) => (
              <PaymentCard 
                key={payment.id} 
                payment={payment} 
                index={index}
                onPay={(p) => console.log('Pay:', p)}
              />
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 rounded-3xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
                <Receipt className="w-10 h-10 text-slate-300" />
              </div>
              <p className="text-slate-500">Нет счетов для оплаты</p>
            </motion.div>
          )}
        </div>

        {/* Add Account */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full p-4 rounded-2xl border-2 border-dashed border-slate-200 text-slate-500 hover:border-emerald-300 hover:text-emerald-600 transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">Добавить лицевой счёт</span>
        </motion.button>
      </div>
    </div>
  );
}