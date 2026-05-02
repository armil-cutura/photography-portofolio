import { Link } from "react-router-dom";
import { SiInstagram, SiPinterest, SiFacebook } from "react-icons/si";
import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-foreground text-background py-20">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center md:items-start gap-12">
        <div className="text-center md:text-left">
          <Link to="/" className="font-serif text-3xl tracking-wider block mb-4">
            ELARA VANCE
          </Link>
          <p className="text-background/60 font-sans text-sm max-w-sm">
            {t("footer.tagline")}
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-12 text-center md:text-left">
          <div className="flex flex-col gap-4">
            <h4 className="font-serif text-xl">{t("footer.explore")}</h4>
            <Link to="/portfolio" className="text-sm text-background/60 hover:text-background transition-colors uppercase tracking-wider">{t("nav.portfolio")}</Link>
            <Link to="/about" className="text-sm text-background/60 hover:text-background transition-colors uppercase tracking-wider">{t("nav.about")}</Link>
            <Link to="/services" className="text-sm text-background/60 hover:text-background transition-colors uppercase tracking-wider">{t("nav.services")}</Link>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-serif text-xl">{t("footer.connect")}</h4>
            <Link to="/contact" className="text-sm text-background/60 hover:text-background transition-colors uppercase tracking-wider">{t("nav.contact")}</Link>
            <div className="flex gap-4 justify-center md:justify-start mt-2">
              <a href="#" className="text-background/60 hover:text-background transition-colors">
                <SiInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-background/60 hover:text-background transition-colors">
                <SiPinterest className="w-5 h-5" />
              </a>
              <a href="#" className="text-background/60 hover:text-background transition-colors">
                <SiFacebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-20 pt-8 border-t border-background/10 text-center md:text-left text-xs text-background/40">
        <p>&copy; {new Date().getFullYear()} {t("footer.copyright")}</p>
      </div>
    </footer>
  );
}
