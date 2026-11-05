import './AboutUs.css';
import image from '../../assets/about/about3.jpg';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGetData } from '../../hooks/useGetData';
import { apiEndpoint } from '../../services/apiEndpoint';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const AboutUs = () => {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const { data, isLoading, error } = useGetData({
        key: 'pages',
        endpoint: apiEndpoint.pages
    });

    if (error) return <div>Error loading data</div>;

    const pages = Array.isArray(data) ? data : [];
    const page = pages?.find((item) => item.slug?.includes('about-us'));
    
    if (!isLoading && !page) {
        return <div>About page is empty</div>;
    }

    const lang = i18n.language === 'ar' ? 'ar' : 'en';
    const pageDesc = lang === 'ar' ? page?.content_ar : page?.content_en;

    return (
        <div className='about-us'>
            <h1>{t('about_us')}</h1>

            <div className='about-container'>
                {isLoading ? (
                    <>
                        <div className='section-left'>
                            <Skeleton height={28} width="60%" className="mb-4" />
                            
                            <Skeleton height={16} count={5} className="mb-2" />
                            <Skeleton height={16} width="40%" className="mb-6" />

                            <Skeleton height={42} width={130} borderRadius={8} />
                        </div>

                        <div className='section-right'>
                            <Skeleton height={320} className="w-full rounded-xl" />
                        </div>
                    </>
                ) : (
                    <>
                        <div className='section-left'>
                            <h3>{t('university_name')}</h3>
                            <p className='aboutUs-text'>
                                {pageDesc}
                            </p>
                            <button className='aboutUs-btn' onClick={() => navigate('university/about')}>
                                {t('read_more')}
                            </button>
                        </div>
                        <div className='section-right'>
                            <img src={image} alt={t('university_name') || "About Us"} className='aboutUs-img'/>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default AboutUs;