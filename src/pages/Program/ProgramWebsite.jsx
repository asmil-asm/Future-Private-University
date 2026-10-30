import { useState } from "react";
import Banner from "../../components/Banner/Banner";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineBookOpen, HiOutlineBadgeCheck} from "react-icons/hi";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {useGetData} from '../../hooks/useGetData'
import {apiEndpoint} from '../../services/apiEndpoint'
import Loading from '../../components/Loading/Loading'
import './ProgramWebsite.css';
const ProgramWebsite = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterLevel, setFilterLevel] = useState("all");
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const {data,isLoading}=useGetData({
        key:'programs',
        endpoint:apiEndpoint.programs
    })

   const programs=Array.isArray(data)?data:[]


    const filteredPrograms = programs.filter(p => {
        const matchesLevel = filterLevel === "all" || p?.level === filterLevel;
        const matchesSearch = 
            (p?.name_ar || "").includes(searchTerm) || 
            (p?.name_en || "").toLowerCase().includes(searchTerm.toLowerCase());

        return matchesLevel && matchesSearch;
    });

    const lang = i18n.language === 'ar' ? 'ar' : 'en';
if(isLoading) return <Loading/>
    return (
        <>

            <Helmet>
                <title>{t("title_program")}</title>
             <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'} />
                <meta name="description" content={t("description_program")} />
                <meta name="keywords" content= {t( "keywords")} />
                <link rel="canonical" href={window.location.href} />
            </Helmet>

            <Banner title={t("title")} />
            

            <main className="program-container">
                
                <section className="controls-section" aria-labelledby="search-heading">
                    <h1 id="search-heading" className="sr-only visually-hidden">{t("search_academic_programs")}</h1>
                    
                      <div className='search-wrapper'>
                        <input 
                            type='text'
                            placeholder={t("search_events_placeholder") || "Search events..."}
                            className="search-input"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    
                    <div className="filter-tabs" role="tablist" aria-label="تصفية حسب الدرجة العلمية">
                        <button role="tab" aria-selected={filterLevel === "all"} className={filterLevel === "all" ? "active" : ""} onClick={() => setFilterLevel("all")}>{t("all")}</button>
                        <button role="tab" aria-selected={filterLevel === "bachelor"} className={filterLevel === "bachelor" ? "active" : ""} onClick={() => setFilterLevel("bachelor")}>{t( "bachelor")}</button>
                        <button role="tab" aria-selected={filterLevel === "master"} className={filterLevel === "master" ? "active" : ""} onClick={() => setFilterLevel("master")}>{t("master")}</button>
                    </div>
                </section>

                <motion.div layout className="program-grid">
                    <AnimatePresence mode="popLayout">
                        {filteredPrograms.map((item, index) => (
                            <motion.div 
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                                className={`program-card ${item?.level || ""}`} 
                                key={item?.id || index} 
                                role="article"
                            >
                                <div className="card-top">
                                    <div className="level-badge">
                                        <HiOutlineBadgeCheck />
                                        {item?.level === "bachelor" ? "بكالوريوس" : item?.level === "master" ? "ماجستير" : item?.level}
                                    </div>
                                    <HiOutlineBookOpen className="book-icon" aria-hidden="true" />
                                </div>

                                <div className="card-info">
                                    <div className="program-titles">
                                        <h3 className="en">{item?.name_en}</h3>
                                        <h3 className="ar">{item?.name_ar}</h3>
                                    </div>
                                </div>

                                <div className="card-action">
                                    <button onClick={() => navigate('/application')}>{t("study_plan")}</button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredPrograms.length === 0 && (
                    <p className="no-results text-center text-gray-500 mt-12" role="status">{t("no_results")}</p>
                )}
            </main>
        </>
    );
}

export default ProgramWebsite;