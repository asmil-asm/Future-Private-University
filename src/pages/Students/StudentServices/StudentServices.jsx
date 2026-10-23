import Banner from '../../../components/Banner/Banner'; 
import { useNavigate } from 'react-router-dom';
import './StudentServices.css';
import TransitionPage from '../../../components/Transition/TransitionPage';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

const StudentServices = () => {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    const lang = i18n.language === 'ar' ? 'ar' : 'en';
    const siteName = t("site_name");
    const pageTitle = `${t('student_services') || "Student Services"} | ${siteName}`;
    const pageDesc = t('student_services_description') || "Explore campus housing, electronic portals, academic advising, and personal support systems tailored for our students.";

    return(
        <>
            <Helmet>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDesc} />
                <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'} />
                
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDesc} />
                <meta property="og:type" content="website" />
            </Helmet>

            <Banner title={t('student_services')} />        
            <TransitionPage>
                <div className='student-service'>
                    <h1>{t('student_services')}</h1>                
                    <p className='service-title'>{t('student_services_description')}</p>
                    
                    <h2 className='availabel-title'>{t('key_services_available')}</h2>
                    <ol className='servise-list'>
                        <li>
                            <span>{t('service_housing_title')}</span>
                            {t('service_housing_desc')}
                        </li>

                        <li>
                            <span>{t('service_electronic_title')}</span>
                            {t('service_electronic_desc')}
                        </li>

                        <li>
                            <span>{t('service_advising_title')}</span>
                            {t('service_advising_desc')}
                        </li>

                        <li>
                            <span>{t('service_support_title')}</span>
                            {t('service_support_desc')}
                        </li>
                    </ol>
                    <button className='service-button' onClick={() => navigate('/admission/students')}>{t('back_to_students')}</button>
                </div>
            </TransitionPage>
        </>
    );
}

export default StudentServices;