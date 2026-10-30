import Banner from '../../components/Banner/Banner';
import { Link } from 'react-router-dom';
import TransitionPage from '../../components/Transition/TransitionPage';
import { useTranslation } from "react-i18next";
import { Helmet } from 'react-helmet-async';
import { FaGraduationCap } from "react-icons/fa";
import { useGetData } from '../../hooks/useGetData';
import { apiEndpoint } from '../../services/apiEndpoint';
import Loading from '../../components/Loading/Loading';
import './Colleges.css';
const CollegesWebsite = () => {
    const { t, i18n } = useTranslation();
const {data,isLoading}=useGetData({
    key:"colleges",
    endpoint:apiEndpoint.colleges
})
    const lang = i18n.language === 'ar' ? 'ar' : 'en';
    const siteName = t("site_name");
    const colleges=Array.isArray(data)?data:[]
    const pageTitle = `${t("colleges")} | ${siteName}`;
    const pageDesc = t("colleges_intro");
if(isLoading) return <Loading/>
    return (
        <TransitionPage>
            <Helmet>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDesc} />
                <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'} />
                
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDesc} />
                <meta property="og:type" content="website" />
            </Helmet>

            <Banner title={t("colleges")} />
            <div className='college'>
                <div className='college-header'>
                    <h2>{t("colleges")}</h2>
                    <p className='college-into'>{t("colleges_intro")}</p>
                </div>
                <div className='college-gride'>
  {colleges.map((item) => (
    <Link key={item.id} to={`/academics/colleges/${item.id}`}>
      <div className="college-card">
        <div className="college-icon">
          <FaGraduationCap />
        </div>
        <h3>{lang === 'ar' ? item.name_ar : item.name_en}</h3>
      </div>
    </Link>
  ))}
</div>
            </div>
        </TransitionPage>
    );
}

export default CollegesWebsite;