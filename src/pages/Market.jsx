import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Search, ShoppingBag, MapPin, Phone, Truck, ShieldCheck, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import PageHeader from '@/components/ui/PageHeader';

const categories = [
  { value: 'all', label: 'Все', emoji: '🛒' },
  { value: 'meat', label: 'Мясо', emoji: '🥩' },
  { value: 'fish', label: 'Рыба', emoji: '🐟' },
  { value: 'dairy', label: 'Молочные', emoji: '🥛' },
  { value: 'berries', label: 'Ягоды', emoji: '🫐' },
  { value: 'crafts', label: 'Ремёсла', emoji: '🎨' },
];

const unitLabels = { kg: 'кг', piece: 'шт', liter: 'л', pack: 'уп' };

export default function Market() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: () => base44.entities.Product.filter({ is_available: true }, '-created_date', 50),
  });

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <PageHeader title="Маркет" subtitle="От производителей" action=""/>

      <div className="max-w-lg mx-auto px-4 py-4 space-y-5 pb-24">
        {/* Search */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            placeholder="Поиск товаров"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-12 bg-white/80 backdrop-blur border-slate-200/50 h-14 rounded-2xl shadow-lg"
          />
        </motion.div>

        {/* Info banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-5 text-white shadow-lg"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-3xl">
              🥩
            </div>
            <div>
              <h3 className="font-bold text-lg">Прямо от производителя</h3>
              <p className="text-sm text-white/80">Свежее мясо и рыба без посредников</p>
            </div>
          </div>
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
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0 shadow-lg' 
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

        {/* Products Grid */}
        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => {
              const cat = categories.find(c => c.value === product.category) || categories[0];
              
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white/80 backdrop-blur rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer group border border-white/50"
                >
                  {product.image_url ? (
                    <div className="h-36 overflow-hidden">
                      <img 
                        src={product.image_url} 
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div className="h-36 bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
                      <span className="text-5xl">{cat.emoji}</span>
                    </div>
                  )}
                  
                  <div className="p-4">
                    <div className="flex items-center gap-1 mb-2">
                      {product.is_verified && (
                        <Badge className="bg-green-100 text-green-700 border-0 text-[10px] px-1.5">
                          <ShieldCheck className="w-3 h-3 mr-0.5" />
                          Проверен
                        </Badge>
                      )}
                      {product.delivery_available && (
                        <Badge className="bg-blue-100 text-blue-700 border-0 text-[10px] px-1.5">
                          <Truck className="w-3 h-3" />
                        </Badge>
                      )}
                    </div>

                    <h3 className="font-semibold text-slate-800 line-clamp-2 mb-2 text-sm group-hover:text-orange-600 transition-colors">
                      {product.title}
                    </h3>
                    
                    <div className="flex items-baseline gap-1 mb-2">
                      <span className="text-xl font-bold text-slate-800">
                        {product.price?.toLocaleString()}
                      </span>
                      <span className="text-sm text-slate-500">₽/{unitLabels[product.unit]}</span>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-slate-500 mb-3">
                      <MapPin className="w-3 h-3" />
                      <span className="truncate">{product.seller_district || 'Якутск'}</span>
                    </div>

                    <Button size="sm" className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:opacity-90 rounded-xl h-9">
                      <Phone className="w-4 h-4 mr-1" />
                      Связаться
                    </Button>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-2 text-center py-16">
              <div className="w-20 h-20 rounded-3xl bg-orange-50 flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-10 h-10 text-orange-300" />
              </div>
              <p className="text-slate-500">Нет товаров</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}