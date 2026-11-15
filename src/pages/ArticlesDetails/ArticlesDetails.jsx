import './ArticlesDetailes.css';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import {useGetData} from '../../hooks/useGetData'
import {apiEndpoint} from '../../services/apiEndpoint'
import Loading from '../../components/Loading/Loading'
const ArticlesDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const {data,isLoading}=useGetData({
        key:['articleDetails',id],
        endpoint:apiEndpoint.articleData(id)
    })

  

    if(isLoading || !data) return <Loading/>

    const lang = i18n.language === 'ar' ? 'ar' : 'en';
    const siteName = t("site_name");
    
    const articleTitle = lang === 'ar' ? data.title_ar : data.title_en;
    const articleContent = lang === 'ar' ? data.content_ar: data.content_en ;
    
    const pageTitle = `${articleTitle} | ${siteName}`;
    const pageDesc = articleContent?.substring(0, 155) + "...";

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

            <div className='articles-details'>
                <img src={data.image} alt={articleTitle || 'Article header decoration'}/>
                <div className='articles-body'>
                    <h1 className='detail-title'>{articleTitle}</h1>
                    <p className='details-sub'>{articleContent}</p>
                </div>
                <button className='details-btn' onClick={() => navigate('/news/articles')}>
                    {t("back") || "Back"}
                </button>
            </div>
        </>
    );
}

export default ArticlesDetails;