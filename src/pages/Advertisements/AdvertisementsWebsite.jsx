import Banner from '../../components/Banner/Banner'; 
import './AdvertisementsWebsite.css';
import {  useState } from 'react';
import { Helmet } from 'react-helmet-async'; 
import { useTranslation } from 'react-i18next'; 
import image from '../../assets/Advertisement.jpg'
import {useGetData} from '../../hooks/useGetData'
import {apiEndpoint} from '../../services/apiEndpoint'
import AdvertisementCard from './AdvertisementCard'; 

const AdvertisementsWebsite = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { i18n, t } = useTranslation();

 const {data}=useGetData({
  key:'advertisements',
  endpoint:apiEndpoint.advertisements
 })
 const advertisements=Array.isArray(data)?data:[]

  const lang = i18n.language === 'ar' ? 'ar' : 'en';

  const siteName = t('site_name'); 
  const dynamicTitle = searchTerm 
    ? `${t('search_for')}: ${searchTerm} | ${siteName}`
    : `${t('advertisements_page_title')} | ${siteName}`;

  const dynamicDescription = searchTerm
    ? `${t('search_results_for')} "${searchTerm}" ${t('in_advertisements')}`
    : t('advertisements_page_desc');
 const filtered = searchTerm
  ? advertisements?.filter((item) => {
      const term = searchTerm.toLowerCase();

      const title = item.title_ar || item.title_en;
      const body  = item.body_ar || item.body_en;

      return (
        (typeof title === 'string' && title.toLowerCase().includes(term)) ||
        (typeof body  === 'string' && body.toLowerCase().includes(term))
      );
    })
  : data;

  return (
    <>
      <Helmet>
        <title>{dynamicTitle}</title>
        <meta name="description" content={dynamicDescription} />
        <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'} />
        
        <meta property="og:title" content={dynamicTitle} />
        <meta property="og:description" content={dynamicDescription} />
        <meta property="og:image" content={image} />
        <meta property="og:type" content="website" />
      </Helmet>

      <Banner title={t('advertisements_banner_title')} />
      
      <div className='advertisements-container'>
        <div className="search-wrapper">
          <input 
            type='text'
            placeholder={t('search_placeholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="advertisements-grid">
          { filtered.length > 0 ? (
             filtered.map((adv) => (
              <AdvertisementCard key={adv.id} adv={adv} image={image} />
            ))
          ) : (
            <div className="no-results">
              {t('no_advertisements_found')}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AdvertisementsWebsite;