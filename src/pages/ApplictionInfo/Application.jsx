import { useState, useRef, useEffect } from 'react';
import './Application.css';
import FormApply from '../../components/FormApply/FormApply';
import Banner from '../../components/Banner/Banner';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { useGetData } from '../../hooks/useGetData';
import { apiEndpoint } from '../../services/apiEndpoint';
import Loading from '../../components/Loading/Loading';
import { useActions } from '../../store/useActions';

export default function Application() {
  const { t, i18n } = useTranslation();

  const { data, isLoading } = useGetData({
    key: 'admissions',
    endpoint: apiEndpoint.admissions,
  });

  // ✅ يدعم الحالتين: مصفوفة مباشرة أو { results: [...] }
  const admissions = Array.isArray(data)
    ? data
    : Array.isArray(data?.results)
      ? data.results
      : [];

  const { setApply, applyForm, setSelectedProgram } = useActions();
  const [selectedCollege, setSelectedCollege] = useState(null);
  const detailsRef = useRef(null);
  const lang = i18n.language === 'ar' ? 'ar' : 'en';

  // ✅ تحديث dir/lang على <html> بشكل صحيح بدل استخدامه داخل Helmet
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const getFacultyIcon = (nameEn = '', nameAr = '') => {
    const name = `${nameEn} ${nameAr}`.toLowerCase();
    if (name.includes('pharmacy') || name.includes('صيدل')) return '💊';
    if (
      name.includes('business') ||
      name.includes('إدار') ||
      name.includes('اقتصاد') ||
      name.includes('محاسب')
    )
      return '💼';
    if (name.includes('civil') || name.includes('مدني')) return '🏗️';
    if (name.includes('architecture') || name.includes('عمار')) return '🏛️';
    if (name.includes('software') || name.includes('برمجي')) return '💻';
    if (
      name.includes('network') ||
      name.includes('شبك') ||
      name.includes('information') ||
      name.includes('معلومات')
    )
      return '🌐';
    if (
      name.includes('anatomy') ||
      name.includes('تشريح') ||
      name.includes('physiolog') ||
      name.includes('فيزيولوج')
    )
      return '🧬';
    if (name.includes('arabic') || name.includes('عربي')) return '📖';
    return '🎓';
  };

  const handleSelect = (college) => {
    setSelectedCollege(college);
    setTimeout(() => {
      detailsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleApplyClick = () => {
    const programId =
      selectedCollege?.program_details?.id || selectedCollege?.id;
    if (!programId) return;
    setSelectedProgram(programId);
    setApply();
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <Helmet>
        <title>{t('admission_info_title')}</title>
        <meta name="description" content={t('academic_faculties_subtitle')} />
        <meta property="og:title" content={t('admission_info_title')} />
        <meta
          property="og:description"
          content={t('academic_faculties_subtitle')}
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <Banner title={t('admission_info_title')} />

      <div
        className="admission-page"
        dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
      >
        <div className="max-w-7xl mx-auto">
          <div className="section-heading-box">
            <h2 className="section-heading-title">
              <span>🏛️</span> {t('academic_faculties')}
            </h2>
            <p className="section-heading-subtitle">
              {t('academic_faculties_subtitle')}
            </p>
          </div>

          {/* ✅ نستخدم admissions مباشرة بدل admissions.results */}
          {admissions.length > 0 ? (
            <div className="faculties-grid">
              {admissions.map((item) => {
                const nameEn = item?.program_details?.name_en || '';
                const nameAr = item?.program_details?.name_ar || '';
                const displayName =
                  item?.program_details?.[`name_${lang}`] ||
                  nameEn ||
                  nameAr ||
                  'No Name Available';
                const facultyIcon = getFacultyIcon(nameEn, nameAr);
                const isActive = selectedCollege?.id === item.id;

                return (
                  <div
                    key={item.id}
                    className={`faculty-card ${isActive ? 'faculty-card-active' : ''}`}
                  >
                    <div className="faculty-card-icon">{facultyIcon}</div>
                    <h3 className="faculty-card-title">{displayName}</h3>
                    <button
                      onClick={() => handleSelect(item)}
                      className={isActive ? 'btn-selected' : 'btn-view-details'}
                    >
                      {isActive ? t('selected') : t('view_details')}
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            // ✅ حالة عدم وجود بيانات
            <div className="placeholder-box">
              <div className="placeholder-icon">📭</div>
              <p className="placeholder-text">
                {t('no_data') || 'No data available'}
              </p>
            </div>
          )}

          {selectedCollege ? (
            <div ref={detailsRef} className="details-container animate-fade-in">
              <div className="details-header">
                <div className="details-header-title">
                  <span>📋</span>
                  <h2>
                    {selectedCollege?.program_details?.[`name_${lang}`] ||
                      selectedCollege.title ||
                      selectedCollege?.program_details?.name_en}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedCollege(null)}
                  className="btn-close-details"
                >
                  ✕ {t('close_details')}
                </button>
              </div>

              <div className="details-data-grid">
                <div>
                  <h4 className="details-section-title">
                    <span className="details-title-dot"></span>{' '}
                    {t('requirements')}
                  </h4>
                  <div className="requirements-list">
                    {lang === 'ar'
                      ? selectedCollege.requirements_ar
                      : selectedCollege.requirements_en}
                  </div>
                </div>

                <div className="border-l border-gray-100 pl-4">
                  <h4 className="details-section-title">
                    <span className="details-title-dot"></span>
                    {t('application_procedure')}
                  </h4>
                  <div className="procedures-timeline">
                    {lang === 'ar'
                      ? selectedCollege.procedure_ar
                      : selectedCollege.procedure_en}
                  </div>
                </div>

                <div className="border-l border-gray-100 pl-4 flex flex-col items-center justify-start">
                  <h4 className="details-section-title">
                    <span className="details-title-dot"></span>{' '}
                    {t('tuition_fees')}
                  </h4>
                  <div className="fees-box">
                    <span className="fees-amount">
                      {selectedCollege.tuition_fee}
                    </span>
                    <span className="fees-currency">{t('usd_annually')}</span>
                  </div>
                  <div className="fees-bg-icon">🎓</div>
                </div>

                <div className="border-l border-gray-100 pl-4">
                  <h4 className="details-section-title">
                    <span className="details-title-dot"></span>
                    {t('academic_calendar')}
                  </h4>
                  <div className="calendar-list">
                    {selectedCollege.academic_calendar}
                  </div>
                </div>
              </div>

              {/* ✅ onClick على الزر نفسه بدل الـ div */}
              <div className="cta-submit-box">
                <button
                  className="btn-apply-now"
                  onClick={handleApplyClick}
                >
                  {t('apply')}
                </button>
              </div>

              {applyForm && <FormApply />}
            </div>
          ) : (
            <div className="placeholder-box">
              <div className="placeholder-icon">👈</div>
              <p className="placeholder-text">
                {t('select_faculty_message')}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}