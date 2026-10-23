import locationIcon from '../../assets/map.png'
import emailIcon from '../../assets/email.png'
import { useTranslation } from 'react-i18next'

const Topheader = () => {
    const { t } = useTranslation();

    return (
        <div className="header-top">
            <div className="Topcontainer mx-auto px-4">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="header-contactTop">
                            <ul>
                                

                                    <li >
                                    <img src={locationIcon} alt="icon" className='w-4 h-4 object-contain'/>
                                    <span>{t('location')}</span>
                                </li>
                              
                                <a href="mailto:info@.com">
                                     <li>
                                    <img src={emailIcon} alt="icon" className='w-4 h-4 object-contain'/>
                                    <span>{t('footer_contact_us')}</span>
                                </li>
                                </a>
                               
                            </ul>
                        </div>
                    </div>
                    <div>
                        <div className="header-opening-time">
                            <p>{t('opening_hours')}</p>
                        </div>
                    </div>
                </div> 
            </div> 
        </div> 
    )
}

export default Topheader;