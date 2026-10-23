import { useState } from "react";
import { Helmet } from "react-helmet-async";
import "./Style.css"; 
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function FAQ() {
  const [open, setOpen] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const currentDir = i18n.language === "ar" ? "rtl" : "ltr";

  const faqs = t("faq.items", { returnObjects: true }) || [];

  const filteredFaqs = Array.isArray(faqs) 
    ? faqs.filter(item => 
        item.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.a.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const activeFaq = open !== null ? filteredFaqs[open] : null;
  const seoTitle = activeFaq 
    ? `${activeFaq.q} | ${t("faq.seo_suffix")}` 
    : t("faq.seo_title_default");
  
  const seoDescription = activeFaq 
    ? activeFaq.a.substring(0, 150) 
    : t("faq.seo_desc_default");
        
    const lang = i18n.language === 'ar' ? 'ar' : 'en';


  return (
    <div className="faq-container" dir={currentDir}>
      
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content={t("faq.seo_keywords")} />
        <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'} />

        
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="website" />
        
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
      </Helmet>
      
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight mb-3">
          {t("faq.title")}
        </h1>
        <p className="text-slate-500 text-sm md:text-base">
          {t("faq.subtitle")}
        </p>
      </div>

      <div className="mb-8 relative max-w-xl mx-auto">
        <span className={`absolute ${currentDir === "rtl" ? "right-4" : "left-4"} top-3.5 text-slate-400 text-lg`}>🔍</span>
        <input 
          type="text" 
          placeholder={t("faq.search_placeholder")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`w-full p-3 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700 placeholder-slate-400 shadow-sm transition-all text-sm md:text-base ${
            currentDir === "rtl" ? "pr-11 pl-4" : "pl-11 pr-4"
          }`}
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery("")}
            className={`absolute ${currentDir === "rtl" ? "left-3" : "right-3"} top-3 text-xs bg-slate-100 hover:bg-slate-200 text-slate-500 px-2 py-1 rounded-md transition-colors`}
          >
            {t("faq.clear_btn")}
          </button>
        )}
      </div>

      <div className="space-y-4">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((item, i) => {
            const isActive = open === i;
            return (
              <div 
                key={i} 
                className={`faq-card ${isActive ? "faq-card-active" : "faq-card-hover"}`}
              >
                <button
                  type="button"
                  className={`faq-trigger-btn ${isActive ? "text-blue-600 bg-blue-50/20" : "text-slate-700 hover:bg-slate-50/50"}`}
                  onClick={() => setOpen(isActive ? null : i)}
                >
                  <span>{item.q}</span>
                  
                  <svg 
                    className={`w-5 h-5 text-slate-400 transition-transform duration-300 ease-in-out ${isActive ? "transform rotate-180 text-blue-500" : ""}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div className={`faq-answer-wrapper ${isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden">
                    <div className="faq-answer-content">
                      {item.a}
                    </div>
                  </div>
                </div>

              </div>
            );
          })
        ) : (
          <div className="text-center py-12 text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <p className="text-lg">{t("faq.no_results")}</p>
            <p className="text-xs mt-1 text-slate-400">{t("faq.no_results_sub")}</p>
          </div>
        )}
      </div>

      <div className="mt-14 p-6 bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-2xl text-center border border-slate-100 shadow-sm">
        <h3 className="text-slate-800 font-bold text-base md:text-lg mb-1">{t("faq.cta_title")}</h3>
        <p className="text-slate-500 mb-4 text-xs md:text-sm">{t("faq.cta_desc")}</p>
        <button 
          type="button"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-all shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 active:scale-95"
         onClick={() => navigate('/support')}>
          <span>{t("faq.cta_btn")}</span>
          <span className={`text-xs ${currentDir === "rtl" ? "" : "transform rotate-180"}`}>←</span>
        </button>
      </div>

    </div>
  );
}