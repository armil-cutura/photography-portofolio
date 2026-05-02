import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";

const LANGUAGES = [
  { code: "en", label: "EN" },
  { code: "sr", label: "SR" },
  { code: "nl", label: "NL" },
];

export function Navbar() {
  const { t } = useTranslation();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(i18n.language || "en");

  const links = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.portfolio"), path: "/portfolio" },
    { name: t("nav.about"), path: "/about" },
    { name: t("nav.services"), path: "/services" },
    { name: t("nav.contact"), path: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = location.pathname === "/";
  const isScrolledOrNotHome = scrolled || !isHome;
  const navBg = isScrolledOrNotHome
    ? "bg-background border-b border-border shadow-sm"
    : "bg-transparent";
  const textColor = isScrolledOrNotHome ? "text-foreground" : "text-white";

  function switchLanguage(code: string) {
    void i18n.changeLanguage(code);
    localStorage.setItem("lang", code);
    setCurrentLang(code);
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}
    >
      <div className="container mx-auto px-6 h-24 flex items-center justify-between">
        <Link to="/" className={`font-serif text-2xl tracking-wide ${textColor}`}>
          ELARA VANCE
        </Link>

        <div className="hidden md:flex gap-8 items-center">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm tracking-widest uppercase transition-colors hover:opacity-70 ${textColor} ${location.pathname === link.path ? "opacity-100 font-medium" : "opacity-60"}`}
            >
              {link.name}
            </Link>
          ))}

          <div className="flex items-center gap-1 ml-4 border-l border-current/20 pl-4">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => switchLanguage(lang.code)}
                className={`text-xs tracking-widest px-2 py-1 transition-opacity cursor-pointer ${textColor} ${currentLang === lang.code ? "opacity-100 font-semibold" : "opacity-40 hover:opacity-70"}`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        <button
          className={`md:hidden p-2 ${textColor}`}
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center"
          >
            <button
              className="absolute top-8 right-6 p-2 text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="w-8 h-8" />
            </button>
            <div className="flex flex-col gap-8 items-center">
              {links.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={link.path}
                    className={`font-serif text-4xl text-foreground transition-opacity ${location.pathname === link.path ? "opacity-100" : "opacity-50"}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: links.length * 0.1 }}
                className="flex gap-4 mt-4"
              >
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => { switchLanguage(lang.code); setMobileMenuOpen(false); }}
                    className={`text-sm tracking-widest text-foreground transition-opacity cursor-pointer ${currentLang === lang.code ? "opacity-100 font-semibold" : "opacity-40"}`}
                  >
                    {lang.label}
                  </button>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
