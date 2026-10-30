import Banner from '../../components/Banner/Banner'; 
import './EventsWebsite.css'
import { useNavigate } from 'react-router-dom';
import TransitionPage from '../../components/Transition/TransitionPage'
import {  useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { useGetData } from '../../hooks/useGetData';
import { apiEndpoint } from '../../services/apiEndpoint';
import Loading from '../../components/Loading/Loading';

const EventsWebsite = () => {
    const navigate = useNavigate();
  const {data,isLoading}=useGetData({
key:'events',
endpoint:apiEndpoint.events
  })
      const [searchTrem, setSearchTrem] = useState('');
    const { t, i18n } = useTranslation();
const events=Array.isArray(data)?data:[]
    const filtered=searchTrem ? events?.filter((item)=>{
    const term=searchTrem.toLowerCase()
      const title = item.title_ar || item.title_en;
    return (typeof title === 'string' && title.toLowerCase().includes(term))
  }):events

    const lang = i18n.language === 'ar' ? 'ar' : 'en';
    const siteName = t("site_name");
    const pageTitle = `${t("events") || "Events"} | ${siteName}`;
    const pageDesc = t("events_description") || "Discover up-to-date campus events, news, and academic activities.";
    
    const fallbackImage = events?.events?.[0]?.image || '';
if(isLoading) return <Loading/>
    return (
        <>
            <Helmet>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDesc} />
                <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'} />
                
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDesc} />
                {fallbackImage && <meta property="og:image" content={fallbackImage} />}
                <meta property="og:type" content="website" />
            </Helmet>

            <Banner title={t("events") || "Events"}/>
            <TransitionPage>
                <div className='event-website'>
                    <div className='search-wrapper'>
                        <input 
                            type='text'
                            placeholder={t("search_events_placeholder") || "Search events..."}
                            className="search-input"
                            value={searchTrem}
                            onChange={(e) => setSearchTrem(e.target.value)}
                        />
                    </div>
                    
                    <div className='new-event'>
                        {filtered.map((item) => {
                            const currentTitle = i18n.language === 'ar' ? (item.title_ar || item.title_en) : item.title_en;
                            return (
                                <div className='news-card' key={item.id} onClick={() => navigate(`/news/events/${item.id}`)}>
                                    <div className='news-wepper'>
                                        <span className="news-badge">{t("news") || "News"}</span>
                                        <img src={item.image} alt={currentTitle || 'Event snapshot'}/>
                                    </div>
                                    <div className='news-content'>
                                        <p>{item.event_date}</p>
                                        <h3>{currentTitle}</h3>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </TransitionPage>
        </>
    );
};

export default EventsWebsite;