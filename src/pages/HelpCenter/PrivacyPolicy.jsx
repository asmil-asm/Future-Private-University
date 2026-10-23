import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import "./Style.css"; 

export default function Privacy() {
  const { t, i18n } = useTranslation();
  const currentDir = i18n.language === "ar" ? "rtl" : "ltr";

  const privacyItems = t("privacy.items", { returnObjects: true }) || [];
    const lang = i18n.language === 'ar' ? 'ar' : 'en';

  return (
    <div className="privacy-container" dir={currentDir}>
      
      <Helmet>
        <title>{t("privacy.seo_title")}</title>
        <meta name="description" content={t("privacy.seo_desc")} />
        <meta name="keywords" content={t("privacy.seo_keywords")} />
        
        <meta property="og:title" content={t("privacy.seo_title")} />
        <meta property="og:description" content={t("privacy.seo_desc")} />
        <meta property="og:type" content="website" />
        
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={t("privacy.seo_title")} />
        <meta name="twitter:description" content={t("privacy.seo_desc")} />
          <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'} />

      </Helmet>

      <div className=" mb-12 border-b border-slate-100 pb-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight mb-3">
          {t("privacy.title")}
        </h1>
        <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto">
          {t("privacy.subtitle")}
        </p>
      </div>

      <div className="space-y-6">
        {Array.isArray(privacyItems) && privacyItems.map((item, i) => (
          <div key={i} className="privacy-card">
            <h2 className="privacy-card-title">
              <span className="w-1.5 h-5 bg-blue-600 rounded-full inline-block"></span>
              {item.t}
            </h2>
            <p className="privacy-text">{item.d}</p>
          </div>
        ))}
      </div>

    </div>
  );
}