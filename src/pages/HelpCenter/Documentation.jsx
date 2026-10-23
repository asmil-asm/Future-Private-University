import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import "./Style.css"; 
import { Link } from "react-router-dom";

export default function Documentation() {
  const { t, i18n } = useTranslation();
  const currentDir = i18n.language === "ar" ? "rtl" : "ltr";

  const docs = t("documentation.items", { returnObjects: true }) || [];
    const lang = i18n.language === 'ar' ? 'ar' : 'en';

  return (
    <div className="doc-container" dir={currentDir}>
      
      <Helmet>
        <title>{t("documentation.seo_title")}</title>
        <meta name="description" content={t("documentation.seo_desc")} />
        <meta name="keywords" content={t("documentation.seo_keywords")} />
        <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'} />
        <meta property="og:title" content={t("documentation.seo_title")} />
        <meta property="og:description" content={t("documentation.seo_desc")} />
        <meta property="og:type" content="website" />
        
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={t("documentation.seo_title")} />
        <meta name="twitter:description" content={t("documentation.seo_desc")} />
      </Helmet>

      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight mb-3">
          {t("documentation.title")}
        </h1>
        <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto">
          {t("documentation.subtitle")}
        </p>
      </div>

      <div className="doc-grid">
        {Array.isArray(docs) && docs.map((item, i) => (
          <div key={i} className="doc-card">
            <div>
              <div className="doc-icon-box">
                {item.icon || "📄"}
              </div>
              <h2 className="doc-card-title">{item.t}</h2>
              <p className="doc-text">{item.d}</p>
            </div>
            <Link to={item.link} className="doc-link">
              <span>{t("documentation.view_link")}</span>
              <span className={`text-xs ${currentDir === "rtl" ? "" : "transform rotate-180"}`}>←</span>
                  </Link>
                  </div>
        ))}
      </div>

    </div>
  );
}