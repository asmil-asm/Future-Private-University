import './Banner.css'
import image from '../../assets/banner4.jpg'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const Banner = ({ title }) => {
    const { i18n } = useTranslation();
    const isRtl = i18n.language === 'ar';

    return (
        <motion.section 
            initial={{ opacity: 0, x: isRtl ? 1000 : -1000 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            id="page-banner" 
            className="pt-20 pb-20 bg_cover" 
            data-overlay="8" 
            style={{ backgroundImage: `url(${image})` }}
        >
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="page-banner-cont">
                            <h2>{title}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </motion.section>
    )
}

export default Banner;