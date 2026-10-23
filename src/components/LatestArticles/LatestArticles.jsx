import TransitionWhileInterview from '../Transition/TransitionWhileInterview';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useGetData } from '../../hooks/useGetData';
import { apiEndpoint } from '../../services/apiEndpoint';
import "swiper/css";
import "swiper/css/navigation";
import './LatestArticles.css';


const LatestArticles = () => {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
  const {data=[]}=useGetData({
        key:'articles',
        endpoint:apiEndpoint.articles
    })
  
    return (
        <section className="latestarticles slider-active">
            <TransitionWhileInterview dir={'x'} num={-100}>
                <h1>{t('latest_articles')}</h1>
                <p className="latestArticles-title">{t('latest_advertisements_desc')}</p>
            </TransitionWhileInterview>

            <Swiper
                key={i18n.language}
                dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
                modules={[Navigation, Autoplay]}
                spaceBetween={30}
                slidesPerView={3}
                centeredSlides={data.length < 3}
                loop={data.length > 3}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                navigation={true}
                breakpoints={{
                    320: { slidesPerView: 1, spaceBetween: 20 },
                    640: { slidesPerView: 2, spaceBetween: 20 },
                    1024: { slidesPerView: 3, spaceBetween: 30 },
                }}
                className="mySwiper"
            >
                {data.map((article) => (
                    <SwiperSlide key={article.id} style={{ height: 'auto', display: 'flex', justifyContent: 'center' }}>
                        <div 
                            className="lastesArticles-card" 
                            style={{ height: '100%', display: 'flex', flexDirection: 'column', width: '100%' }} 
                            onClick={() => navigate(`/news/articles/${article.id}`)}
                        >
                            <img src={article.image} alt={article.title_en} className="latestarestarticle-card-img" />
                            <div style={{ padding: '15px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                <h2 className="latestarticle-title">{i18n.language === 'ar'?article.title_ar:article.title_en}</h2>
                                <p className="latestarticle-content" style={{ flexGrow: 1 }}>{i18n.language === 'ar'?article.content_ar:article.content_en}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <TransitionWhileInterview dir='x' num={-100}>
                <button className='latest-btn' onClick={() => navigate('/news/articles')}>
                    {t('browse_more')}
                </button>
            </TransitionWhileInterview>
        </section>
    );
}

export default LatestArticles;