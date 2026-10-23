import Banner from '../../components/Banner/Banner'; 
import './JobPostingWebsite.css';
import { useTranslation } from "react-i18next";
import JobApplyModel from '../../components/JobApplyModel/JobApplyModel';
import Loading from '../../components/Loading/Loading'
import {useGetData} from '../../hooks/useGetData'
import {apiEndpoint} from '../../services/apiEndpoint'
import { useActions } from '../../store/useActions';
import { Helmet } from 'react-helmet-async';
const JobPostingWebsite = () => {
    const { selectedJob, setSelectedJob ,show,setShow } = useActions();
    const { t, i18n } = useTranslation();
const {data=[],isLoading}=useGetData({
    key:'jobs',
    endpoint:apiEndpoint.jobs
})

    const lang = i18n.language === 'ar' ? 'ar' : 'en';
    const siteName = t("site_name");
    const pageTitle = `${t("job_posting") || "Job Postings"} | ${siteName}`;
    const pageDesc = t("job_posting_description") || "Explore career opportunities, academic positions, and open job listings at our university.";
if(isLoading) return <Loading/>
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

            <Banner title={t("job_posting")} />
            <div className='jobPosting'>
                <div className='job-gride'>
                    {data?.filter((item) => {
             if (!item.deadline) return true;
              const isOpen =
      item.status === "open" ||
      item.status === "مفتوح";

    if (!isOpen) return false;

const deadline = new Date(item.deadline)
  
       if (isNaN(deadline.getTime())) return true;
      const now = new Date()
      now.setMonth(now.getMonth()-1)


        return deadline >= now;
    }).map((item, index) => {
                        const jobTitle = lang === 'ar' ? item.title_ar  : item.title_en 
                        const jobDesc = lang === 'ar' ? item.description_ar  : item.description_en ;
                        const jobReqs = lang === 'ar' ? item.requirements_ar  : item.requirements_en 
                        const jobType = item.job_type
                        const jobStatus = item.status


                        return (
                            <div className='job-card' key={index}>
                                <h2>{jobTitle}</h2>
                                <p className='job-unversity'>{t("university_name")}</p>
                                <p className='job-type-status'>
                                    {t("type")}: {jobType} | {t("status")}: {jobStatus}
                                </p>
                                <p className='job-deadline'> {t("deadline")}: {item.deadline}</p>
                                
                                <div className="job-section">
                                    <h3>{t("description")}:</h3>
                                    <p className='job-description'>{jobDesc}</p>
                                </div>
                                
                                <div className="job-section">
                                    <h3 className='job-requirements'>{t("requirements")}:</h3>
                                    <p className='job-requirements'>{jobReqs}</p>
                                </div>
                                
                                    <button 
                                        className="apply-btn"  
onClick={() => 
  {
      setSelectedJob({ ...item, title: jobTitle })
    setShow()
  }
}                                    >
                                        {t("apply_now")}
                                    </button>
                            </div>
                        );
                    })}
                </div>
            </div>
            {show && <JobApplyModel job={selectedJob} />} 
        </>
    );
}

export default JobPostingWebsite;