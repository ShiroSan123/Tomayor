import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Eye, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import moment from 'moment';

const categoryConfig = {
  republic: { label: 'Республика', color: 'bg-blue-500', textColor: 'text-white' },
  municipal: { label: 'Город', color: 'bg-emerald-500', textColor: 'text-white' },
  culture: { label: 'Культура', color: 'bg-purple-500', textColor: 'text-white' },
  sport: { label: 'Спорт', color: 'bg-amber-500', textColor: 'text-white' },
  emergency: { label: 'ЧС', color: 'bg-red-500', textColor: 'text-white' },
  government: { label: 'Власть', color: 'bg-slate-700', textColor: 'text-white' }
};

export default function NewsCard({ article, index = 0, featured = false }) {
  const config = categoryConfig[article.category] || categoryConfig.republic;

  if (featured) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="relative h-64 rounded-3xl overflow-hidden cursor-pointer group"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900">
          {article.image_url && (
            <img 
              src={article.image_url} 
              alt={article.title}
              className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
            />
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute inset-0 p-5 flex flex-col justify-end">
          <div className="flex items-center gap-2 mb-2">
            <Badge className={`${config.color} ${config.textColor} border-0 text-xs`}>
              {config.label}
            </Badge>
            {article.is_urgent && (
              <Badge className="bg-red-500 text-white border-0 text-xs animate-pulse">
                Срочно
              </Badge>
            )}
          </div>
          <h3 className="font-bold text-white text-lg line-clamp-2 mb-2">{article.title}</h3>
          <div className="flex items-center gap-4 text-xs text-white/70">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{moment(article.created_date).fromNow()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              <span>{(article.views_count || 0).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
    >
      {article.image_url && (
        <div className="h-36 overflow-hidden">
          <img 
            src={article.image_url} 
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <Badge className={`${config.color} ${config.textColor} border-0 text-[10px] px-2 py-0.5`}>
            {config.label}
          </Badge>
          {article.is_urgent && (
            <Badge className="bg-red-500 text-white border-0 text-[10px] px-2 py-0.5">Срочно</Badge>
          )}
        </div>
        <h3 className="font-semibold text-slate-800 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
          {article.title}
        </h3>
        {article.summary && (
          <p className="text-sm text-slate-500 line-clamp-2 mb-3">{article.summary}</p>
        )}
        <div className="flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{moment(article.created_date).fromNow()}</span>
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>{(article.views_count || 0).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}