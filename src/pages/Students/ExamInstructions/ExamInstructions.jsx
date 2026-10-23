import Banner from '../../../components/Banner/Banner';
import { useNavigate } from 'react-router-dom';
import './ExamInstructions.css'
import TransitionPage from '../../../components/Transition/TransitionPage';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

const ExamInstructions = () => {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    const lang = i18n.language === 'ar' ? 'ar' : 'en';
    const siteName = t("site_name");
    const pageTitle = `${t('exam_instructions_title') || "Exam Instructions"} | ${siteName}`;
    const pageDesc = t('exam_instructions_intro') || "Review the official university rules, guidelines, and behavioral requirements for attending examination halls.";

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

            <Banner title={t('exam_instructions_title')}/>
            <TransitionPage>
                <div className='exam'>
                    <h1>{t('exam_instructions_title')}</h1>
                    <p className='exam-title'> {t('exam_instructions_intro')}</p>
                    <ul className='exam-list'>
                        <li>{t('exam_rule_1')}</li>
                        <li>{t('exam_rule_2')}</li>
                        <li>{t('exam_rule_3')}</li>
                        <li>{t('exam_rule_4')}</li>
                        <li>{t('exam_rule_5')}</li>
                        <li>{t('exam_rule_6')}</li>
                        <li>{t('exam_rule_7')}</li>
                        <li>{t('exam_rule_8')}</li>
                        <li>{t('exam_rule_9')}</li>
                    </ul>
                    
                    <button className='exam-button' onClick={() => navigate('/admission/students')}>
                        {t('back_to_students')}
                    </button>
                </div>
            </TransitionPage>
        </>
    );
}

export default ExamInstructions;