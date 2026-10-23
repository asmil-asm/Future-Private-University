import supportIcon from '../../assets/support.png'
import logo from "../../assets/logo.jpg"
import { Link, useNavigate} from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Bottomheader = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleScrollToForm = () => {
        const element = document.getElementById('complaints-form');
        
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          
            navigate('/#complaints-form');
            
            setTimeout(() => {
                const targetElement = document.getElementById('complaints-form');
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 300);
        }
    };

    return (
        <div className="header-logo-support px-10">
            <div className="flex flex-row items-center justify-between gap-x-4 max-md:justify-between">
                
                <div className="logo">
                    <Link to='/'>
                        <img src={logo} alt="Logo" />
                    </Link>
                </div>

                <div className="support-button">
                    <div className="support">
                        <div className="icon">
                            <img src={supportIcon} alt="icon" />
                        </div>
                        <div className="cont">
                            <p>{t("need_help")}</p>
                            <span dir="ltr">+963 389 332 422</span>
                        </div>
                    </div>
                    
                    <div className="button">
                        <button onClick={handleScrollToForm} className="main-btn">
                            {t("contact_us")}
                        </button>              
                    </div>
                </div>

            </div> 
        </div> 
    );
};

export default Bottomheader;