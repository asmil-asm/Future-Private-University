import { useState, useMemo } from "react";
import Banner from "../../components/Banner/Banner";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineAcademicCap,
  HiOutlineSearch,
  HiX,
  HiOutlineInformationCircle,
} from "react-icons/hi";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useGetData } from "../../hooks/useGetData";
import { apiEndpoint } from "../../services/apiEndpoint";
import Loading from "../../components/Loading/Loading";
import "./DepartmentWebsite.css";


const DepartmentWebsite = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState(null);

  const { data: departments = [], isLoading: deptsLoading } = useGetData({
    key: "departments",
    endpoint: apiEndpoint.departments,
  });

  const { data: colleges = [], isLoading: collegesLoading } = useGetData({
    key: "colleges",
    endpoint: apiEndpoint.colleges,
  });

  const { t, i18n } = useTranslation();
  const lang = i18n.language === "ar" ? "ar" : "en";
  const isAr = lang === "ar";

  const isLoading = deptsLoading || collegesLoading;

  const resolveCollege = (deptCollege) => {
    if (!deptCollege) return null;

    if (typeof deptCollege === "object") {
      if (deptCollege.id != null) {
        return (
          colleges.find((c) => String(c.id) === String(deptCollege.id)) ||
          deptCollege
        );
      }
      return deptCollege;
    }

    const asString = String(deptCollege);
    if (/^\d+$/.test(asString)) {
      return colleges.find((c) => String(c.id) === asString) || null;
    }

    return (
      colleges.find((c) => c.name_ar === asString || c.name_en === asString) || {
        name_ar: asString,
        name_en: asString,
      }
    );
  };

  const pickLang = (obj, base) => {
    if (!obj) return "";
    return isAr
      ? obj[`${base}_ar`] || obj[`${base}_en`] || ""
      : obj[`${base}_en`] || obj[`${base}_ar`] || "";
  };

  const filteredDepts = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();
    if (!search) return departments;

    return departments.filter((dept) => {
      const college = resolveCollege(dept?.college);
      return [
        dept?.name_ar,
        dept?.name_en,
        college?.name_ar,
        college?.name_en,
      ]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(search));
    });
  }, [departments, colleges, searchTerm]);

  const selectedCollege = selectedDept
    ? resolveCollege(selectedDept.college)
    : null;

  const deptName = (dept) => pickLang(dept, "name");
  const collegeDesc = (college) => pickLang(college, "description");

  if (isLoading) return <Loading />;

  return (
    <>
      <Helmet>
        <title>{t("academic_departments_title")}</title>
        <html lang={lang} dir={isAr ? "rtl" : "ltr"} />
        <meta name="description" content={t("academic_departments_description")} />
        <meta name="keywords" content={t("academic_departments_keywords")} />
      </Helmet>

      <Banner title={t("academic_departments")} />

      <main className="department-container" dir={isAr ? "rtl" : "ltr"}>
        <section className="search-section" aria-labelledby="page-title">
          <h1 id="page-title" className="main-title">
            {t("academic_departments")}
          </h1>

          <div className="search-wrapper">
            <HiOutlineSearch className="search-icon" />
            <input
              type="text"
              placeholder={t("search_department")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label={t("search_department")}
            />
          </div>
        </section>

        {filteredDepts.length === 0 ? (
          <p className="no-results">{t("no_search_results")}</p>
        ) : (
          <motion.div layout className="department-grid">
            <AnimatePresence mode="popLayout">
              {filteredDepts.map((item, index) => {
                const college = resolveCollege(item.college);
                const collegeName = pickLang(college, "name");

                return (
                  <motion.div
                    layout
                    key={item.id || `dept-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="dept-card"
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedDept(item)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && setSelectedDept(item)
                    }
                  >
                    <div className="card-header">
                      <span className="dept-icon">🎓</span>
                      {collegeName && (
                        <div className="college-tag" title={collegeName}>
                          <HiOutlineAcademicCap />
                          <span>{collegeName}</span>
                        </div>
                      )}
                    </div>

                    <div className="card-body">
                      <h3 className="name-current" dir={isAr ? "rtl" : "ltr"}>
                        {deptName(item)}
                      </h3>
                    </div>

                    <div className="card-footer">
                      <button type="button" className="view-details">
                        {t("view_details")}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </main>

      <AnimatePresence>
        {selectedDept && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
            onClick={() => setSelectedDept(null)}
          >
            <motion.div
              initial={{ scale: 0.85, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 40 }}
              className="modal-content"
              dir={isAr ? "rtl" : "ltr"}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="close-modal"
                onClick={() => setSelectedDept(null)}
                aria-label={t("close")}
              >
                <HiX />
              </button>

              <div className="modal-header">
                <span className="modal-icon">🎓</span>
                <h2>{deptName(selectedDept)}</h2>
              </div>

              <div className="modal-body">
                <div className="info-grid">
                  <div className="info-card">
                    <HiOutlineAcademicCap className="info-icon" />
                    <div>
                      <p className="label">{t("college")}</p>
                      <p className="val">
                        {pickLang(selectedCollege, "name") || "—"}
                      </p>
                    </div>
                  </div>
                </div>

                {collegeDesc(selectedCollege) && (
                  <div className="description-box">
                    <h4 className="box-title">
                      <HiOutlineInformationCircle className="inline-block me-1" />
                      {t("about_college")}
                    </h4>
                    <p className={isAr ? "text-ar" : "text-en"}>
                      {collegeDesc(selectedCollege)}
                    </p>
                  </div>
                )}
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => setSelectedDept(null)}
                >
                  {t("close")}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DepartmentWebsite;