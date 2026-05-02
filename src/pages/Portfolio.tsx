import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useTranslation } from "react-i18next";

import port1 from "@/assets/images/port-1.png";
import port2 from "@/assets/images/port-2.png";
import port3 from "@/assets/images/port-3.png";
import port4 from "@/assets/images/port-4.png";
import port5 from "@/assets/images/port-5.png";
import port6 from "@/assets/images/port-6.png";
import port7 from "@/assets/images/port-7.png";
import port8 from "@/assets/images/port-8.png";

const allPhotos = [
  { id: 1, src: port1, category: "Portraits" },
  { id: 2, src: port2, category: "Weddings" },
  { id: 3, src: port3, category: "Lifestyle" },
  { id: 4, src: port4, category: "Travel" },
  { id: 5, src: port5, category: "Portraits" },
  { id: 6, src: port6, category: "Weddings" },
  { id: 7, src: port7, category: "Lifestyle" },
  { id: 8, src: port8, category: "Travel" },
  { id: 9, src: port1, category: "Portraits" },
  { id: 10, src: port2, category: "Weddings" },
  { id: 11, src: port3, category: "Lifestyle" },
  { id: 12, src: port4, category: "Travel" },
];

const CATEGORY_KEYS: Record<string, string> = {
  All: "portfolio.categories.all",
  Portraits: "portfolio.categories.portraits",
  Weddings: "portfolio.categories.weddings",
  Lifestyle: "portfolio.categories.lifestyle",
  Travel: "portfolio.categories.travel",
};

const categories = ["All", "Portraits", "Weddings", "Lifestyle", "Travel"];

export function Portfolio() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState("All");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filtered = filter === "All" ? allPhotos : allPhotos.filter((p) => p.category === filter);

  const handlePrev = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + filtered.length) % filtered.length);
  };

  const handleNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % filtered.length);
  };

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-[1600px] mx-auto w-full">
      <div className="text-center mb-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif text-5xl md:text-6xl mb-8"
        >
          {t("portfolio.title")}
        </motion.h1>

        <div className="flex flex-wrap justify-center gap-2 md:gap-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`uppercase tracking-widest text-xs py-2 px-1 transition-colors border-b-2 cursor-pointer ${
                filter === cat
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {t(CATEGORY_KEYS[cat])}
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((photo, i) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              key={`${photo.id}-${filter}`}
              className="break-inside-avoid cursor-pointer overflow-hidden bg-muted group"
              onClick={() => setSelectedIndex(i)}
            >
              <img
                src={photo.src}
                alt={`${photo.category} photography`}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex items-center justify-center"
          onClick={() => setSelectedIndex(null)}
        >
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-6 right-6 z-50 p-2 text-foreground hover:opacity-70 bg-background/50 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            className="absolute left-4 md:left-12 z-50 p-4 text-foreground hover:opacity-70 bg-background/50 rounded-full"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <motion.img
            key={selectedIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            src={filtered[selectedIndex].src}
            alt="Fullscreen view"
            className="max-w-full max-h-full object-contain shadow-2xl p-4 md:p-12"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            className="absolute right-4 md:right-12 z-50 p-4 text-foreground hover:opacity-70 bg-background/50 rounded-full"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      )}
    </div>
  );
}
