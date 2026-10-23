import Banner from '../../components/Banner/Banner'; 
import { FaBook, FaUsers, FaClipboardList } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import TransitionPage from '../../components/Transition/TransitionPage';
import './StudentWebsite.css';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

const StudentWebsite = () => {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    const lang = i18n.language === 'ar' ? 'ar' : 'en';
    const siteName = t("site_name");
    const pageTitle = `${t('students_services') || "Student Services"} | ${siteName}`;
    const pageDesc = t("students_services_description") || "Access essential student resources, academic guidelines, structural handbooks, and official exam instructions.";

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

            <Banner title={t('students_services')}/>
            <TransitionPage>
                <div className='student'>
                    <div className='student-gride'>
                        <div className='card-clickable' onClick={() => navigate("/student-guide")}>
                            <FaBook className='icon'/>
                            <p className='card-title'>{t('student_handbook')}</p>
                        </div>

                        <div className='card-clickable' onClick={() => navigate("/student-services")}> 
                            <FaUsers className='icon'/>
                            <p className='card-title'>{t('student_services')}</p>
                        </div>

                        <div className='card-clickable' onClick={() => navigate("/exam-instructions")}>
                            <FaClipboardList className='icon'/>
                            <p className='card-title'>{t('exam_instructions_title')}</p>
                        </div>
                    </div>
                </div>
            </TransitionPage>
        </>
    );
}

export default StudentWebsite;