import { useState } from "react";
import { useTranslation } from "react-i18next";
import './JobApplyModel.css';
import { useActions } from "../../store/useActions";
import { useJob } from "../../hooks/useJob";

const JobApplyModel = ({ job }) => {
    const { t,i18n } = useTranslation();
    const { setSelectedJob ,setShow } = useActions();

    const [formData, setFormData] = useState({
        applicant_name: "",
        applicant_email: "",
        cv: null
    });

    const resetForm = () => {
        setFormData({
            applicant_name: "",
            applicant_email: "",
            cv: null
        });
        setSelectedJob(null); 
        setShow()
    };

    const { providing, isLoading } = useJob(resetForm, job);

    const handleClose = () => {
        setSelectedJob(null);
        setShow()
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        providing(formData);
    };
const title=i18n.language === 'ar'? job?.title_ar : job.title_en
    return (
        <div className="overlay" dir={t("dir") || "rtl"}>
            <div className="modal">
                <h2 className="modal-title">
                    {t("apply_for")} {title}
                </h2> 

                <p className="modal-text">
                    {t("job")}: {title} 
                </p>

                <input
                    type="text"
                    placeholder={t("applicant_name_placeholder") || t("applicant_name")}
                    className="input"
                    value={formData.applicant_name} 
                    onChange={(e) => setFormData({ ...formData, applicant_name: e.target.value })}
                />

                <input
                    type="email"
                    placeholder={t("applicant_email_placeholder") || t("applicant_email")}
                    className="input"
                    value={formData.applicant_email} 
                    onChange={(e) => setFormData({ ...formData, applicant_email: e.target.value })}
                />

                <input
                    type="file"
                    className="input"
                    accept=".pdf,.doc,.docx" 
                    onChange={(e) => setFormData({ ...formData, cv: e.target.files[0] || null })}
                />

                <div className="modal-actions">
                    <button
                        className="btn-primary"
                        onClick={handleSubmit}
                        disabled={isLoading}
                    >
                        {isLoading ? (t("sending") || "جاري الإرسال...") : (t("submit") || "إرسال")}
                    </button>

                    <button
                        className="btn-secondary"
                        onClick={handleClose}
                        disabled={isLoading}
                    >
                        {t("cancel") || "إلغاء"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JobApplyModel;