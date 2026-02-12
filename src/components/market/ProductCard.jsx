import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Truck, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const categoryLabels = {
  meat: 'Мясо',
  fish: 'Рыба',
  dairy: 'Молочные',
  berries: 'Ягоды',
  crafts: 'Ремёсла',
  other: 'Другое'
};

const categoryColors = {
  meat: 'bg-red-100 text-red-700',
  fish: 'bg-blue-100 text-blue-700',
  dairy: 'bg-amber-100 text-amber-700',
  berries: 'bg-purple-100 text-purple-700',
  crafts: 'bg-orange-100 text-orange-700',
  other: 'bg-slate-100 text-slate-700'
};

const unitLabels = {
  kg: 'кг',
  piece: 'шт',
  liter: 'л',
  pack: 'уп'
};

export default function ProductCard({ product, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
    >
      {product.image_url ? (
        <div className="h-40 overflow-hidden">
          <img 
            src={product.image_url} 
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="h-40 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-4xl">
          {product.category === 'meat' && '🥩'}
          {product.category === 'fish' && '🐟'}
          {product.category === 'dairy' && '🥛'}
          {product.category === 'berries' && '🫐'}
          {product.category === 'crafts' && '🎨'}
          {product.category === 'other' && '📦'}
        </div>
      )}
      
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <Badge className={`${categoryColors[product.category]} border-0 text-xs`}>
            {categoryLabels[product.category]}
          </Badge>
          {product.is_verified && (
            <Badge className="bg-green-100 text-green-700 border-0 text-xs flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              Проверен
            </Badge>
          )}
        </div>

        <h3 className="font-semibold text-slate-800 line-clamp-2 mb-2">{product.title}</h3>
        
        <div className="flex items-baseline gap-1 mb-3">
          <span className="text-2xl font-bold text-slate-800">
            {product.price?.toLocaleString('ru-RU')}
          </span>
          <span className="text-slate-500">₽/{unitLabels[product.unit]}</span>
        </div>

        <div className="space-y-1.5 text-sm text-slate-500 mb-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-slate-400" />
            <span>{product.seller_district || 'Якутск'}</span>
          </div>
          {product.delivery_available && (
            <div className="flex items-center gap-2 text-green-600">
              <Truck className="w-4 h-4" />
              <span>Доставка</span>
            </div>
          )}
        </div>

        <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
          <Phone className="w-4 h-4 mr-2" />
          Связаться
        </Button>
      </div>
    </motion.div>
  );
}