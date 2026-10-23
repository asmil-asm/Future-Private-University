import image from '../../assets/banner1.jpg';
import { FaPlay } from "react-icons/fa";
import { useState } from 'react';
import TransitionWhileInterview from '../Transition/TransitionWhileInterview';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGetData } from '../../hooks/useGetData';
import { apiEndpoint } from '../../services/apiEndpoint';
import { FaGraduationCap } from "react-icons/fa";
import './Faclities.css'

const Faclities = () => {
    const [showVideo, setShowVideo] = useState(false);
    const { t, i18n } = useTranslation();
    const isRtl = i18n.dir() === 'rtl';
        const {data=[]}=useGetData({
            key:'collages',
            endpoint:apiEndpoint.colleges
    
        })
        


    

    return (
        <TransitionWhileInterview dir='x' num={isRtl ? 100 : -100}>
            <section 
                className="fac-fixed-section relative bg-cover bg-center" 
                style={{ backgroundImage: `url(${image})` }} 
                dir={isRtl ? 'rtl' : 'ltr'}
            >
                <div className="absolute inset-0 bg-slate-950/20 z-0"></div>

                <div className="w-full h-full flex flex-col lg:flex-row items-center min-h-[550px] relative z-10">
                    
                    <div className="w-full lg:w-1/2 flex justify-center items-center p-8 min-h-[300px] lg:min-h-full">
                        <button
                            className="fac-video-popup-trigger focus:outline-none"
                            onClick={() => setShowVideo(true)}
                            aria-label={t('play_video') || "Play Video"}
                        >
                            <span className="fac-circle-pulse">
                                <FaPlay className="fac-play-icon-svg" />
                            </span>
                        </button>

                        {showVideo && (
                            <div className="fac-pure-modal fixed inset-0 z-50 flex items-center justify-center p-4">
                                <div className="fac-modal-overlay absolute inset-0 bg-black/50" onClick={() => setShowVideo(false)}></div>
                                <div className="fac-modal-body relative bg-black rounded-2xl overflow-hidden w-full max-w-3xl z-10 shadow-2xl">
                                    <button 
                                        className="fac-modal-close absolute top-4 right-4 text-white text-xl z-20 bg-black/40 hover:bg-black/80 w-8 h-8 rounded-full flex items-center justify-center transition-colors" 
                                        onClick={() => setShowVideo(false)}
                                    >
                                        ✕
                                    </button>
                                    <div className="aspect-video w-full">
                                        <iframe
                                            className="w-full h-full"
                                            src="https://www.youtube.com/embed/oKu4GAeGjp8"
                                            title="YouTube video player"
                                            allow="autoplay; encrypted-media"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="w-full lg:w-1/2 fac-colleges-dark-column flex items-center bg-slate-900/90 lg:bg-slate-900/80 backdrop-blur-sm h-full min-h-[550px]">
                        <div className="fac-inner-content-wrapper w-full p-8 md:p-12">
                            <div className="fac-title-header mb-6">
                                <h3 className="text-2xl md:text-3xl font-bold text-white border-b-2 border-amber-500 pb-2 inline-block">
                                    {t('our_colleges_heading', { defaultValue: 'Our Colleges' })}
                                </h3>
                            </div>
                            
                            <ul className="fac-clean-ul-list flex flex-col gap-y-3">
                                {data.map((item) => (
                                    <li key={item.id}>
                                        <Link 
                                            className="fac-link-item-card block no-underline group" 
                                            to={typeof item.id === 'number' ? `/academics/colleges/${item.id}` : item.path}
                                        >
                                            <div className="fac-li-row flex items-center gap-x-4 p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-200">
                                                <div className="fac-icon-box-frame text-2xl text-amber-500 bg-white/5 p-2 rounded-md transition-transform duration-200 group-hover:scale-110">
                                                    {<FaGraduationCap/>}
                                                </div>
                                                <div className="fac-text-box-frame">
                                                    <h4 className="text-white font-medium text-lg group-hover:text-amber-400 transition-colors">
                                                        {i18n.language === 'ar'? item.name_ar:item.name_en}
                                                    </h4>
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                </div>
            </section>
        </TransitionWhileInterview>
    );
};

export default Faclities;
