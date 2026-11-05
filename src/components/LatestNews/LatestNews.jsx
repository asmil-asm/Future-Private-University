import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import TransitionWhileInterview from '../Transition/TransitionWhileInterview';
import { useTranslation } from 'react-i18next';
import { useGetData } from '../../hooks/useGetData';
import { apiEndpoint } from '../../services/apiEndpoint';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import "swiper/css";
import "swiper/css/navigation";
import './LatestNews.css';


const LatestNews = () => {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    
    const { data, isLoading } = useGetData({
        key: 'events',
        endpoint: apiEndpoint.events
    });
    
    const lang = i18n.language === 'ar' ? 'ar' : 'en';
    const lastsNews = Array.isArray(data) ? data : [];
    const skeletonItems = [1, 2, 3];

    return (
        <section className="slider-active latestnews">
            <TransitionWhileInterview dir={'x'} num={-100}>
                <h1>{t('latest_news')}</h1>
                <p className="latestnews-title">{t('latest_news_desc')}</p>
            </TransitionWhileInterview>

            <Swiper
                key={i18n.language}
                dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
                modules={[Navigation, Autoplay]}
                spaceBetween={30}
                slidesPerView={3}
                centeredSlides={!isLoading && lastsNews.length < 3}
                loop={!isLoading && lastsNews.length >= 8}
                autoplay={!isLoading ? { delay: 5000, disableOnInteraction: false } : false}
                navigation={true} 
                breakpoints={{
                    320: { slidesPerView: 1, spaceBetween: 20 },
                    640: { slidesPerView: 2, spaceBetween: 20 },
                    1024: { slidesPerView: 3, spaceBetween: 30 },
                }}
            >
                {isLoading ? (
                    skeletonItems.map((_, index) => (
                        <SwiperSlide key={`news-skeleton-${index}`}>
                            <div className="news-card bg-white p-4 rounded-xl shadow-sm">
                                <Skeleton height={180} className="w-full rounded-lg mb-3" />
                                <div className="news-info">
                                    <Skeleton width={100} height={14} className="mb-2" />
                                    <Skeleton height={22} count={2} className="mb-2" />
                                    <Skeleton height={14} count={3} />
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                ) : (
                    lastsNews.map((news, index) => (
                        <SwiperSlide key={index}>
                            <div className="news-card" onClick={() => navigate(`/news/events/${news.id}`)}>
                                <img src={news.image} alt={news[`title_${lang}`]} className="news-img" />
                                <div className="news-info">
                                    <p className="news-date">{news.event_date}</p>
                                    <h3 className="news-title">{news[`title_${lang}`]}</h3>
                                    <p className="news-content">{news[`description_${lang}`]}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                )}
            </Swiper>
            
            <TransitionWhileInterview dir='x' num={-100}>
                <button className='latest-btn' onClick={() => navigate('/news/events')}>
                    {t('browse_more')}
                </button>
            </TransitionWhileInterview>
        </section>
    );
}

export default LatestNews;