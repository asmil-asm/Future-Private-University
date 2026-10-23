import Banner from "../../components/Banner/Banner";
import './ServicesWebsite.css'
import TransitionPage from '../../components/Transition/TransitionPage';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { useGetData } from "../../hooks/useGetData";
import { apiEndpoint } from "../../services/apiEndpoint";
const ServicesWebsite = () => {
    const { t, i18n } = useTranslation();
    const {data}=useGetData({
        key:'services',
        endpoint:apiEndpoint.services
    })


    const lang = i18n.language === 'ar' ? 'ar' : 'en';
    const siteName = t("site_name");
    const pageTitle = `${t('services') || "Services"} | ${siteName}`;
    const pageDesc = t("services_description") || "Explore the student facilities, campus services, and academic activities provided at our university.";

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

            <Banner title={t('services')} />
            <TransitionPage>
                <div className="servicewebsite">
                    <h2>{t('university_activities')}</h2>
                    {data?.map((ser, index) => {
                        const serviceName = lang === 'ar' ? (ser?.name_ar || ser?.name_en) : ser?.name_en;
                        const serviceDesc = lang === 'ar' ? (ser?.description_ar  || ser?.description_en) : (ser?.description_en || ser?.description_ar);
                        
                        return (
                            <div key={index} className="service-info">
                                <p>
                                    <span>{serviceName}:</span> {serviceDesc}
                                </p>
                            </div>
                        )
                    })}
                </div>
            </TransitionPage>
        </>
    )
}

export default ServicesWebsite;