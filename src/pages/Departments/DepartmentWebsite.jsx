import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import Banner from "../../components/Banner/Banner";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineAcademicCap,
  HiOutlineSearch,
  HiX,
  HiOutlineInformationCircle,
  HiOutlineExclamationCircle,
} from "react-icons/hi";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useGetData } from "../../hooks/useGetData";
import { apiEndpoint } from "../../services/apiEndpoint";
import Loading from "../../components/Loading/Loading";
import "./DepartmentWebsite.css";

const normalize = (value) =>
  String(value ?? "")
    .toLowerCase()
    .replace(/[\u064B-\u0652]/g, "") 
    .replace(/[أإآا]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/\s+/g, " ")
    .trim();

const DepartmentWebsite = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState(null);

  const lastFocusedRef = useRef(null);
  const closeBtnRef = useRef(null);
  const modalRef = useRef(null);

  const {
    data: departments,
    isLoading: deptsLoading,
    isError: deptsError,
  } = useGetData({
    key: "departments",
    endpoint: apiEndpoint.departments,
  });

  const {
    data: colleges,
    isLoading: collegesLoading,
    isError: collegesError,
  } = useGetData({
    key: "colleges",
    endpoint: apiEndpoint.colleges,
  });

  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";
  const lang = isAr ? "ar" : "en";
  const isLoading = deptsLoading || collegesLoading;
  const isError = deptsError || collegesError;

  const departmentList = useMemo(
    () => (Array.isArray(departments) ? departments : []),
    [departments]
  );
  const collegeList = useMemo(
    () => (Array.isArray(colleges) ? colleges : []),
    [colleges]
  );

  const resolveCollege = useCallback(
    (deptCollege) => {
      if (!deptCollege) return null;

      if (typeof deptCollege === "object") {
        if (deptCollege.id != null) {
          return (
            collegeList.find(
              (c) => String(c.id) === String(deptCollege.id)
            ) || deptCollege
          );
        }
        return deptCollege;
      }

      const asString = String(deptCollege);
      if (/^\d+$/.test(asString)) {
        return (
          collegeList.find((c) => String(c.id) === asString) || null
        );
      }

      return (
        collegeList.find(
          (c) => c.name_ar === asString || c.name_en === asString
        ) || { name_ar: asString, name_en: asString }
      );
    },
    [collegeList]
  );

  const pickLang = useCallback(
    (obj, base) => {
      if (!obj) return "";
      return isAr
        ? obj[`${base}_ar`] || obj[`${base}_en`] || ""
        : obj[`${base}_en`] || obj[`${base}_ar`] || "";
    },
    [isAr]
  );

  const deptName = useCallback((dept) => pickLang(dept, "name"), [pickLang]);
  const collegeDesc = useCallback(
    (collegeObj) => pickLang(collegeObj, "description"),
    [pickLang]
  );

  const filteredDepts = useMemo(() => {
    const search = normalize(searchTerm);
    if (!search) return departmentList;

    return departmentList.filter((dept) => {
      const deptCollege = resolveCollege(dept?.college);
      return [
        dept?.name_ar,
        dept?.name_en,
        deptCollege?.name_ar,
        deptCollege?.name_en,
      ]
        .filter(Boolean)
        .some((v) => normalize(v).includes(search));
    });
  }, [departmentList, resolveCollege, searchTerm]);

  const selectedCollege = selectedDept
    ? resolveCollege(selectedDept.college)
    : null;

  useEffect(() => {
    if (!selectedDept) return;

    const onKey = (e) => {
      if (e.key === "Escape") {
        setSelectedDept(null);
        return;
      }
      if (e.key === "Tab" && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      }
    };

    document.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 50);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      window.clearTimeout(focusTimer);
      if (lastFocusedRef.current instanceof HTMLElement) {
        lastFocusedRef.current.focus();
      }
    };
  }, [selectedDept]);

  const openDept = (dept, event) => {
    lastFocusedRef.current = event?.currentTarget ?? null;
    setSelectedDept(dept);
  };

  if (isLoading) return <Loading />;

  if (isError) {
    return (
      <>
        <Helmet>
          <title>{t("academic_departments_title")}</title>
          <html lang={lang} dir={isAr ? "rtl" : "ltr"} />
        </Helmet>
        <Banner title={t("academic_departments")} />
        <main className="department-container" dir={isAr ? "rtl" : "ltr"}>
          <div className="error-state" role="alert">
            <HiOutlineExclamationCircle className="error-icon" />
            <p>{t("load_error") || "تعذّر تحميل البيانات، حاول مرة أخرى."}</p>
            <button
              type="button"
              className="btn-primary"
              onClick={() => window.location.reload()}
            >
              {t("retry") || "إعادة المحاولة"}
            </button>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{t("academic_departments_title")}</title>
        <html lang={lang} dir={isAr ? "rtl" : "ltr"} />
        <meta
          name="description"
          content={t("academic_departments_description")}
        />
        <meta
          name="keywords"
          content={t("academic_departments_keywords")}
        />
      </Helmet>

      <Banner title={t("academic_departments")} />

      <main className="department-container" dir={isAr ? "rtl" : "ltr"}>
        <section className="search-section" aria-labelledby="page-title">
          <h1 id="page-title" className="main-title">
            {t("academic_departments")}
          </h1>

          <div className="search-wrapper">
            <HiOutlineSearch className="search-icon" aria-hidden="true" />
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
                const deptCollege = resolveCollege(item.college);
                const collegeName = pickLang(deptCollege, "name");

                return (
                  <motion.button
                    type="button"
                    layout
                    key={item.id ?? `dept-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="dept-card"
                    onClick={(e) => openDept(item, e)}
                    aria-haspopup="dialog"
                  >
                    <div className="card-header">
                      <span className="dept-icon" aria-hidden="true">
                        🎓
                      </span>
                      {collegeName && (
                        <div
                          className="college-tag"
                          title={collegeName}
                        >
                          <HiOutlineAcademicCap aria-hidden="true" />
                          <span>{collegeName}</span>
                        </div>
                      )}
                    </div>

                    <div className="card-body">
                      <h3
                        className="name-current"
                        dir={isAr ? "rtl" : "ltr"}
                      >
                        {deptName(item)}
                      </h3>
                    </div>

                    <div className="card-footer">
                      <span className="view-details">
                        {t("view_details")}
                      </span>
                    </div>
                  </motion.button>
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
            role="presentation"
          >
            <motion.div
              ref={modalRef}
              initial={{ scale: 0.85, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 40 }}
              className="modal-content"
              dir={isAr ? "rtl" : "ltr"}
              role="dialog"
              aria-modal="true"
              aria-labelledby="dept-modal-title"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                ref={closeBtnRef}
                type="button"
                className="close-modal"
                onClick={() => setSelectedDept(null)}
                aria-label={t("close")}
              >
                <HiX aria-hidden="true" />
              </button>

              <div className="modal-header">
                <span className="modal-icon" aria-hidden="true">
                  🎓
                </span>
                <h2 id="dept-modal-title">{deptName(selectedDept)}</h2>
              </div>

              <div className="modal-body">
                <div className="info-grid">
                  <div className="info-card">
                    <HiOutlineAcademicCap
                      className="info-icon"
                      aria-hidden="true"
                    />
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
                      <HiOutlineInformationCircle
                        className="inline-block me-1"
                        aria-hidden="true"
                      />
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