import Banner from '../../components/Banner/Banner'
import { FaRegHeart, FaHeart } from "react-icons/fa6"; 
import image from '../../assets/imageLibrary.jpg'
import "./LibraryWebsite.css"
import { FaDownload } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useState} from 'react';
import { motion } from 'framer-motion';
import TransitionPage from '../../components/Transition/TransitionPage';
import toast from 'react-hot-toast';
import { useTranslation } from "react-i18next";
import { Helmet } from 'react-helmet-async';
import {useGetData} from '../../hooks/useGetData'
import {apiEndpoint }from '../../services/apiEndpoint'
import Loading from '../../components/Loading/Loading'
const LibraryWebsite = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
const {data=[],isLoading}=useGetData({
  key:'libraries',
endpoint:apiEndpoint.libraries
})
  

  const [expanded, setExpanded] = useState(false);
  const [favorite, setFavorite] = useState([]);
  const [showFavorite, setShowFavorite] = useState(false);
  const [search, setsearch] = useState("");

  const addToFavorite = (bookItem) => {
    const exists = favorite.find(item => item.id === bookItem.id);
    if (exists) {
      removeFavorite(bookItem.id);
      return;
    }
    setFavorite(prev => [...prev, bookItem]);
    toast.success(t("toast_added_favorite") || "Added to favorites");
  };

  const removeFavorite = (bookId) => {
    setFavorite(prev => prev.filter(item => item.id !== bookId));
    toast.success(t("toast_removed_favorite") || "Removed from favorites");
  };

  const handleDownload = (bookUrl) => {
    if (!bookUrl) {
      toast.error(t("download_unavailable") || "Download file not available");
      return;
    }
    window.open(bookUrl, '_blank', 'noopener,noreferrer');
  };

const filteredBooks = (data || []).filter((item) => {
  const q = search.trim().toLowerCase();
  if (!q) return true; 

  const fields = [item.name_en, item.name_ar];

  return fields.some(
    (field) => (field || '').toLowerCase().includes(q)
  );
});

  const toggleBooks = () => {
    setExpanded(prev => !prev);
  };

  const lang = i18n.language === 'ar' ? 'ar' : 'en';
  const siteName = t("site_name");
  const pageTitle = `${t("banner_library") || "Digital Library"} | ${siteName}`;
  const pageDesc = t("library_subtitle") || "Browse and download academic textbooks, research publications, and college references.";

if(isLoading) return <Loading/>
  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'} />
        
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:type" content="website" />
      </Helmet>

      <Banner title={t("banner_library")} />
      
      <div className='libraryWebsite'>
        <motion.div 
          initial={{ x: isRtl ? 100 : -100, opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className='library-info'>
            <h2>{t("library_title")}</h2>
            <p>{t("library_subtitle")}</p>
          </div>

          <div className='library-input'>
            <input 
              type='search' 
              placeholder={t("search_keyword")} 
              value={search} 
              onChange={(e) => setsearch(e.target.value)} 
            />
    

            <div className='best-icon' onClick={() => setShowFavorite(!showFavorite)}>
              <span>{favorite.length}</span>
              <FaRegHeart className='library-icon' />

              {showFavorite && (
                <div 
                  className={`favorite-pops ${isRtl ? 'pop-rtl' : 'pop-ltr'}`} 
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className='favorite-header'>
                    <h3>{t("favorite_books")}</h3>
                    <IoClose className='close-favorite' onClick={() => setShowFavorite(false)} />
                  </div>
                  {favorite.length === 0 ? (
                    <p className="p-4 text-center text-gray-500">{t("no_books")}</p>
                  ) : (
                    favorite.map((item, index) => (
                      <div key={item.id || index} className='favorite-book'>
                        <img src={image} alt='Book Thumbnail' />
                        <div className='favorite-info'>
                          <h4>{item.title || t("university_name")}</h4>
                          <p>{lang === 'ar'? item.name_ar:item.name_en}</p>
                        </div>
                        <FaTrash className='delete-icon' onClick={() => removeFavorite(item.id)} />
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>

        <TransitionPage>
          <div className='library-book'>
            <h2>{t('books')}</h2>
            <div className="library-grid">
              {filteredBooks
                .slice(0, expanded ? filteredBooks.length : 4)
                .map((book, index) => {
                  const isBookFavorite = favorite.some(fav => fav.id === book.id);
                  
                  return (
                    <div className="library-card" key={book.id || index}>
                      <div className="card-image">
                        <img src={image} alt={'Library reference book'} />
                      </div>
                      <div className="card-body">
                        <h3 className="card-title">{t("university_name")}</h3>
                        
                        <div className="card-actions flex items-center justify-between gap-2 mt-3">
                          <button 
                            className="card-btn flex items-center justify-center gap-2 flex-1"
onClick={() => handleDownload(
  book.access_url || book.file_url || book.link
)}                          >
                            <span className="truncate">{lang === 'ar'? book.name_ar:book.name_en}</span>
                            <FaDownload className="icon-btn flex-shrink-0" />
                          </button>
                          
                          <button 
                            className={`fav-toggle-btn p-2 rounded-md transition-colors ${isBookFavorite ? 'text-red-500' : 'text-gray-400'}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              addToFavorite(book);
                            }}
                            aria-label="Toggle Favorite"
                          >
                            {isBookFavorite ? <FaHeart size={18} /> : <FaRegHeart size={18} />}
                          </button>
                        </div>

                      </div>
                    </div>
                  );
                })}
            </div>

            {filteredBooks.length > 4 && (
              <div className='show-more'>
                <button onClick={toggleBooks}>
                  {expanded ? t("show_less") : t("show_more")}
                </button>
              </div>
            )}
          </div>
        </TransitionPage>
      </div>
    </>
  );
}

export default LibraryWebsite;