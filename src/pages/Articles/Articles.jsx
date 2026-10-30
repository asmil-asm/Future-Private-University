import Banner from '../../components/Banner/Banner'; 
import { useNavigate } from 'react-router-dom';
import {  useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import {useGetData} from '../../hooks/useGetData'
import {apiEndpoint} from '../../services/apiEndpoint'
import Loading from '../../components/Loading/Loading'
import './Articles.css';

const Articles = () => {
  const {data,isLoading}=useGetData({
key:'articles',
endpoint:apiEndpoint.articles
  })
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const articles=Array.isArray(data)? data:[]
  
  const [searchTerm, setSearchTerm] = useState('');


  const lang = i18n.language === 'ar' ? 'ar' : 'en';
  const siteName = t("site_name");
  
  const dynamicTitle = searchTerm 
    ? `${t('search_for')}: ${searchTerm} | ${siteName}`
    : `${t('articles_page_title')} | ${siteName}`;

  const dynamicDescription = searchTerm
    ? `${t('search_results_for')} "${searchTerm}" ${t('in_articles')}`
    : t('articles_page_desc');
  const filtered=searchTerm ?articles?.filter((item)=>{
    const term=searchTerm.toLowerCase()
      const title = item.title_ar || item.title_en;
    return (typeof title === 'string' && title.toLowerCase().includes(term))
  }):data

    if(isLoading)return <Loading/>
  return (
    <>
      <Helmet>
        <title>{dynamicTitle}</title>
        <meta name="description" content={dynamicDescription} />
        <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'} />
        
        <meta property="og:title" content={dynamicTitle} />
        <meta property="og:description" content={dynamicDescription} />
        <meta property="og:type" content="website" />
      </Helmet>

      <Banner title={t("articles_banner_title")} />
      <div className='articles'>
        <div className='search-wrapper'>
          <input 
            type='text'
            placeholder={t("search_articles_placeholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="search-input"
          />
        </div>
        
        <div className="articles-grid">
          {filtered.map((article) => (
            <div 
              key={article.id} 
              className="article-card" 
              onClick={() => navigate(`/news/articles/${article.id}`)}
            >
              <img
                src={article.image}
                alt={article[`title_${lang}`] || article.title_en}
                className="article-card-img"
              />
              <h2 className="article-title">
                {article[`title_${lang}`] || article.title_en}
              </h2>
              <p className="article-content">
                {article[`content_${lang}`] || article.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Articles;