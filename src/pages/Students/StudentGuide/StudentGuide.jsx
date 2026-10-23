import Banner from '../../../components/Banner/Banner'; 
import { useNavigate } from 'react-router-dom';
import './StudentGuide.css'
import TransitionPage from '../../../components/Transition/TransitionPage';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

const StudentGuide = () => {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    const lang = i18n.language === 'ar' ? 'ar' : 'en';
    const siteName = t("site_name");
    const pageTitle = `${t('student_handbook') || "Student Handbook"} | ${siteName}`;
    const pageDesc = t('student_handbook_description') || "Read the university rules, expectations, guidelines, and rights outlined in the official Student Handbook.";

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

            <Banner title={t('student_handbook')}/>
            <TransitionPage>
                <div className='student-guide'>
                    <h1>{t('student_handbook')}</h1>                
                    <p className='studenguide-title'>{t('student_handbook_description')}</p>
                    <ul className='studentguide-list'>
                        <li>{t('student_guide_rule_1')}</li>
                        <li>{t('student_guide_rule_2')}</li>
                        <li>{t('student_guide_rule_3')}</li>
                        <li>{t('student_guide_rule_4')}</li>
                        <li>{t('student_guide_rule_5')}</li>
                    </ul>
                    <button className='studentguide-button' onClick={() => navigate('/admission/students')}>{t('back_to_students')}</button>
                </div>
            </TransitionPage>
        </>
    );
}

export default StudentGuide;