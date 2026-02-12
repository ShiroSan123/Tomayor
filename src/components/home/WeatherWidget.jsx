import React from 'react';
import { Thermometer, Wind, Snowflake, AlertTriangle, Sun, Cloud } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WeatherWidget({ temperature = -38, windSpeed = 2, isActuated = true, affectedGrades = ['1-4'] }) {
  const getWeatherGradient = (temp) => {
    if (temp <= -45) return 'from-indigo-600 via-purple-600 to-blue-700';
    if (temp <= -35) return 'from-blue-600 via-cyan-500 to-blue-500';
    if (temp <= -20) return 'from-cyan-500 via-blue-400 to-sky-400';
    if (temp <= 0) return 'from-sky-400 via-cyan-300 to-blue-300';
    return 'from-amber-400 via-orange-400 to-yellow-400';
  };

  const getWeatherIcon = (temp) => {
    if (temp <= -35) return Snowflake;
    if (temp <= 0) return Cloud;
    return Sun;
  };

  const WeatherIcon = getWeatherIcon(temperature);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`relative overflow-hidden rounded-[2rem] bg-gradient-to-br ${getWeatherGradient(temperature)} p-6 text-white shadow-2xl`}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-40 h-40 opacity-20">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Snowflake className="w-full h-full" />
        </motion.div>
      </div>
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-white/80 text-sm font-medium mb-1 flex items-center gap-2"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Якутск
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-baseline gap-1"
            >
              <span className="text-7xl font-extralight tracking-tighter">{temperature}</span>
              <span className="text-3xl font-light">°</span>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className="flex flex-col items-end gap-2"
          >
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <WeatherIcon className="w-8 h-8" />
            </div>
            <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5">
              <Wind className="w-4 h-4" />
              <span className="text-sm font-medium">{windSpeed} м/с</span>
            </div>
          </motion.div>
        </div>

        {isActuated && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-3 bg-amber-500/90 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg shadow-amber-500/30"
          >
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm">Актированный день</p>
              <p className="text-xs text-white/90">{affectedGrades.join(', ')} классы освобождены</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-3 h-3 bg-white rounded-full"
              />
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}