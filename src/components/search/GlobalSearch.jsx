import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Search,
  Newspaper,
  Calendar,
  ShoppingBag,
  Bus,
  Trophy,
  Landmark,
  MapPin,
  Clock,
  Loader2,
  History,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

const searchCategories = [
  {
    key: "news",
    label: "Новости",
    icon: Newspaper,
    color: "text-blue-500",
    page: "News",
  },
  {
    key: "events",
    label: "События",
    icon: Calendar,
    color: "text-purple-500",
    page: "Events",
  },
  {
    key: "products",
    label: "Товары",
    icon: ShoppingBag,
    color: "text-emerald-500",
    page: "Market",
  },
  {
    key: "transport",
    label: "Транспорт",
    icon: Bus,
    color: "text-orange-500",
    page: "Transport",
  },
  {
    key: "sports",
    label: "Спорт",
    icon: Trophy,
    color: "text-amber-500",
    page: "Sports",
  },
  {
    key: "traditions",
    label: "Традиции",
    icon: Landmark,
    color: "text-red-500",
    page: "Traditions",
  },
];

export default function GlobalSearch({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const saved = localStorage.getItem("recentSearches");
    if (saved) {
      setRecentSearches(JSON.parse(saved).slice(0, 5));
    }
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults({});
      return;
    }

    const timeoutId = setTimeout(() => {
      performSearch(query);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const performSearch = async (searchQuery) => {
    setIsLoading(true);
    const q = searchQuery.toLowerCase();

    try {
      const [news, events, products, transport, sports, traditions] =
        await Promise.all([
          base44.entities.NewsArticle.list("-created_date", 50),
          base44.entities.Event.list("-date_start", 50),
          base44.entities.Product.list("-created_date", 50),
          base44.entities.TransportStop.list("name", 100),
          base44.entities.SportVenue.list("name", 50),
          base44.entities.Tradition.list("-created_date", 50),
        ]);

      setResults({
        news: news.filter(
          (i) =>
            i.title?.toLowerCase().includes(q) ||
            i.summary?.toLowerCase().includes(q),
        ),
        events: events.filter(
          (i) =>
            i.title?.toLowerCase().includes(q) ||
            i.location?.toLowerCase().includes(q),
        ),
        products: products.filter(
          (i) =>
            i.title?.toLowerCase().includes(q) ||
            i.seller_name?.toLowerCase().includes(q),
        ),
        transport: transport.filter(
          (i) =>
            i.name?.toLowerCase().includes(q) ||
            i.district?.toLowerCase().includes(q),
        ),
        sports: sports.filter(
          (i) =>
            i.name?.toLowerCase().includes(q) ||
            i.address?.toLowerCase().includes(q),
        ),
        traditions: traditions.filter(
          (i) =>
            i.title?.toLowerCase().includes(q) ||
            i.title_sakha?.toLowerCase().includes(q),
        ),
      });

      // Save to recent
      if (searchQuery.trim()) {
        const updated = [
          searchQuery,
          ...recentSearches.filter((s) => s !== searchQuery),
        ].slice(0, 5);
        setRecentSearches(updated);
        localStorage.setItem("recentSearches", JSON.stringify(updated));
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const totalResults = Object.values(results).reduce(
    (sum, arr) => sum + (arr?.length || 0),
    0,
  );
  const hasQuery = query.trim().length > 0;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="fixed inset-x-0 top-0 z-50 max-h-[85vh] bg-white rounded-b-[2rem] shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Поиск по ТҮМЭР..."
                className="pl-12 h-12 rounded-2xl bg-slate-50 border-0 text-base"
              />
              {isLoading && (
                <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 animate-spin" />
              )}
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>

        {/* Results */}
        <ScrollArea className="flex-1 p-4">
          {!hasQuery ? (
            <div className="space-y-6">
              {recentSearches.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-slate-500 mb-3">
                    Недавние запросы
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((search, idx) => (
                      <button
                        key={idx}
                        onClick={() => setQuery(search)}
                        className="flex items-center gap-2 px-3 py-2 bg-slate-100 rounded-xl text-sm text-slate-700 hover:bg-slate-200 transition-colors"
                      >
                        <History className="w-4 h-4 text-slate-400" />
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-sm font-medium text-slate-500 mb-3">
                  Категории поиска
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {searchCategories.map((cat) => (
                    <Link
                      key={cat.key}
                      to={createPageUrl(cat.page)}
                      onClick={onClose}
                      className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors"
                    >
                      <cat.icon className={`w-6 h-6 ${cat.color}`} />
                      <span className="text-xs font-medium text-slate-700">
                        {cat.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ) : totalResults === 0 && !isLoading ? (
            <div className="text-center py-12">
              <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500">
                Ничего не найдено по запросу "{query}"
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Попробуйте изменить запрос
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {searchCategories.map((cat) => {
                const items = results[cat.key] || [];
                if (items.length === 0) return null;

                return (
                  <div key={cat.key}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <cat.icon className={`w-4 h-4 ${cat.color}`} />
                        <h3 className="font-medium text-slate-800">
                          {cat.label}
                        </h3>
                        <span className="text-xs text-slate-400">
                          ({items.length})
                        </span>
                      </div>
                      <Link
                        to={createPageUrl(cat.page)}
                        onClick={onClose}
                        className="text-xs text-blue-600 font-medium"
                      >
                        Все →
                      </Link>
                    </div>

                    <div className="space-y-2">
                      {items.slice(0, 3).map((item) => (
                        <SearchResultItem
                          key={item.id}
                          item={item}
                          category={cat}
                          onClose={onClose}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </motion.div>
    </AnimatePresence>
  );
}

function SearchResultItem({ item, category, onClose }) {
  const title = item.title || item.name;
  const subtitle =
    item.summary ||
    item.location ||
    item.address ||
    item.seller_name ||
    item.district;
  const date = item.date_start || item.created_date;

  return (
    <Link
      to={createPageUrl(category.page)}
      onClick={onClose}
      className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
    >
      <div
        className={`w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm`}
      >
        <category.icon className={`w-5 h-5 ${category.color}`} />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm text-slate-800 line-clamp-1">
          {title}
        </h4>
        {subtitle && (
          <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
            {subtitle}
          </p>
        )}
        {date && (
          <div className="flex items-center gap-1 mt-1 text-xs text-slate-400">
            <Clock className="w-3 h-3" />
            {format(new Date(date), "d MMM yyyy", { locale: ru })}
          </div>
        )}
      </div>
    </Link>
  );
}
