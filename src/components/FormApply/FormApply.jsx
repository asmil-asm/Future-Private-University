/* eslint-disable react-hooks/purity */
import { useTranslation } from "react-i18next";
import "./FormApply.css";
import { useState } from "react";
import toast from "react-hot-toast";
import { useActions } from "../../store/useActions";
import { useApply } from "../../hooks/useApply";

const FormApply = () => {
  const { t } = useTranslation();
  const { setApply, selectedProgram} = useActions();
  const [fileKey, setFileKey] = useState(Date.now());
 const [formData, setFormData] = useState({
  full_name: "", 
  email: "",
  national_id: "",
  form_file: null,
});

const resetForm = () => {
  setFormData({
    full_name: "",
    email: "",
    national_id: "",
    form_file: null,
  });
  setFileKey(Date.now());
};
const {apply,isLoading}=useApply(resetForm)

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedProgram) {
      toast.error(t("Please select a program"));
      return;
    }
apply(formData)
   
  };

  return (
    <section className="form-overlay">
      <div className="form-container">
        <header className="form-header">
          <h2 className="form-title">{t("title")}</h2>
          <p className="form-description">{t("description")}</p>
        </header>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder={t("Full Name")}
            className="form-input"
            value={formData.full_name}
            onChange={(e) =>
              setFormData({ ...formData, full_name: e.target.value })
            }
            required
          />

          <input
            type="email"
            placeholder={t("Email")}
            className="form-input"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />

          <input
            type="text"
            placeholder={t("National ID")}
            className="form-input"
            value={formData.national_id}
            onChange={(e) =>
              setFormData({ ...formData, national_id: e.target.value })
            }
            required
          />

          <input
            key={fileKey}
            type="file"
            className="form-file"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            onChange={(e) =>
              setFormData({
                ...formData,
                form_file: e.target.files?.[0] || null,
              })
            }
          />

          <div className="form-actions">
            <button
              type="button"
              className="form-cancel"
              onClick={() => setApply(false)}
              disabled={isLoading}
            >
              {t("cancel")}
            </button>

            <button
              type="submit"
              className="form-submit"
              disabled={isLoading}
            >
              {isLoading ? t("Sending...") : t("submit")}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default FormApply;