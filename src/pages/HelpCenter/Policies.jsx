import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import "./Style.css"; 

export default function Policies() {
  const { t, i18n } = useTranslation();
  const currentDir = i18n.language === "ar" ? "rtl" : "ltr";

  const rules = t("policies.rules", { returnObjects: true }) || [];
    const lang = i18n.language === 'ar' ? 'ar' : 'en';

  return (
    <div className="policies-container" dir={currentDir}>
      
      <Helmet>
        <title>{t("policies.seo_title")}</title>
        <meta name="description" content={t("policies.seo_desc")} />
        <meta name="keywords" content={t("policies.seo_keywords")} />
          <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'} />

        
        <meta property="og:title" content={t("policies.seo_title")} />
        <meta property="og:description" content={t("policies.seo_desc")} />
        <meta property="og:type" content="website" />
        
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={t("policies.seo_title")} />
        <meta name="twitter:description" content={t("policies.seo_desc")} />
      </Helmet>

      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight mb-3">
          {t("policies.title")}
        </h1>
        <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto">
          {t("policies.subtitle")}
        </p>
      </div>

      <div className="policies-grid">
        {Array.isArray(rules) && rules.map((r, i) => (
          <div key={i} className="policy-card">
            <div className="policy-icon-box">
              {String(i + 1).padStart(2, '0')}
            </div>
            <div className="policy-text">
              {r}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}