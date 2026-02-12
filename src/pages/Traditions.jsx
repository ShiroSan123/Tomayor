import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { BookOpen, Video, Headphones, FileText, Image, Calendar, Play, Clock, Eye, User, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import moment from 'moment';

import PageHeader from '@/components/ui/PageHeader';

const contentTypes = {
  video: { icon: Video, label: 'Видео', color: 'from-red-500 to-rose-400' },
  article: { icon: FileText, label: 'Статья', color: 'from-blue-500 to-cyan-400' },
  audio: { icon: Headphones, label: 'Аудио', color: 'from-purple-500 to-violet-400' },
  photo: { icon: Image, label: 'Фото', color: 'from-green-500 to-emerald-400' }
};

const categories = [
  { value: 'all', label: 'Все', emoji: '✨' },
  { value: 'language', label: 'Язык', emoji: '📖' },
  { value: 'customs', label: 'Обычаи', emoji: '🎎' },
  { value: 'crafts', label: 'Ремёсла', emoji: '🎨' },
  { value: 'cuisine', label: 'Кухня', emoji: '🍖' },
  { value: 'music', label: 'Музыка', emoji: '🎵' },
  { value: 'dance', label: 'Танцы', emoji: '💃' },
  { value: 'holidays', label: 'Праздники', emoji: '🎉' },
  { value: 'beliefs', label: 'Верования', emoji: '🔥' },
];

export default function Traditions() {
  const [activeTab, setActiveTab] = useState('content');
  const [activeCategory, setActiveCategory] = useState('all');

  const { data: traditions = [] } = useQuery({
    queryKey: ['traditions'],
    queryFn: () => base44.entities.Tradition.list('-created_date', 50),
  });

  const { data: holidays = [] } = useQuery({
    queryKey: ['holidays'],
    queryFn: () => base44.entities.TraditionalHoliday.list('date', 20),
  });

  const filteredTraditions = traditions.filter(t => 
    activeCategory === 'all' || t.category === activeCategory
  );

  const featuredTraditions = traditions.filter(t => t.is_featured);
  const upcomingHolidays = holidays.filter(h => moment(h.date).isAfter(moment()));

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <PageHeader title="Традиции" subtitle="Культура Саха" action=""/>

      <div className="max-w-lg mx-auto px-4 py-4 space-y-5 pb-24">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-purple-500 via-violet-500 to-indigo-500 p-6 text-white shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-32 h-32 opacity-20">
            <BookOpen className="w-full h-full" />
          </div>
          
          <div className="relative">
            <h2 className="text-2xl font-bold mb-2">Сахалыы үөрэн</h2>
            <p className="text-white/80 mb-4">Изучайте культуру от носителей традиций</p>
            
            <div className="flex gap-4 text-sm">
              <div className="bg-white/20 backdrop-blur rounded-xl px-3 py-2">
                <span className="font-bold">{traditions.length}</span> материалов
              </div>
              <div className="bg-white/20 backdrop-blur rounded-xl px-3 py-2">
                <span className="font-bold">{holidays.length}</span> праздников
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full bg-white/80 backdrop-blur rounded-2xl p-1.5 h-auto shadow-lg">
            <TabsTrigger value="content" className="flex-1 rounded-xl py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-violet-500 data-[state=active]:text-white transition-all">
              <BookOpen className="w-4 h-4 mr-2" />
              Контент
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex-1 rounded-xl py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-violet-500 data-[state=active]:text-white transition-all">
              <Calendar className="w-4 h-4 mr-2" />
              Календарь
            </TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="mt-5 space-y-5">
            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
              {categories.map((cat, index) => (
                <motion.div
                  key={cat.value}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <Badge
                    variant={activeCategory === cat.value ? 'default' : 'secondary'}
                    className={`px-3 py-2 cursor-pointer whitespace-nowrap transition-all text-sm ${
                      activeCategory === cat.value 
                        ? 'bg-gradient-to-r from-purple-500 to-violet-500 text-white border-0 shadow-lg' 
                        : 'bg-white/80 backdrop-blur hover:bg-white border-slate-200/50'
                    }`}
                    onClick={() => setActiveCategory(cat.value)}
                  >
                    <span className="mr-1">{cat.emoji}</span>
                    {cat.label}
                  </Badge>
                </motion.div>
              ))}
            </div>

            {/* Featured */}
            {featuredTraditions.length > 0 && activeCategory === 'all' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative h-48 rounded-3xl overflow-hidden cursor-pointer group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900">
                  {featuredTraditions[0].thumbnail_url && (
                    <img 
                      src={featuredTraditions[0].thumbnail_url} 
                      alt={featuredTraditions[0].title}
                      className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute inset-0 p-5 flex flex-col justify-end">
                  <Badge className="bg-purple-500 text-white border-0 w-fit mb-2">⭐ Рекомендуем</Badge>
                  <h3 className="font-bold text-white text-lg">{featuredTraditions[0].title}</h3>
                  <p className="text-sm text-white/70 mt-1">
                    {featuredTraditions[0].author_name} • {featuredTraditions[0].author_district}
                  </p>
                </div>
                <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                  <Play className="w-5 h-5 text-white ml-0.5" />
                </div>
              </motion.div>
            )}

            {/* Content List */}
            <div className="space-y-3">
              {filteredTraditions.map((item, index) => {
                const type = contentTypes[item.content_type] || contentTypes.article;
                const TypeIcon = type.icon;
                const cat = categories.find(c => c.value === item.category);
                
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="bg-white/80 backdrop-blur rounded-2xl overflow-hidden shadow-lg border border-white/50 cursor-pointer hover:shadow-xl transition-all"
                  >
                    <div className="flex">
                      {item.thumbnail_url ? (
                        <div className="w-28 h-28 flex-shrink-0 overflow-hidden relative">
                          <img 
                            src={item.thumbnail_url} 
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                          {item.content_type === 'video' && (
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                              <Play className="w-8 h-8 text-white" />
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className={`w-28 h-28 flex-shrink-0 bg-gradient-to-br ${type.color} flex items-center justify-center`}>
                          <TypeIcon className="w-10 h-10 text-white/80" />
                        </div>
                      )}
                      <div className="flex-1 p-4">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className="bg-slate-100 text-slate-600 border-0 text-[10px]">
                            {cat?.emoji} {cat?.label}
                          </Badge>
                          <Badge className={`bg-gradient-to-r ${type.color} text-white border-0 text-[10px]`}>
                            {type.label}
                          </Badge>
                        </div>
                        <h4 className="font-semibold text-slate-800 line-clamp-2 text-sm">{item.title}</h4>
                        <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                          {item.author_name && (
                            <div className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              <span>{item.author_name}</span>
                            </div>
                          )}
                          {item.duration_minutes && (
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{item.duration_minutes} мин</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            <span>{(item.views_count || 0).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {filteredTraditions.length === 0 && (
                <div className="text-center py-12">
                  <BookOpen className="w-16 h-16 text-purple-200 mx-auto mb-4" />
                  <p className="text-slate-500">Контент появится скоро</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="mt-5 space-y-4">
            <h3 className="font-bold text-slate-800">Традиционные праздники</h3>
            
            {upcomingHolidays.length > 0 ? (
              upcomingHolidays.map((holiday, index) => {
                const daysUntil = moment(holiday.date).diff(moment(), 'days');
                const isThisMonth = moment(holiday.date).isSame(moment(), 'month');
                
                return (
                  <motion.div
                    key={holiday.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white/80 backdrop-blur rounded-2xl p-4 shadow-lg border border-white/50"
                  >
                    <div className="flex gap-4">
                      <div className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center ${
                        isThisMonth ? 'bg-gradient-to-br from-purple-500 to-violet-500 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        <p className="text-2xl font-bold">{moment(holiday.date).format('D')}</p>
                        <p className="text-[10px] uppercase">{moment(holiday.date).format('MMM')}</p>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-800">{holiday.name}</h4>
                        {holiday.name_sakha && (
                          <p className="text-sm text-purple-600">{holiday.name_sakha}</p>
                        )}
                        {holiday.description && (
                          <p className="text-sm text-slate-500 mt-1 line-clamp-2">{holiday.description}</p>
                        )}
                        <div className="flex items-center gap-2 mt-2">
                          {daysUntil <= 7 && daysUntil >= 0 && (
                            <Badge className="bg-amber-100 text-amber-700 border-0 text-xs">
                              через {daysUntil} дн.
                            </Badge>
                          )}
                          {holiday.is_lunar && (
                            <Badge className="bg-slate-100 text-slate-600 border-0 text-xs">
                              🌙 Лунный
                            </Badge>
                          )}
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-300 self-center" />
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-purple-200 mx-auto mb-4" />
                <p className="text-slate-500">Календарь формируется</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}