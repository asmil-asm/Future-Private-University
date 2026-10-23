import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetData } from '../../hooks/useGetData';
import { apiEndpoint } from '../../services/apiEndpoint';
import './NewsTricker.css'
const NewsTicker = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language === 'ar' ? 'ar' : 'en';
  const {data=[]}=useGetData({
key:'advertisements',
endpoint:apiEndpoint.advertisements
  })
  

  const [isSticky, setIsSticky] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const timeoutRef = useRef(null);

  const advertisements = useMemo(() => data || [], [data]);

  useEffect(() => {
    const handleScroll = () => {
      const shouldBeSticky = window.scrollY >= 5500;

      if (shouldBeSticky !== isSticky) {
        setIsVisible(false);

        clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
          setIsSticky(shouldBeSticky);
          setIsVisible(true);
        }, 250);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutRef.current);
    };
  }, [isSticky]);

  if (!advertisements.length) return null;

  return (
    <div
      className={`
        w-full bg-[#182F5A] text-white overflow-hidden
        py-3 md:py-4 shadow-xl border-t border-blue-950 z-50
        transition-all duration-150
        ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
        ${isSticky ? 'hidden' : 'fixed bottom-0'}
      `}
dir={lang === 'ar' ? 'rtl' : 'ltr'}    >
      <div className="ticker-wrapper">
        <div className="ticker-track">
          {[...advertisements, ...advertisements, ...advertisements].map((item, index) => (
            <span
              key={index}
              className="ticker-item"
            >
              <span className="dot"></span>
              {lang === 'en' ? item.title_en : item.title_ar}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;