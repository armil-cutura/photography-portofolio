import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

const packages = [
  { titleKey: "services.packages.portrait.title", price: "250", descKey: "services.packages.portrait.description", featuresKey: "services.packages.portrait.features" },
  { titleKey: "services.packages.events.title", price: "500", descKey: "services.packages.events.description", featuresKey: "services.packages.events.features" },
  { titleKey: "services.packages.weddings.title", price: "1,800", descKey: "services.packages.weddings.description", featuresKey: "services.packages.weddings.features" },
];

export function Services() {
  const { t } = useTranslation();

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-6xl mx-auto w-full">
      <div className="text-center mb-20">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif text-5xl md:text-6xl mb-6"
        >
          {t("services.title")}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed"
        >
          {t("services.subtitle")}
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-32">
        {packages.map((pkg, i) => {
          const features = t(pkg.featuresKey, { returnObjects: true }) as string[];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.6 }}
              className="bg-card border border-border p-8 lg:p-10 flex flex-col h-full"
            >
              <h3 className="font-serif text-2xl mb-2">{t(pkg.titleKey)}</h3>
              <div className="mb-6">
                <span className="text-sm text-muted-foreground uppercase tracking-widest">{t("services.startingFrom")} </span>
                <span className="text-xl font-medium">${pkg.price}</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-8 font-light">{t(pkg.descKey)}</p>
              <ul className="space-y-4 mb-12 flex-grow">
                {Array.isArray(features) && features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm">
                    <Check className="w-4 h-4 mt-0.5 text-foreground/50 shrink-0" />
                    <span className="font-light">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact">
                <Button variant="outline" className="w-full h-12 uppercase tracking-widest text-xs">
                  {t("services.inquire")}
                </Button>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center bg-muted py-20 px-6"
      >
        <h2 className="font-serif text-3xl md:text-4xl mb-6">{t("services.notSure")}</h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-10 font-light">{t("services.notSureDesc")}</p>
        <Link to="/contact">
          <Button size="lg" className="h-14 px-8 tracking-widest uppercase text-xs bg-foreground text-background hover:bg-foreground/90">
            {t("services.letsTalk")}
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
