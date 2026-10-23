import { RiArrowDropRightLine } from "react-icons/ri";
import { IoCall, IoMail, IoLocation } from "react-icons/io5";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import image from '../../assets/logo-Dark.jpg'
import './Footer.css';

const Footer = () => {
  const { t } = useTranslation();
    const googleMapsUrl = "https://maps.google.com/?q=جامعة+الجزيرة+الخاصة+غباغب+درعا";

  const sitemapLinks = [
    { name: t("footer_home"), path: "/" },
    { name: t("footer_university"), path: "/university/about" },
    { name: t("footer_colleges"), path: "/academics/colleges" },
    { name: t("footer_staff"), path: "/academics/staff" },
    { name: t("footer_events"), path: "/news/events" }
  ];

  const sitemapLinks2 = [
    { name: t("footer_programs"), path: "/academics/programs" },
    { name: t("footer_articles"), path: "/news/articles" },
    { name: t("footer_students_services"), path: "/Admission/students" },
    { name: t("footer_services"), path: "/services/services" },
  ];

  const supportLinks = [
    { name: t("footer_faqs"), path: "/faqs" },
    { name: t("footer_privacy"), path: "/privacy" },
    { name: t("footer_policy"), path: "/policy" },
    { name: t("footer_support"), path: "/support" },
    { name: t("footer_documentation"), path: "/documentation" }
  ];

  return (
    <footer>
      <div className='footer-content'>
        <div className="text">
          <img className="logo" src={image} alt="logo"/>
          <p>{t("footer_description")}</p>
          <div className="social">
            <Link to='https://www.facebook.com/'><FaFacebook className='icon'/></Link>
            <Link to='/'><FaInstagram className='icon'/></Link>
            <Link to='https://www.youtube.com/'><FaYoutube className='icon'/></Link>
            <FaTwitter className='icon'/>
          </div>
        </div>

        <div className="links">
          {sitemapLinks.map((link, index) => (
            <ul className='list' key={index}>
              <Link to={link.path}><li><RiArrowDropRightLine/><span>{link.name}</span></li></Link>
            </ul>
          ))}
        </div>

        <div className="links">
          {supportLinks.map((link, index) => (
            <ul className='list' key={index}>
              <Link to={link.path}><li><RiArrowDropRightLine/><span>{link.name}</span></li></Link>
            </ul>
          ))}
        </div>

        <div className="links">
          {sitemapLinks2.map((link, index) => (
            <ul className='list' key={index}>
              <Link to={link.path}><li><RiArrowDropRightLine/><span>{link.name}</span></li></Link>
            </ul>
          ))}
        </div>

        <div className="info">
          <h3>{t("footer_contact_us")}</h3>

          <ul className='list'>
            <a href={googleMapsUrl} target='blank'
                                 rel="noopener noreferrer">
            <li><IoLocation/> <span>{t("footer_location")}</span></li></a>
            <li><IoCall/> <span>+963 989 662 256</span></li>
            <a href="mailto:info@jude.edu.sy">
            <li><IoMail/> <span>info@jude.edu.com</span></li>
            </a>
            
          </ul>
        </div>
      </div>
      <div className='footer-bottom'>
        <p>{t("footer_copyright")}</p>
      </div>
    </footer>
  );
}

export default Footer;