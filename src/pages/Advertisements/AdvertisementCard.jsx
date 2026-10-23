import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const AdvertisementCard = ({ adv, image }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t ,i18n} = useTranslation();
  const lang = i18n.language === 'ar' ? 'ar' : 'en';

  return (
    <div className={`article-card ${isExpanded ? 'card-expanded' : ''}`}>
      <div className="card-img-wrapper">
        <img 
          src={image} 
          alt={lang === 'ar'?adv.title_ar:adv.title_en}
          className="article-card-img"
        />
      </div>
      
      <div className="card-content-wrapper">
        <h2 className="article-title">{lang === 'ar'?adv.title_ar:adv.title_en}</h2>
        
        <p className={`article-content ${isExpanded ? 'block line-clamp-none' : 'line-clamp-3'}`}>
       {lang === 'ar'?adv.body_ar:adv.body_en}
        </p>
        
        <button 
          className="read-more-btn"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? t('show_less') : t('read_more')}
        </button>
      </div>
    </div>
  );
};

export default AdvertisementCard;