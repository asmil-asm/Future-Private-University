import { useTranslation } from 'react-i18next'; 
import { Helmet } from 'react-helmet-async'; 
import Banner from '../../components/Banner/Banner'; 
import image1 from '../../assets/about/about1.jpg'; 
import image2 from '../../assets/about/about2.jpg'
import image3 from '../../assets/about/about3.jpg'; 
import { apiEndpoint } from '../../services/apiEndpoint';
import { useGetData } from '../../hooks/useGetData';
import TransitionPage from '../../components/Transition/TransitionPage';
import './AboutUniversity.css';


const AboutUniversity = () => { 
    const { t, i18n } = useTranslation();  
    const {data,isLoading,error}=useGetData({
key:'pages',
endpoint:apiEndpoint.pages
    })
    
   

    const lang = i18n.language === 'ar' ? 'ar' : 'en';
if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading data</div>;
const page=data?.find((item)=>item.slug?.includes('about-us'))

    const pageTitle =  lang === 'ar' ? page?.title_ar: page?.title_en

    const pageDescription = lang ==='ar'? page?.content_ar : page?.content_en
    return ( 
        <> 
            <Helmet>
                <title>{`${pageTitle} | ${lang === 'ar' ? 'جامعة المستقبل الخاصة' : 'Future Private University'}`}</title>
                <meta name="description" content={pageDescription} />
                <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'} />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:image" content={image1} /> 
                <meta property="og:type" content="website" />
            </Helmet>

            <Banner title={t('about_university_title')} /> 
            
            <TransitionPage>
                
                <div className='university-about'>
                    <h2>{pageTitle}</h2>
                    
                    <div className='images'> 
                        <img src={image1} alt="About 1" />
                        <img src={image2} alt="About 2" /> 
                        <img src={image3} alt="Vision" /> 
                    </div> 
                    
                    <section className='about-info'> 
                        <p>{pageDescription}</p>
                    </section>
                </div> 
            </TransitionPage>
        </> 
    ); 
};
export default AboutUniversity