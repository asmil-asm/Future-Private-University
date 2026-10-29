import { useTranslation } from 'react-i18next'; 
import image from '../../assets/vision/imageVision.jpg';
import Banner from '../../components/Banner/Banner';
import TransitionPage from '../../components/Transition/TransitionPage';
import { Helmet } from 'react-helmet-async';
import { useGetData } from '../../hooks/useGetData';
import { apiEndpoint } from '../../services/apiEndpoint';
import Loading from '../../components/Loading/Loading'
import './Vision.css';


const Vision = () => {
    const { t, i18n } = useTranslation(); 
    const {data=[],isLoading}=useGetData({
        key:"pages",
        endpoint:apiEndpoint.pages
    })


    const lang = i18n.language === 'ar' ? 'ar' : 'en';

    const page = data.find((p) => p.page_type === 'vision') || {};

    const siteName = t("site_name");
    const pageTitle = `${t('vision_mission_title') || "Vision & Mission"} | ${siteName}`;
    const pageDesc = page[`title_${lang}`] || t("vision_description") || "Explore the strategic goals, educational values, and ultimate vision and mission statements of our university.";
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

            <Banner title={t('vision_mission_title')} />
            
            <TransitionPage>
                <div className="vision-container">
                    <div className="vision-content">
                        <div>
                            <h1>{t('vision_mission_title')}</h1>
                            
                            <p>{page[`title_${lang}`]}</p>
                        </div>
                        <div className='img'>
                            <img src={image} alt={t('vision_mission_title') || "Vision"} />
                        </div>
                    </div>

                    <div className='text'>
                        <p>{page[`content_${lang}`]}</p>
                    </div>
                </div>
            </TransitionPage>
        </>
    );
};

export default Vision;