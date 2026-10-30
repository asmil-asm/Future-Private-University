import './AboutUs.css';
import image from '../../assets/about/about3.jpg';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGetData } from '../../hooks/useGetData';
import { apiEndpoint } from '../../services/apiEndpoint';
const AboutUs = () => {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
const {data,isLoading,error}=useGetData({
key:'pages',
endpoint:apiEndpoint.pages
    })
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading data</div>;
    const pages=Array.isArray(data) ? data :[]
    const page=pages?.find((item)=>item.slug?.includes('about-us'))
    if (!page) {
    return <div>About page is empty</div>;
}
    const lang = i18n.language === 'ar' ? 'ar' : 'en';
const pageDesc=lang ==='ar'? page?.content_ar : page?.content_en
    return (
        <>
            

            <div className='about-us'>
                <h1>{t('about_us')}</h1>
                <div className='about-container'>
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
                </div>
            </div>
        </>
    )
}

export default AboutUs;