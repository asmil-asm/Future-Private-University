import Banner from "../../components/Banner/Banner";
import './ServicesWebsite.css';
import TransitionPage from '../../components/Transition/TransitionPage';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { useGetData } from "../../hooks/useGetData";
import { apiEndpoint } from "../../services/apiEndpoint";
 
const ServicesWebsite = () => {
    const { t, i18n } = useTranslation();
    const { data } = useGetData({
        key: 'services',
        endpoint: apiEndpoint.services
    });

    const lang = i18n.language === 'ar' ? 'ar' : 'en';
    const siteName = t("site_name");
    const pageTitle = `${t('services') || "Services"} | ${siteName}`;
    const pageDesc = t("services_description") || "Explore the student facilities, campus services, and academic activities provided at our university.";
const services=Array.isArray(data)?data:[]
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
                <div className="servicewebsite max-w-7xl mx-auto px-4 py-12">
                    
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-extkapital font-bold text-[#182F5A] inline-block relative pb-3">
                            {t('university_activities')}
                            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-[#182F5A] rounded-full"></span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {services?.map((ser, index) => {
                            const serviceName = lang === 'ar' ? (ser?.name_ar || ser?.name_en) : ser?.name_en;
                            const serviceDesc = lang === 'ar' ? (ser?.description_ar || ser?.description_en) : (ser?.description_en || ser?.description_ar);
                            
                            return (
                                <div 
                                    key={index} 
                                    className="service-card group bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col justify-between relative overflow-hidden"
                                >
                                    <div className="absolute top-0 left-0 w-2 h-full bg-[#182F5A] transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>

                                    <div>
                                        <div className="flex justify-center items-center gap-4 mb-4">
                                            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#182F5A] flex items-center justify-center text-xl font-bold group-hover:bg-[#182F5A] group-hover:text-white transition-colors duration-300">
                                                {index + 1}
                                            </div>
                                            <h3 className="text-xl font-bold text-[#182F5A]">
                                                {serviceName}
                                            </h3>
                                        </div>
                                        <p className="text-slate-600 leading-relaxed text-base">
                                            {serviceDesc}
                                        </p>
                                    </div>

                                </div>
                            )
                        })}
                    </div>
                </div>
            </TransitionPage>
        </>
    )
}

export default ServicesWebsite;