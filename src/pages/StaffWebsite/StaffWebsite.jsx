import Banner from '../../components/Banner/Banner';
import { useEffect } from 'react';
import TransitionPage from '../../components/Transition/TransitionPage';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import ResearchStaff from '../../components/ResearchStaff/ResearchStaff';
import { useLocation } from 'react-router-dom';
import { useGetData } from '../../hooks/useGetData';
import { apiEndpoint } from '../../services/apiEndpoint';
import Loading from '../../components/Loading/Loading';
import { useActions } from '../../store/useActions';
import './StaffWebsite.css';
import { useState } from 'react';
const StaffWebsite = () => {
  const [
    search, setSearch,
   ] = useState();
  const {selectedDepartment, setSelectedDepartment
    ,selectedStaff, setSelectedStaff
}=useActions()
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const allowedDepartments = location.state?.departmentIds || null;

  const { data: departments = [], isLoading: deptLoading } = useGetData({
    key: 'departments',
    endpoint: apiEndpoint.departments,
  });

  const { data: staff = [], isLoading: staffLoading } = useGetData({
    key: 'staff',
    endpoint: apiEndpoint.staff,
  });

 

  useEffect(() => {
    if (allowedDepartments && allowedDepartments.length > 0) {
      setSelectedDepartment(allowedDepartments[0]);
    }
    return () => {
      setSelectedDepartment("");
    };
  }, []);

  const lang = i18n.language === 'ar' ? 'ar' : 'en';
  const pageTitle = `${t('staff')} | ${t('site_name')}`;
  const pageDesc = t('staff_description');

  const isLoading = deptLoading || staffLoading 
  if (isLoading) return <Loading />;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:type" content="website" />
      </Helmet>

      <Banner title={t('staff')} />

      <TransitionPage>
        <div className="staff" style={{ direction: lang === 'ar' ? 'rtl' : 'ltr' }}>

          {!selectedStaff ? (
            <>
              <div className="staff-page-header">
                <h1>{t('our_staff')}</h1>
                <p className="staff-page-subtitle">{t('staff_subtitle')}</p>
              </div>

              <div className="staff-filters">
                <input
                  type="text"
                  className="staff-search"
                  placeholder={t("search_staff")}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                <select
                  className="staff-select"
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                  <option value="">{t("all_departments")}</option>
                  {departments?.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {lang === "ar" ? dept.name_ar || dept.name_en : dept.name_en}
                    </option>
                  ))}
                </select>
              </div>

              <div className="staff-page">
                {staff
                  ?.filter((item) => {
                    const name = lang === "ar" ? item.full_name_ar || item.full_name : item.full_name;
                    const matchesSearch = !search || name.toLowerCase().includes(search.toLowerCase());

                    if (selectedDepartment) {
                      return matchesSearch && String(item.department) === String(selectedDepartment);
                    }
                    return matchesSearch;
                  })
                  .map((item, index) => {
                    const matchingDept = departments?.find(
                      (d) => String(d.id) === String(item.department)
                    );
                    const currentName =
                      lang === "ar" ? item.full_name_ar || item.full_name : item.full_name;
                    const currentTitle =
                      lang === "ar" ? item.title_ar || item.title : item.title;
                    const currentBio =
                      lang === "ar" ? item.bio_ar || item.bio : item.bio;
                    const currentDeptName = matchingDept
                      ? lang === "ar"
                        ? matchingDept.name_ar || matchingDept.name_en
                        : matchingDept.name_en
                      : t("not_available");
                    const currentStaffType =
                      lang === "ar" ? item.staff_type_ar : item.staff_type 

                    return (
                      <div className="staff-card" key={item.id || index}>
                        <div className="staff-header">
                          <div className="name-overlay">{currentName}</div>
                          <p className="staff-title">{currentTitle || t("not_available")}</p>
                        </div>

                        <div className="staff-body">
                          <p className="staff-bio">{currentBio || t("not_available")}</p>
                          {item.email && (
                            <p className="staff-email">
                              <a
                                href={`mailto:${item.email}`}
                                onClick={(e) => e.stopPropagation()}
                              >
                                {item.email}
                              </a>
                            </p>
                          )}
                          <div className="staff-meta">
                            <div className="flex flex-col gap-y-1">
                              <span>{t("department")}: {currentDeptName}</span>
                            </div>
                            <button
                              className="details-btn"
                              onClick={() =>
                                setSelectedStaff({
                                  ...item,
                                  currentName,
                                  currentTitle,
                                  currentBio,
                                  currentDeptName,
                                  currentStaffType,
                                })
                              }
                            >
                              {t('Details')}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </>
          ) : (
            <TransitionPage>
              <ResearchStaff />
            </TransitionPage>
          )}
        </div>
      </TransitionPage>
    </>
  );
};

export default StaffWebsite;