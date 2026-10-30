import { useTranslation } from "react-i18next";
import { useGetData } from "../../hooks/useGetData";
import { apiEndpoint } from "../../services/apiEndpoint";
import Loading from "../Loading/Loading";
import { useActions } from "../../store/useActions";
import './ResearchStaff.css';

const ResearchStaff = () => {
  const { selectedResearch, setSelectedResearch, selectedStaff, setSelectedStaff } = useActions();
  const { data, isLoading } = useGetData({
    key: 'research',
    endpoint: apiEndpoint.research
  });
  const { t, i18n } = useTranslation();
const research=Array.isArray(data)?data:[]
  const lang = i18n.language === 'ar' ? 'ar' : 'en';

  if (!selectedStaff) {
    return <div className="profile-container">{lang === 'ar' ? 'جاري تحميل بيانات الموظف...' : 'Loading staff data...'}</div>;
  }

  const staffResearches = research?.filter(
    (res) => String(res.staff) === String(selectedStaff.id) || res.author_name === selectedStaff.currentName
  ) || [];

  const researchTitle = selectedResearch ? (lang === 'ar' ? selectedResearch.title_ar : selectedResearch.title_en) : '';
  const researchAbstract = selectedResearch ? (lang === 'ar' ? selectedResearch.abstract_ar : selectedResearch.abstract_en) : '';





  if (isLoading) return <Loading />;

  return (
    <div className="profile-container">
   

      <button 
        className="back-btn" 
        onClick={() => selectedResearch ? setSelectedResearch(null) : setSelectedStaff(null)}
      >
        {lang === 'ar' ? '→ رجوع' : '← Back'}
      </button>

      {!selectedResearch ? (
        <>
          <div className="profile-header-card">
            <div className="profile-bio-summary">
              <h3>{lang === 'ar' ? 'نبذة عني' : 'About Me'}</h3>
              <p>{selectedStaff.currentBio || t("not_available")}</p>
            </div>

            <div className="profile-main-info">
              <div className="profile-large-avatar">
                {selectedStaff.currentName?.charAt(0) || '👤'}
              </div>
              <h2>{selectedStaff.currentName}</h2>
              <p className="profile-rank">{selectedStaff.currentTitle}</p>
              <p className="profile-dept-text">{selectedStaff.currentDeptName}</p>
              
              <div className="profile-contact-details">
                {selectedStaff.email && <span>📧 {selectedStaff.email}</span>}
                {selectedStaff.phone && <span>📞 {selectedStaff.phone}</span>}
                {selectedStaff.office && <span>🏢 {selectedStaff.office}</span>}
              </div>
            </div>
          </div>

          <div className="research-section-title">
            <h3>{lang === 'ar' ? 'البحث العلمي' : 'Scientific Research'}</h3>
          </div>

          <div className="research-list">
            {staffResearches.length > 0 ? (
              staffResearches.map((research, idx) => {
                const itemTitle = lang === 'ar' ? research.title_ar : research.title_en;
                const itemAbstract = lang === 'ar' ? research.summary_ar : research.summary_en;
                const pubDate = research.published_date;

                return (
                  <div className="research-item-card" key={research.id || idx}>
                    <div className="research-icon">📄</div>
                    <div className="research-details">
                      <h4>{itemTitle}</h4>
                      <p className="truncate-2-lines">{itemAbstract}</p>
                      {pubDate && <span className="research-date">📅 {pubDate}</span>}
                    </div>
                    <button className="view-research-btn" onClick={() => setSelectedResearch(research)}>
                      {lang === 'ar' ? 'عرض البحث ↗' : 'View Research ↗'}
                    </button>
                  </div>
                );
              })
            ) : (
              <p className="no-research-msg">
                {lang === 'ar' ? 'لا توجد أبحاث منشورة حالياً لهذا الأستاذ.' : 'No research published for this staff member.'}
              </p>
            )}
          </div>
        </>
      ) : (
        <div className="research-detail-view animate-fade-in">
          <div className="research-detail-header">
            <span className="research-detail-badge">📄 {lang === 'ar' ? 'بحث علمي منشور' : 'Published Research'}</span>
            <span className="research-detail-date">📅 {selectedResearch.published_date}</span>
          </div>
          
          <h1 className="research-detail-title">{researchTitle}</h1>
          
          <div className="research-detail-abstract-box">
            <h3>{lang === 'ar' ? 'ملخص البحث (Abstract)' : 'Abstract'}</h3>
            <p>{researchAbstract}</p>
          </div>

          {selectedResearch.link && (
            <div className="research-url-display-box">
              <h3>{lang === 'ar' ? 'رابط البحث:' : 'Research URL:'}</h3>
              <a 
                href={selectedResearch.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="research-direct-link"
              >
                {selectedResearch.link}
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ResearchStaff;