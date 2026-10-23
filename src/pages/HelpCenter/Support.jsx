import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import "./Style.css"; 
import axios from "axios";
import toast from "react-hot-toast";
export default function Support() {
  const { t, i18n } = useTranslation();
  const currentDir = i18n.language === "ar" ? "rtl" : "ltr";
  const lang = i18n.language === 'ar' ? 'ar' : 'en';
 
  const [formData, setFormData] = useState({      sender_name: "",
        sender_email: "",
        subject: "",
        message: "" });
    const [loading, setLoading] = useState(false); 

   const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

 
    const handelSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.sender_name.trim() || !formData.sender_email.trim()|| !formData.subject.trim()  || !formData.message.trim()) {
            toast.error(t('form_required_fields'));
            return;
        }

        setLoading(true);
        try {
            const res = await axios.post(`http://127.0.0.1:8000/api/v1/core/contact/`, formData); 
            
            if (res.status === 201 || res.status === 200) {
                toast.success(t("form_success"));
                
                setFormData({
                     sender_name: "",
                    sender_email: "",
                    subject: "",
                    message: ""
                });
            }
        } catch (error) {
            console.error(error);
            toast.error(t("form_failed"));
        } finally {
            setLoading(false);
        }
    };

  return (
    <div className="support-container" dir={currentDir}>
      
      <Helmet>
        <title>{t("support.seo_title")}</title>
        <meta name="description" content={t("support.seo_desc")} />
        <meta name="keywords" content={t("support.seo_keywords")} />
        <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'} />

        <meta property="og:title" content={t("support.seo_title")} />
        <meta property="og:description" content={t("support.seo_desc")} />
        <meta property="og:type" content="website" />
        
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={t("support.seo_title")} />
        <meta name="twitter:description" content={t("support.seo_desc")} />
      </Helmet>

      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight mb-3">
          {t("support.title")}
        </h1>
        <p className="text-slate-500 text-sm md:text-base max-w-md mx-auto">
          {t("support.subtitle")}
        </p>
      </div>

      <form onSubmit={handelSubmit} className="support-card">
        <div>
          <label className="block text-slate-700 font-medium text-sm mb-2">
            {t("support.name_label")}
          </label>
          <input 
            type="text"
            name="sender_name"
            value={formData.sender_name}
            onChange={handleChange}
            className="support-input" 
            placeholder={t("support.name_placeholder")} 
            required
          />
        </div>

        <div>
          <label className="block text-slate-700 font-medium text-sm mb-2">
            {t("support.email_label")}
          </label>
          <input 
            type="email" 
            name="sender_email"
            value={formData.sender_email}
            onChange={handleChange}
            className="support-input" 
            placeholder={t("support.email_placeholder")} 
            required
          />
        </div>

        <div>
          <label className="block text-slate-700 font-medium text-sm mb-2">
            {t("support.subject_label")}
          </label>
          <input 
            type="text" 
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="support-input" 
            placeholder={t("support.subject_placeholder")} 
            required
          />
        </div>

        <div>
          <label className="block text-slate-700 font-medium text-sm mb-2">
            {t("support.message_label")}
          </label>
          <textarea 
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="support-input h-36 resize-none" 
            placeholder={t("support.message_placeholder")} 
            required
          />
        </div>

        <button disabled={loading}  type="submit" className="support-btn">
        {loading ? t('support.submit_btn_loding') : t('support.submit_btn')}
        </button>
      </form>

    </div>
  );
}