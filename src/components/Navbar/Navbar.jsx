import { CiSearch } from "react-icons/ci";
import { MdLanguage, MdClose } from "react-icons/md";
import { HiOutlineViewList } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import TransitionChild from '../Transition/TransitionChild'
import locationIcon from '../../assets/map.png'
import emailIcon from '../../assets/email.png'
import { useActions } from "../../store/useActions";
import { useTranslation } from "react-i18next";
import './Navbar.css'

const Navbar = () => {
    const {  language, setLanguage } = useActions();
    const {setMenu}=useActions()
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [scroll, setScroll] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeMobileSubmenu, setActiveMobileSubmenu] = useState(null);


    const { t, i18n } = useTranslation();
    const currentLang = i18n.language;
    const isRtl = currentLang === 'ar';

    useEffect(() => {
        const handleScroll = () => {
            setScroll(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

  

    const toggleMobileSubmenu = (index) => {
        setActiveMobileSubmenu(activeMobileSubmenu === index ? null : index);
    };

    const handelLanguageChange = () => {
        const newLang = language === "ar" ? "en" : "ar";
        setLanguage(newLang);
        i18n.changeLanguage(newLang);
    };

    const Links = [
        { title: t('nav_home'), path: '/' },
        {
            title: t('nav_university'),
            links: [
                { name: t('nav_about_university'), path: 'university/about' },
                { name: t('nav_vision_mission'), path: 'university/vision' },
            ]
        },
        {
            title: t('nav_academics'),
            links: [
                { name: t('nav_colleges'), path: '/academics/colleges' },
                { name: t('nav_departments'), path: '/academics/departments' },
                { name: t('nav_programs'), path: '/academics/programs' },
                { name: t('nav_staff'), path: '/academics/staff' },
            ]
        },
        {
            title: t('nav_news'),
            links: [
                { name: t('nav_advertisements'), path: '/news/advertisements' },
                { name: t('nav_events'), path: '/news/events' },
                { name: t('nav_articles'), path: '/news/articles' }
            ]
        },
        {
            title: t('nav_careers'),
            links: [
                { name: t('nav_job_posting'), path: '/careers/job-posting' },
            ]
        },
        {
            title: t('nav_admission'),
            links: [
                { name: t('nav_students-services'), path: '/admission/students' },
                {name: t('nav_application_info'),  path: '/application'}
            ]
        },
        {
            title: t('nav_services'),
            links: [
                { name: t('nav_services_list'), path: '/services/services' },
                { name: t('nav_library'), path: '/services/library' }
            ]
        }
    ];

    const navVariants = {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 }
    };

    const sidebarVariants = {
        open: { x: 0, transition: { type: "tween", duration: 0.3 } },
        closed: { x: isRtl ? "100%" : "-100%", transition: { type: "tween", duration: 0.3 } }
    };

    return (
        <>
            <motion.div className={`navbar ${scroll ? 'scrolled' : ''} w-full`}>
                <div className="mx-auto px-4 w-full">
                    <div className="nav-box">
                        <HiOutlineViewList className="menuIcon" onClick={() => setMobileMenuOpen(true)} />

                        <motion.ul 
                            className="nav"  
                            variants={navVariants}
                            initial="initial"
                            animate="animate"
                        >
                            {Links.map((item, index) => (
                                <motion.li 
                                    variants={itemVariants}  
                                    key={index}
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    className="relative"
                                >
                                    <NavLink to={item.path || '#'}><span>{item.title}</span></NavLink>
                                    
                                    {item.links && (
                                        <div className="dropdown-wrapper">
                                            <TransitionChild isVisible={hoveredIndex === index}>
                                                <ul className="list text-start">
                                                    {item.links.map((link, linkIndex) => (
                                                        <NavLink className='link' key={linkIndex} to={link.path}>
                                                            <li>{link.name}</li>
                                                        </NavLink>
                                                    ))}
                                                </ul>
                                            </TransitionChild>
                                        </div>
                                    )}
                                </motion.li>
                            ))}
                        </motion.ul>

                        <div className="info">
                            <CiSearch onClick={setMenu} className="icon" />
                            <div onClick={handelLanguageChange} className="flex items-center gap-[5px] cursor-pointer hover:text-[#ffc600] transition-colors duration-200">
                                <MdLanguage className="icon" />
                                <span className="font-medium select-none">{language === "ar" ? "En" : "Ar"}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        <motion.div 
                            className="mobile-overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileMenuOpen(false)}
                        />
                        <motion.div 
                            className="mobile-sidebar text-start"
                            variants={sidebarVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            style={{ right: isRtl ? 0 : 'auto', left: isRtl ? 'auto' : 0 }}
                        >
                            <div className="sidebar-header flex justify-between items-center p-4">
                                <MdClose className="close-icon cursor-pointer text-2xl" onClick={() => setMobileMenuOpen(false)} />
                            </div>
                            <ul className="mobile-nav-links">
                                {Links.map((item, index) => (
                                    <li key={index} className="mobile-nav-item">
                                        {item.links ? (
                                            <>
                                                <div className="mobile-link-toggle flex justify-between items-center cursor-pointer" onClick={() => toggleMobileSubmenu(index)}>
                                                    <span>{item.title}</span>
                                                    <span className={`arrow transition-transform duration-200 text-xs ${activeMobileSubmenu === index ? 'rotate-180' : ''}`}>▼</span>
                                                </div>
                                                <motion.ul 
                                                    className="mobile-submenu"
                                                    initial={false}
                                                    animate={{ height: activeMobileSubmenu === index ? "auto" : 0, opacity: activeMobileSubmenu === index ? 1 : 0 }}
                                                    style={{ overflow: "hidden" }}
                                                >
                                                    {item.links.map((link, linkIndex) => (
                                                        <li key={linkIndex} className="py-1">
                                                            <NavLink to={link.path} onClick={() => setMobileMenuOpen(false)} className="block py-1 px-4 text-sm">
                                                                {link.name}
                                                            </NavLink>
                                                        </li>
                                                    ))}
                                                </motion.ul>
                                            </>
                                        ) : (
                                            <NavLink to={item.path} onClick={() => setMobileMenuOpen(false)} className="block">
                                                {item.title}
                                            </NavLink>
                                        )}
                                    </li>
                                ))}
                            </ul>
                            
                            <div className="contact p-4 space-y-3">
                                <div className="flex items-center gap-2">
                                    <img src={locationIcon} alt="icon" className='w-4 h-4 object-contain'/>
                                    <span className="text-sm">{t('location')}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <img src={emailIcon} alt="icon" className='w-4 h-4 object-contain'/>
                                    <span className="text-sm">{t('footer_contact_us')}</span>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;