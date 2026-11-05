import SearchBox from "../../components/SearchBox/SearchBox"
import Slider from "../../components/Slider/Slider"
import Category from "../../components/Category/Category"
import AboutUs from "../../components/AboutUs/AboutUs"
import Faclities from "../../components/Faclities/Faclities"
import LatestNews from "../../components/LatestNews/LatestNews"
import UniversityStats from "../../components/UniversityStats/UniversityStats"
import CommenQuestions from "../../components/CommenQuetions/CommenQuetions"
import LatestArticles from "../../components/LatestArticles/LatestArticles"
import ComplaintsSuggestions from "../../components/ComplaintsSuggestions/ComplaintsSuggestions"
import { useActions } from "../../store/useActions"
import { Helmet } from "react-helmet-async"
import { useTranslation } from 'react-i18next';
import { useIsFetching } from "@tanstack/react-query" 
import Loading from "../../components/Loading/Loading"
const Home=()=>{
    const {menu}=useActions();
    const fetchData=useIsFetching()
      const { i18n } = useTranslation();  
    const lang = i18n.language === 'ar' ? 'ar' : 'en';
const pageTitle=lang === 'ar' ? 'جامعة المستقبل الخاصة' : 'Future Private University';
if (fetchData > 0) {
        return <Loading />;
    }
return (
  <>
  <Helmet>
        <title>
          {pageTitle}
        </title>
        <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'} />
        <meta property="og:title" content={pageTitle} />
    <meta property="og:type" content="website" />


      </Helmet>


<div className="home">
<Slider/>
<Category/>
<AboutUs/>
<LatestArticles/>
<Faclities/>
<LatestNews/>
<UniversityStats/>
<CommenQuestions/>
<ComplaintsSuggestions/>

{menu && <SearchBox/>}
</div>

  </>
)
}
export default Home