import slider1 from '../../assets/banner1.jpg';
import slider2 from '../../assets/banner2.jpg';
import slider3 from '../../assets/banner3.jpg';
import './Slider.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import 'swiper/css';
import { motion, AnimatePresence } from "framer-motion";
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
const Slider = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const { t, i18n } = useTranslation();
    const navigate=useNavigate()
    const currentLang = i18n.language;
    const isRtl = currentLang === 'ar';

    const slidesData = [
        {
            id: 1,
            backgroundImage: slider1,
            title: t('slider_title_1'),
            description: t('slider_desc_1'),
        },
        {
            id: 2,
            backgroundImage: slider2,
            title: t('slider_title_2'),
            description: t('slider_desc_2'),
        },
        {
            id: 3,
            backgroundImage: slider3,
            title: t('slider_title_3'),
            description: t('slider_desc_3'),
        }
    ];

    const contentVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.2, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
    };

    return (
        <section className="slider-active w-full overflow-hidden block relative">
            <Swiper  
                key={currentLang}
                dir={isRtl ? 'rtl' : 'ltr'}
                modules={[Navigation, Autoplay, EffectFade]}
                navigation
                slidesPerView={1}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop
                effect="fade"
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                className="w-full h-full m-0 p-0"
            >
                {slidesData.map((slide, index) => (
                    <SwiperSlide key={slide.id} className="w-full overflow-hidden">
                        <div 
                            className='single-slider relative w-full h-[70vh] md:h-screen bg-cover bg-center flex items-center justify-center' 
                            style={{ backgroundImage: `url(${slide.backgroundImage})` }}
                        >
                            <div className="absolute inset-0 bg-black/20 z-1" />

                            <div className="container mx-auto px-4 relative z-10 w-full">
                                <div className="slider-data flex justify-center md:justify-start text-center md:text-start w-full">
                                    <div className='content w-full max-w-[90%] md:max-w-[70%] lg:max-w-[58%]'>
                                        
                                        <AnimatePresence mode="wait">
                                            {activeIndex === index && (
                                                <motion.div 
                                                    variants={contentVariants}
                                                    initial="hidden"
                                                    animate="visible"
                                                    className='slider-cont w-full'
                                                >
                                                    <motion.h1 variants={itemVariants}>
                                                        {slide.title}
                                                    </motion.h1>
                                                    <motion.p variants={itemVariants}>
                                                        {slide.description}
                                                    </motion.p>
                                                    <motion.ul variants={itemVariants} className="flex justify-center md:justify-start">
                                                        <li>
                                                            <button className="main-btn inline-block" onClick={()=>navigate('university/about')}>
                                                                {t('read_more')}
                                                            </button>
                                                        </li>
                                                    </motion.ul>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default Slider;