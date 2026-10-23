import { useParams, useNavigate } from 'react-router-dom';
import TransitionPage from '../../components/Transition/TransitionPage';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { useGetData } from '../../hooks/useGetData';
import { apiEndpoint } from '../../services/apiEndpoint';
import './EventDetails.css';

const EventDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
  const {data=[]}=useGetData({
        key:['eventsDetails',id],
        endpoint:apiEndpoint.eventData(id)
    })

    const lang = i18n.language === 'ar' ? 'ar' : 'en';
    const siteName = t("site_name") || "University";

  

    const eventTitle = lang === 'ar' ? (data.title_ar || data.title_en) : data.title_en;
    const eventDesc = lang === 'ar' ? (data.description_ar  || data.description_en) : (data.description_en || data.description);
    
    const pageTitle = `${eventTitle || t("event_details")} | ${siteName}`;
    const pageDesc = eventDesc ? `${eventDesc.substring(0, 155)}...` : pageTitle;

    return (
        <>
            <Helmet>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDesc} />
                <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'} />
                
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDesc} />
                {data.image && <meta property="og:image" content={data.image} />}
                <meta property="og:type" content="article" />
            </Helmet>

            <TransitionPage>
                <article className="articles-details container mx-auto px-4 py-8 max-w-4xl">
                    {data.image && (
                        <div className="w-full h-[400px] overflow-hidden rounded-xl mb-6">
                            <img 
                                src={data.image} 
                                alt={eventTitle || 'Event Header Image'} 
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    <div className="articles-body">
                        <h1 className="detail-title text-2xl md:text-4xl font-bold mb-4 text-gray-900">{eventTitle}</h1>

                        {data.event_date && (
                            <p className="details-text text-sm text-gray-500 mb-6 flex items-center gap-x-2">
                                <span dir="ltr">{data.event_date}</span>
                            </p>
                        )}

                        <div className="details-sub text-gray-700 text-lg leading-relaxed whitespace-pre-line mb-8">
                            {eventDesc}
                        </div>
                    </div>

                    <button
                        className="details-btn px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition-colors duration-200"
                        onClick={() => navigate('/news/events')}
                    >
                        {t("back") || "Back"}
                    </button>
                </article>
            </TransitionPage>
        </>
    );
}

export default EventDetails;