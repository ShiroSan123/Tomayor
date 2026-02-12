import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";
import {
  Bus,
  CreditCard,
  Newspaper,
  Calendar,
  ShoppingBag,
  Snowflake,
  Ship,
  Sun,
  Landmark,
  Trophy,
  Dumbbell,
  Heart,
  Trees,
  Compass,
  BookOpen,
  Phone,
  HelpCircle,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";

const moduleGroups = [
  {
    title: "Основные",
    modules: [
      {
        icon: Bus,
        label: "Транспорт",
        page: "Transport",
        gradient: "from-orange-500 to-amber-500",
        description: "Маршруты и остановки",
      },
      {
        icon: CreditCard,
        label: "ЖКХ",
        page: "Payments",
        gradient: "from-emerald-500 to-teal-500",
        description: "Оплата услуг",
      },
      {
        icon: Newspaper,
        label: "Новости",
        page: "News",
        gradient: "from-blue-500 to-cyan-500",
        description: "Главные события",
      },
      {
        icon: Calendar,
        label: "Афиша",
        page: "Events",
        gradient: "from-purple-500 to-violet-500",
        description: "Мероприятия",
      },
      {
        icon: ShoppingBag,
        label: "Маркет",
        page: "Market",
        gradient: "from-pink-500 to-rose-500",
        description: "Местные товары",
      },
    ],
  },
  {
    title: "Особенности региона",
    modules: [
      {
        icon: Snowflake,
        label: "Актировка",
        page: "Actuated",
        gradient: "from-cyan-500 to-blue-500",
        description: "Отмена занятий",
      },
      {
        icon: Ship,
        label: "Переправа",
        page: "Ferry",
        gradient: "from-indigo-500 to-blue-500",
        description: "Паром и ледовая",
      },
    ],
  },
  {
    title: "Культура и спорт",
    modules: [
      {
        icon: Sun,
        label: "Ысыах",
        page: "Ysyakh",
        gradient: "from-amber-500 to-yellow-500",
        description: "Праздник лета",
      },
      {
        icon: Landmark,
        label: "Традиции",
        page: "Traditions",
        gradient: "from-orange-500 to-red-500",
        description: "Культура Саха",
      },
      {
        icon: Trophy,
        label: "Спорт",
        page: "Sports",
        gradient: "from-green-500 to-emerald-500",
        description: "Соревнования",
      },
    ],
  },
  {
    title: "Скоро",
    modules: [
      {
        icon: Heart,
        label: "Здоровье",
        page: null,
        gradient: "from-red-400 to-pink-400",
        description: "Медицина",
        soon: true,
      },
      {
        icon: Trees,
        label: "Охотник",
        page: null,
        gradient: "from-green-400 to-emerald-400",
        description: "Для охотников",
        soon: true,
      },
      {
        icon: Compass,
        label: "Туризм",
        page: null,
        gradient: "from-teal-400 to-cyan-400",
        description: "Путешествия",
        soon: true,
      },
      {
        icon: BookOpen,
        label: "Образование",
        page: null,
        gradient: "from-indigo-400 to-purple-400",
        description: "Школы и вузы",
        soon: true,
      },
    ],
  },
];

export default function Modules() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <PageHeader title="Все модули" subtitle="Сервисы ТҮМЭР" action="" />

      <main className="max-w-lg mx-auto px-4 py-5 space-y-8 pb-24">
        {moduleGroups.map((group, groupIdx) => (
          <motion.section
            key={group.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: groupIdx * 0.1 }}
          >
            <h2 className="text-lg font-bold text-slate-800 mb-4">
              {group.title}
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {group.modules.map((module, idx) => {
                const content = (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: groupIdx * 0.1 + idx * 0.05 }}
                    className={`
                      flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 
                      shadow-sm transition-all
                      ${module.soon ? "opacity-60" : "hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"}
                    `}
                  >
                    <div
                      className={`
                      w-12 h-12 rounded-xl bg-gradient-to-br ${module.gradient} 
                      flex items-center justify-center shadow-lg
                    `}
                    >
                      <module.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-slate-800">
                          {module.label}
                        </h3>
                        {module.soon && (
                          <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
                            Скоро
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-500">
                        {module.description}
                      </p>
                    </div>
                  </motion.div>
                );

                if (module.soon) {
                  return <div key={module.label}>{content}</div>;
                }

                return (
                  <Link key={module.label} to={createPageUrl(module.page)}>
                    {content}
                  </Link>
                );
              })}
            </div>
          </motion.section>
        ))}
      </main>
    </div>
  );
}
