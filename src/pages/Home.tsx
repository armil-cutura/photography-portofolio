import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import heroImg from "@/assets/images/hero.png";
import port1 from "@/assets/images/port-1.png";
import port2 from "@/assets/images/port-2.png";
import port3 from "@/assets/images/port-3.png";
import port4 from "@/assets/images/port-4.png";
import port5 from "@/assets/images/port-5.png";
import port6 from "@/assets/images/port-6.png";

const featuredPhotos = [
  { src: port1, alt: "Editorial portrait" },
  { src: port2, alt: "Intimate wedding" },
  { src: port3, alt: "Lifestyle cafe" },
  { src: port4, alt: "Cinematic travel" },
  { src: port5, alt: "Environmental portrait" },
  { src: port6, alt: "Wedding detail" },
];

export function Home() {
  const { t } = useTranslation();

  return (
    <div className="w-full">
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            src={heroImg}
            alt="Cinematic Landscape"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="relative z-10 text-center text-white px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl mb-6 tracking-wider"
          >
            ELARA VANCE
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="font-sans uppercase tracking-[0.3em] text-sm md:text-base text-white/80"
          >
            {t("home.tagline")}
          </motion.p>
        </div>
      </section>

      <section className="py-32 px-6 md:px-12 max-w-[1600px] mx-auto">
        <div className="text-center mb-20">
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">{t("home.selectedWorks")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t("home.selectedWorksDesc")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {featuredPhotos.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="group cursor-pointer overflow-hidden bg-muted aspect-[3/4]"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </motion.div>
          ))}
        </div>

        <div className="mt-20 flex flex-col sm:flex-row justify-center gap-6">
          <Link to="/portfolio">
            <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 tracking-widest uppercase text-xs">
              {t("home.viewPortfolio")}
            </Button>
          </Link>
          <Link to="/contact">
            <Button size="lg" className="w-full sm:w-auto h-14 px-8 tracking-widest uppercase text-xs bg-foreground text-background hover:bg-foreground/90">
              {t("home.bookSession")}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
