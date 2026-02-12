import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Bell,
  Heart,
  History,
  ChevronRight,
  LogOut,
  Shield,
  HelpCircle,
  Moon,
  Globe,
  CreditCard,
  Star,
  MapPin,
  Sparkles,
  Award,
  Calendar,
  Edit3,
  Camera,
  Zap,
  TrendingUp,
  Gift,
} from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

const menuSections = [
  {
    title: "Аккаунт",
    items: [
      {
        icon: User,
        label: "Личные данные",
        subtitle: "Имя, телефон, адрес",
        gradient: "from-blue-500 to-cyan-400",
      },
      {
        icon: Bell,
        label: "Уведомления",
        subtitle: "3 непрочитанных",
        badge: 3,
        gradient: "from-amber-500 to-orange-400",
      },
      {
        icon: Heart,
        label: "Избранное",
        subtitle: "12 сохранённых",
        gradient: "from-rose-500 to-pink-400",
      },
      {
        icon: History,
        label: "История действий",
        subtitle: "Последняя активность",
        gradient: "from-violet-500 to-purple-400",
      },
    ],
  },
  {
    title: "Настройки",
    items: [
      {
        icon: Globe,
        label: "Язык приложения",
        value: "Русский",
        gradient: "from-emerald-500 to-green-400",
      },
      {
        icon: Moon,
        label: "Тёмная тема",
        toggle: true,
        gradient: "from-slate-600 to-slate-500",
      },
      {
        icon: CreditCard,
        label: "Способы оплаты",
        subtitle: "Карты и счета",
        gradient: "from-indigo-500 to-blue-400",
      },
    ],
  },
  {
    title: "Поддержка",
    items: [
      {
        icon: HelpCircle,
        label: "Центр помощи",
        subtitle: "FAQ и инструкции",
        gradient: "from-cyan-500 to-teal-400",
      },
      {
        icon: Shield,
        label: "Конфиденциальность",
        subtitle: "Настройки приватности",
        gradient: "from-slate-500 to-slate-400",
      },
    ],
  },
];

const quickStats = [
  {
    icon: Zap,
    label: "Оплаты",
    value: "24",
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    icon: TrendingUp,
    label: "Поездки",
    value: "156",
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    icon: Gift,
    label: "Бонусы",
    value: "350",
    color: "text-emerald-500",
    bg: "bg-emerald-50",
  },
];

const achievements = [
  { icon: "🏆", label: "Активный житель", unlocked: true },
  { icon: "🚌", label: "Путешественник", unlocked: true },
  { icon: "💳", label: "Финансист", unlocked: true },
  { icon: "⭐", label: "VIP статус", unlocked: false },
];

export default function Profile() {
  const [darkMode, setDarkMode] = useState(false);

  const { data: user } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => base44.auth.me(),
  });

  const handleLogout = async () => {
    await base44.auth.logout();
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-28">
      {/* Animated Background Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative overflow-hidden"
      >
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-cyan-500 to-teal-400" />

        {/* Animated Circles */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute -top-20 -right-20 w-60 h-60 bg-white rounded-full"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-40 -left-20 w-40 h-40 bg-white rounded-full"
        />

        {/* Content */}
        <div className="relative pt-12 pb-24 px-4">
          <div className="max-w-lg mx-auto">
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-xl font-bold text-white">Профиль</h1>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center"
              >
                <Edit3 className="w-5 h-5 text-white" />
              </motion.button>
            </div>

            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-5"
            >
              {/* Avatar */}
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-24 h-24 rounded-3xl bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-xl flex items-center justify-center border-2 border-white/30 shadow-2xl"
                >
                  <span className="text-3xl font-bold text-white">
                    {getInitials(user?.full_name)}
                  </span>
                </motion.div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-xl shadow-lg flex items-center justify-center"
                >
                  <Camera className="w-4 h-4 text-blue-600" />
                </motion.button>

                {/* Status indicator */}
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-emerald-400 rounded-full border-2 border-white flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
              </div>

              {/* Info */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-1">
                  {user?.full_name || "Пользователь"}
                </h2>
                <p className="text-white/70 text-sm mb-3">{user?.email}</p>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur text-white text-xs font-medium">
                    <Award className="w-3.5 h-3.5" />
                    {user?.role === "admin" ? "Администратор" : "Пользователь"}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-400/90 text-amber-900 text-xs font-medium">
                    <Star className="w-3.5 h-3.5" />
                    PRO
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-lg mx-auto px-4 -mt-14 space-y-4">
        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-4"
        >
          <div className="grid grid-cols-3 gap-3">
            {quickStats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                className="text-center"
              >
                <div
                  className={`w-12 h-12 ${stat.bg} rounded-2xl flex items-center justify-center mx-auto mb-2`}
                >
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <p className="text-xl font-bold text-slate-800">{stat.value}</p>
                <p className="text-xs text-slate-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-800">Достижения</h3>
            <span className="text-xs text-blue-600 font-medium">3/4</span>
          </div>
          <div className="flex gap-3">
            {achievements.map((achievement, idx) => (
              <motion.div
                key={achievement.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
                className={`flex-1 text-center p-3 rounded-2xl ${
                  achievement.unlocked
                    ? "bg-gradient-to-br from-amber-50 to-orange-50"
                    : "bg-slate-50"
                }`}
              >
                <span
                  className={`text-2xl ${!achievement.unlocked && "grayscale opacity-40"}`}
                >
                  {achievement.icon}
                </span>
                <p
                  className={`text-[10px] mt-1 font-medium ${
                    achievement.unlocked ? "text-amber-700" : "text-slate-400"
                  }`}
                >
                  {achievement.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Menu Sections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden"
        >
          {menuSections.map((section, sectionIdx) => (
            <div key={section.title}>
              <div className="px-5 pt-5 pb-2">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {section.title}
                </h3>
              </div>

              {section.items.map((item, idx) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + (sectionIdx * 3 + idx) * 0.05 }}
                  whileHover={{ x: 4 }}
                  className="cursor-pointer"
                >
                  <div className="flex items-center justify-between px-5 py-3.5 hover:bg-slate-50/80 transition-all">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg shadow-slate-200/50`}
                      >
                        <item.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-slate-700">
                            {item.label}
                          </span>
                          {item.badge && (
                            <Badge className="bg-red-500 text-white text-[10px] px-1.5 py-0 h-5">
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                        {item.subtitle && (
                          <p className="text-xs text-slate-400 mt-0.5">
                            {item.subtitle}
                          </p>
                        )}
                      </div>
                    </div>
                    {item.toggle ? (
                      <Switch
                        checked={darkMode}
                        onCheckedChange={setDarkMode}
                      />
                    ) : item.value ? (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-500">
                          {item.value}
                        </span>
                        <ChevronRight className="w-4 h-4 text-slate-300" />
                      </div>
                    ) : (
                      <ChevronRight className="w-5 h-5 text-slate-300" />
                    )}
                  </div>
                </motion.div>
              ))}

              {sectionIdx < menuSections.length - 1 && (
                <div className="mx-5 border-b border-slate-100" />
              )}
            </div>
          ))}
        </motion.div>

        {/* Logout Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Button
            variant="outline"
            className="w-full h-14 rounded-2xl text-red-500 border-red-100 bg-red-50/50 hover:bg-red-100 hover:text-red-600 hover:border-red-200 transition-all"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 mr-2" />
            Выйти из аккаунта
          </Button>
        </motion.div>

        {/* App Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center py-4"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
              <span className="text-white font-bold text-xs">T</span>
            </div>
            <span className="font-bold text-slate-700">ТҮМЭР</span>
          </div>
          <p className="text-xs text-slate-400">Версия 1.0.0 • Саха Сирэ</p>
          <p className="text-[10px] text-slate-300 mt-1">
            Сделано с ❤️ в Якутске
          </p>
        </motion.div>
      </div>
    </div>
  );
}
