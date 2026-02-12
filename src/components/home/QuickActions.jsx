import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";
import {
  Bus,
  Ship,
  CreditCard,
  Calendar,
  ShoppingBag,
  Newspaper,
  Snowflake,
  LayoutGrid,
} from "lucide-react";

// Только основные быстрые действия (8 штук для сетки 4x2)
const actions = [
  {
    icon: Bus,
    label: "Транспорт",
    page: "Transport",
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    icon: Ship,
    label: "Переправа",
    page: "Ferry",
    gradient: "from-cyan-500 to-teal-400",
  },
  {
    icon: CreditCard,
    label: "ЖКХ",
    page: "Payments",
    gradient: "from-emerald-500 to-green-400",
  },
  {
    icon: Snowflake,
    label: "Актировка",
    page: "Actuated",
    gradient: "from-sky-500 to-blue-400",
  },
  {
    icon: Calendar,
    label: "Афиша",
    page: "Events",
    gradient: "from-purple-500 to-pink-400",
  },
  {
    icon: ShoppingBag,
    label: "Маркет",
    page: "Market",
    gradient: "from-orange-500 to-amber-400",
  },
  {
    icon: Newspaper,
    label: "Новости",
    page: "News",
    gradient: "from-rose-500 to-red-400",
  },
  {
    icon: LayoutGrid,
    label: "Все",
    page: "Modules",
    gradient: "from-slate-600 to-slate-500",
  },
];

export default function QuickActions() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {actions.map((action, index) => (
        <motion.div
          key={action.label}
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            delay: index * 0.05,
            type: "spring",
            stiffness: 400,
            damping: 20,
          }}
        >
          <Link
            to={createPageUrl(action.page)}
            className="flex flex-col items-center gap-2 group"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className={`bg-gradient-to-br ${action.gradient} w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg shadow-slate-300/50 group-hover:shadow-xl transition-shadow`}
            >
              <action.icon className="w-6 h-6 text-white" />
            </motion.div>
            <span className="text-xs font-medium text-slate-600 text-center group-hover:text-slate-900 transition-colors">
              {action.label}
            </span>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
