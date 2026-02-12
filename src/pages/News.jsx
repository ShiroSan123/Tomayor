import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Search, Newspaper, Clock, Eye, TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import moment from 'moment';

import PageHeader from '@/components/ui/PageHeader';

const categories = [
  { value: 'all', label: 'Все' },
  { value: 'republic', label: 'Республика', color: 'bg-blue-500' },
  { value: 'municipal', label: 'Город', color: 'bg-emerald-500' },
  { value: 'culture', label: 'Культура', color: 'bg-purple-500' },
  { value: 'sport', label: 'Спорт', color: 'bg-amber-500' },
  { value: 'emergency', label: 'ЧС', color: 'bg-red-500' },
  { value: 'government', label: 'Власть', color: 'bg-slate-700' },
];

export default function News() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const { data: news = [] } = useQuery({
    queryKey: ['news'],
    queryFn: () => base44.entities.NewsArticle.list('-created_date', 50),
  });

  const filteredNews = news.filter(article => {
    const matchesSearch = article.title?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'all' || article.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredNews = filteredNews[0];
  const otherNews = filteredNews.slice(1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <PageHeader title="Новости" subtitle="Республика Саха" action=""/>

      <div className="max-w-lg mx-auto px-4 py-4 space-y-5 pb-24">
        {/* Search */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            placeholder="Поиск новостей"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-12 bg-white/80 backdrop-blur border-slate-200/50 h-14 rounded-2xl shadow-lg"
          />
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
                    ? 'bg-gradient-to-r from-rose-500 to-red-500 text-white border-0 shadow-lg' 
                    : 'bg-white/80 backdrop-blur hover:bg-white border-slate-200/50'
                }`}
                onClick={() => setActiveCategory(cat.value)}
              >
                {cat.label}
              </Badge>
            </motion.div>
          ))}
        </div>

        {/* Featured Article */}
        {featuredNews && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative h-64 rounded-3xl overflow-hidden cursor-pointer group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900">
              {featuredNews.image_url && (
                <img 
                  src={featuredNews.image_url} 
                  alt={featuredNews.title}
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                />
              )}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-0 p-5 flex flex-col justify-end">
              <div className="flex items-center gap-2 mb-2">
                <Badge className={`${categories.find(c => c.value === featuredNews.category)?.color || 'bg-blue-500'} text-white border-0`}>
                  {categories.find(c => c.value === featuredNews.category)?.label}
                </Badge>
                {featuredNews.is_urgent && (
                  <Badge className="bg-red-500 text-white border-0 animate-pulse">Срочно</Badge>
                )}
              </div>
              <h3 className="font-bold text-white text-xl line-clamp-2 mb-2">{featuredNews.title}</h3>
              <div className="flex items-center gap-4 text-sm text-white/70">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{moment(featuredNews.created_date).fromNow()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{(featuredNews.views_count || 0).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* News List */}
        <div className="space-y-4">
          {otherNews.map((article, index) => {
            const cat = categories.find(c => c.value === article.category);
            
            return (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white/80 backdrop-blur rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer group border border-white/50"
              >
                <div className="flex">
                  {article.image_url && (
                    <div className="w-28 h-28 flex-shrink-0 overflow-hidden">
                      <img 
                        src={article.image_url} 
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="flex-1 p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className={`${cat?.color || 'bg-blue-500'} text-white border-0 text-[10px] px-2`}>
                        {cat?.label}
                      </Badge>
                      {article.is_urgent && (
                        <Badge className="bg-red-500 text-white border-0 text-[10px] px-2">Срочно</Badge>
                      )}
                    </div>
                    <h3 className="font-semibold text-slate-800 line-clamp-2 text-sm group-hover:text-rose-600 transition-colors">
                      {article.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
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
                </div>
              </motion.div>
            );
          })}
          
          {filteredNews.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
              <div className="w-20 h-20 rounded-3xl bg-rose-50 flex items-center justify-center mx-auto mb-4">
                <Newspaper className="w-10 h-10 text-rose-300" />
              </div>
              <p className="text-slate-500">Нет новостей</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}