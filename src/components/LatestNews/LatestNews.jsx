import './LatestNews.css';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import TransitionWhileInterview from '../Transition/TransitionWhileInterview';
import { useTranslation } from 'react-i18next';
import { useGetData } from '../../hooks/useGetData';
import { apiEndpoint } from '../../services/apiEndpoint';
import "swiper/css";
import "swiper/css/navigation";

const LatestNews = () => {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const {data}=useGetData({
        key:'events',
        endpoint:apiEndpoint.events
    })
    
    const lang = i18n.language === 'ar' ? 'ar' : 'en';
const lastsNews=Array.isArray(data)?data:[]

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
                centeredSlides={lastsNews.length < 3}
                loop={lastsNews.length >= 8}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                navigation={true} 
                breakpoints={{
                    320: { slidesPerView: 1, spaceBetween: 20 },
                    640: { slidesPerView: 2, spaceBetween: 20 },
                    1024: { slidesPerView: 3, spaceBetween: 30 },
                }}
            >
                {lastsNews.map((news, index) => (
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
                ))}
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