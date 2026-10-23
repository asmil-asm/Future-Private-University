import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import imagePerson1 from '../../../assets/person1.png'
import "swiper/css";
import "swiper/css/navigation";
import TransitionPage from "../../../components/Transition/TransitionPage";
import './DoctorsMembers.css';
import { useTranslation } from "react-i18next";

const DoctorsMembers = ({ staff }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === 'ar' ? 'ar' : 'en';

  return (
    <TransitionPage>
      <div className='factully'>
        <h2>{t("faculty_members")}</h2>
        <Swiper 
          modules={[Navigation, Autoplay]}
          spaceBetween={10}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          navigation={true}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 10 },
            640: { slidesPerView: 2, spaceBetween: 10 },
            1024: { slidesPerView: 3, spaceBetween: 15 },
          }}
          className="slider-active mySwiper"
        >
          {staff?.map((item, index) => {
            const doctorName = item[`full_name_${lang}`] || item.full_name || item.name;
            const doctorBio = item[`bio_${lang}`] || item.bio;
            const doctorTitle = item[`title_${lang}`] || item.title;

            return (
              <SwiperSlide key={item.id || index} className='factully-swiper'>
                <div className='faculty-card'>
                  <img 
                    className="faculty-photo" 
                    src={item.image || imagePerson1} 
                    alt={doctorName}
                  />
                  <h3>{doctorName}</h3>
                  <h4>{item.email}</h4>
                  {doctorBio && <p className="bio">{doctorBio}</p>}
                  {doctorTitle && <p className="faculty-title">{doctorTitle}</p>}
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </TransitionPage>
  );
}

export default DoctorsMembers;