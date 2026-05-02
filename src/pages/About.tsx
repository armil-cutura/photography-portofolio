import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import aboutImg from "@/assets/images/about.png";

export function About() {
  const { t } = useTranslation();

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-6xl mx-auto w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-32">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="aspect-[3/4] overflow-hidden bg-muted relative"
        >
          <img src={aboutImg} alt="Elara Vance Portrait" className="w-full h-full object-cover" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="font-serif text-5xl md:text-6xl mb-8">{t("about.title")}</h1>
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed font-sans font-light">
            <p>{t("about.p1")}</p>
            <p>{t("about.p2")}</p>
            <p>{t("about.p3")}</p>
            <p>{t("about.p4")}</p>
          </div>
          <div className="mt-12">
            <Link to="/contact">
              <Button size="lg" className="h-14 px-8 tracking-widest uppercase text-xs bg-foreground text-background hover:bg-foreground/90">
                {t("about.cta")}
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="bg-card p-12 md:p-20 text-center"
      >
        <h2 className="font-serif text-4xl mb-16">{t("about.approach")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
          {(["1", "2", "3"] as const).map((n) => (
            <div key={n}>
              <h3 className="font-serif text-2xl mb-4">{t(`about.approach${n}Title`)}</h3>
              <p className="text-muted-foreground leading-relaxed font-light">{t(`about.approach${n}`)}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
