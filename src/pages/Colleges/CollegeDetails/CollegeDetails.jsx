import Banner from '../../../components/Banner/Banner';
import { useNavigate, useParams } from 'react-router-dom';
import DoctorsMembers from '../DoctorsMembers/DoctorsMembers';
import TransitionWhileInterview from '../../../components/Transition/TransitionWhileInterview';
import { useTranslation } from "react-i18next";
import { Helmet } from 'react-helmet-async';
import { useGetData } from '../../../hooks/useGetData';
import { apiEndpoint } from '../../../services/apiEndpoint';
import Loading from '../../../components/Loading/Loading';
import './CollegeDetails.css';

const CollegePharmacy = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { t, i18n } = useTranslation();

    const { data: college, isLoading } = useGetData({
        key: ['collegeDetails', id],
        endpoint: apiEndpoint.collegeData(id)
    });

    const { data: department = [] } = useGetData({
        key: 'departments',
        endpoint: apiEndpoint.departments
    });

    const { data: staffs = [] } = useGetData({
        key: 'staff',
        endpoint: apiEndpoint.staff
    });

    if (isLoading) return <Loading />;

    if (!college) {
        return (
            <div style={{ padding: "100px 20px", textAlign: "center", fontSize: "18px" }}>
                {t("loading_college_data")}
            </div>
        );
    }

    const lang = i18n.language === 'ar' ? 'ar' : 'en';
    const collegeName = lang === "ar" ? (college.name_ar || college.name) : (college.name_en || college.name);
    
    const collegeDesc = lang === "ar" 
        ? (college.description_ar || college.description || t("college_description"))
        : (college.description_en || college.description || t("college_description"));

    const siteName = t("site_name");
    const pageTitle = `${collegeName} | ${siteName}`;

    const imagesList = Array.isArray(college?.images) 
        ? college.images 
        : (college?.images ? [college.images] : []);

    const ogImage = imagesList.length > 0 ? imagesList[0] : '';

    const collegeDepartments = department.filter(
        (dep) => String(dep.college) === String(college?.id)
    ) || [];

    const staff = staffs.filter((st) =>
        collegeDepartments.some((dep) => String(st.department) === String(dep.id))
    ) || [];

    return (
        <>
            <Helmet>
                <title>{pageTitle}</title>
                <meta name="description" content={collegeDesc} />
                <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'} />
                
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={collegeDesc} />
                <meta property="og:image" content={ogImage} />
                <meta property="og:type" content="website" />
            </Helmet>

            <Banner title={collegeName} />
            <section className='collegePharmacy-page'>
                <TransitionWhileInterview dir='x' num={-100}>
                    <h1>
                        {t("department_of")}{" "}{collegeName}{" "}{t("at_university")}
                    </h1>
                    <div className='college-descrition'>
                        <h2>{t("college_description")}</h2>
                        <p className='collegePharmacy-title'>{collegeDesc}</p>
                    </div>
                </TransitionWhileInterview>

                {imagesList.length > 0 && (
                    <div className='pharmacy-girde'>
                        {imagesList.map((item, index) => (
                            <img 
                                key={index} 
                                src={typeof item === 'string' ? item : item?.url || item?.image} 
                                alt={`${collegeName} ${index + 1}`} 
                            />
                        ))}
                    </div>
                )}

                <DoctorsMembers staff={staff} />
                <div className='view-all-staff-container' style={{ textAlign: 'center', margin: '20px 0' }}>
                    <button 
                        className='dean-btnArch' 
                        onClick={() => navigate('/academics/staff', { state: { departmentIds: collegeDepartments.map(dep => String(dep.id)) } })}
                    >
                        {t("view_all")}
                    </button>
                </div>

                <div className='pharmacy-btn'>
                    <button onClick={() => navigate('/academics/colleges')} className='return'>{t("back")}</button>
                </div>
            </section>
        </>
    );
}

export default CollegePharmacy;