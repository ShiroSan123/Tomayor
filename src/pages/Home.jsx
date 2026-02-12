import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Bell, Search, User, Sparkles, Bot } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

import WeatherWidget from "@/components/home/WeatherWidget";
import QuickActions from "@/components/home/QuickActions";
import NewsCard from "@/components/home/NewsCard";
import EventCard from "@/components/home/EventCard";
import StoriesRow from "@/components/home/StoriesRow";
import AlertBanner from "@/components/home/AlertBanner";
import SectionHeader from "@/components/ui/SectionHeader";
import AssistantChat from "@/components/assistant/AssistantChat";

export default function Home() {
  const [showAllModules, setShowAllModules] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  const { data: news = [] } = useQuery({
    queryKey: ["news"],
    queryFn: () => base44.entities.NewsArticle.list("-created_date", 5),
  });

  const { data: events = [] } = useQuery({
    queryKey: ["events"],
    queryFn: () => base44.entities.Event.list("date_start", 6),
  });

  const { data: actuated = [] } = useQuery({
    queryKey: ["actuated"],
    queryFn: () =>
      base44.entities.ActuatedDay.filter({ is_active: true }, "-date", 1),
  });

  const isActuated = actuated.length > 0;
  const currentActuated = actuated[0];

  const featuredNews = news[0];
  const otherNews = news.slice(1, 4);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/60 backdrop-blur-xl sticky top-0 z-50 border-b border-slate-100/50"
      >
        <div className="max-w-lg mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30"
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Sparkles className="w-5 h-5 text-white" />
              </motion.div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  ТҮМЭР
                </h1>
                <p className="text-[10px] text-slate-500 font-medium tracking-wide">
                  САХА СИРЭ
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsAssistantOpen(true)}
                className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center shadow-lg shadow-purple-500/30 relative"
              >
                <Bot className="w-5 h-5 text-white" />
                <span className="absolute -top-1 -right-1 text-[8px] bg-amber-400 text-amber-900 px-1.5 py-0.5 rounded-full font-bold">
                  AI
                </span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors relative"
              >
                <Search className="w-5 h-5 text-slate-600" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors relative"
              >
                <Bell className="w-5 h-5 text-slate-600" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      <main className="max-w-lg mx-auto px-4 py-5 space-y-6 pb-24">
        {/* Weather Widget */}
        <WeatherWidget
          temperature={currentActuated?.temperature || -38}
          windSpeed={currentActuated?.wind_speed || 2}
          isActuated={isActuated}
          affectedGrades={currentActuated?.affected_grades || ["1-4"]}
        />

        {/* Stories */}
        <section>
          <StoriesRow />
        </section>

        {/* Quick Actions */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-5 shadow-xl shadow-slate-200/50 border border-white/50"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-slate-800">Сервисы</h2>
              <button
                onClick={() => setShowAllModules(!showAllModules)}
                className="text-xs text-blue-600 font-medium hover:text-blue-700"
              >
                {showAllModules ? "Свернуть" : "Все модули"}
              </button>
            </div>
            <QuickActions showFuture={showAllModules} />
          </motion.div>
        </section>

        {/* Events */}
        <section>
          <SectionHeader
            title="Афиша"
            subtitle="Ближайшие события"
            linkTo="Events"
            linkText="Все"
          />
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
            {events.length > 0 ? (
              events.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} />
              ))
            ) : (
              <div className="flex-1 text-center py-12 text-slate-400">
                <p>Нет предстоящих событий</p>
              </div>
            )}
          </div>
        </section>

        {/* News */}
        <section>
          <SectionHeader
            title="Новости"
            subtitle="Главное сегодня"
            linkTo="News"
            linkText="Все"
          />

          {featuredNews && (
            <div className="mb-4">
              <NewsCard article={featuredNews} featured index={0} />
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {otherNews.map((article, index) => (
              <NewsCard key={article.id} article={article} index={index + 1} />
            ))}
          </div>
        </section>
      </main>

      <AssistantChat
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
      />
    </div>
  );
}
