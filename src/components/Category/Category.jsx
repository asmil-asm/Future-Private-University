import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { apiEndpoint } from '../../services/apiEndpoint';
import { useTranslation } from 'react-i18next';
import { useGetData } from '../../hooks/useGetData';
import { FaGraduationCap } from "react-icons/fa";
import './Category.css'; 
import 'swiper/css/navigation';
import 'swiper/css';
const Category = () => {
    const {data}=useGetData({
        key:'collages',
        endpoint:apiEndpoint.colleges

    })
      const colleges = Array.isArray(data) ? data : [];

    const { t, i18n } = useTranslation();
    const isRtl = i18n.dir() === 'rtl';
    return (
        <motion.section 
            initial={{ opacity: 0, x: isRtl ? 100 : -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }} 
            viewport={{ once: true, margin: "-100px" }}
            className="py-12 section-category-wrapper"
        >
            <div className="container mx-auto px-4">
                <div className="category-bg category-margin">
                    <div className="flex flex-col lg:flex-row items-center gap-y-8">
                        
                        <div className="w-full lg:w-1/3 px-4">
                            <div className="category-text text-center lg:text-start">
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight">
                                    {t("best_platform_title")}
                                </h2>
                            </div>
                        </div>

                        <div className="w-full lg:w-2/3 px-4">
                            <div className="category-slider slider-active">
                                <Swiper
                                    key={i18n.language}
                                    dir={isRtl ? 'rtl' : 'ltr'}
                                    modules={[Navigation, Autoplay]}
                                    spaceBetween={20}
                                    navigation
                                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                  loop={colleges.length >= 8}
                                    breakpoints={{
                                        400: {
                                            slidesPerView: 1,
                                            spaceBetween: 15
                                        },
                                        480: {
                                            slidesPerView: 2,
                                            spaceBetween: 15
                                        },
                                        768: {
                                            slidesPerView: 3,
                                            spaceBetween: 20
                                        },
                                        1024: {
                                            slidesPerView: 4,
                                            spaceBetween: 25
                                        }
                                    }}
                                    className="mySwiper py-4"
                                >
                                    {colleges.map((item) => (
                                        <SwiperSlide key={item.id} className='text-center'>
                                            <Link 
                                                to={item.id ? `/academics/colleges/${item.id}` : item.path}
                                                className="block no-underline group"
                                            >
                                                <div className={`single-category ${item.color} text-center py-8 px-5 rounded-xl shadow-md transition-all duration-300 transform group-hover:-translate-y-2 group-hover:shadow-lg flex flex-col items-center justify-center min-h-[180px]`}>
                                                    <div className="icon text-5xl text-white flex justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                                                        {<FaGraduationCap/>}
                                                    </div>
                                                    <div className="cont w-full">
                                                        <span className="block text-white text-base md:text-lg font-bold font-montserrat line-clamp-2 px-1">
                                                        {i18n.language === 'ar'? item.name_ar:item.name_en}
                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default Category;