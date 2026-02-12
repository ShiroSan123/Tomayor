import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

const defaultStories = [
  { id: 0, title: 'Добавить', isAdd: true },
  { id: 1, title: 'Ил Түмэн', avatar: '🏛️', gradient: 'from-blue-500 to-indigo-500', hasNew: true },
  { id: 2, title: 'МинФин', avatar: '💰', gradient: 'from-green-400 to-emerald-500', hasNew: true },
  { id: 3, title: 'МВД', avatar: '🛡️', gradient: 'from-blue-400 to-indigo-500', hasNew: false },
  { id: 4, title: 'МинСпорт', avatar: '🏆', gradient: 'from-amber-400 to-orange-500', hasNew: true },
  { id: 5, title: 'Глава РС', avatar: '👔', gradient: 'from-purple-400 to-violet-500', hasNew: true },
  { id: 6, title: 'МЧС', avatar: '🚨', gradient: 'from-red-400 to-rose-500', hasNew: false },
  { id: 7, title: 'Минздрав', avatar: '🏥', gradient: 'from-cyan-400 to-blue-500', hasNew: false },
];

export default function StoriesRow({ stories = defaultStories }) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
      {stories.map((story, index) => (
        <motion.div
          key={story.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05, type: 'spring' }}
          className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer group"
        >
          <div className={`relative ${story.hasNew ? 'p-0.5' : 'p-0'}`}>
            {story.hasNew && (
              <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${story.gradient} animate-pulse`} />
            )}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative w-[68px] h-[68px] rounded-full ${story.isAdd ? 'bg-slate-100' : 'bg-gradient-to-br ' + story.gradient} p-0.5`}
            >
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                {story.isAdd ? (
                  <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center">
                    <Plus className="w-6 h-6 text-slate-400" />
                  </div>
                ) : (
                  <span className="text-2xl">{story.avatar}</span>
                )}
              </div>
            </motion.div>
          </div>
          <span className="text-[11px] font-medium text-slate-600 text-center w-16 truncate">
            {story.title}
          </span>
        </motion.div>
      ))}
    </div>
  );
}