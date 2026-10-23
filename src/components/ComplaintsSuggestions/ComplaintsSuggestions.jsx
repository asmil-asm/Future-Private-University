import TransitionWhileInterview from '../Transition/TransitionWhileInterview';
import FormComplaints from '../FormComplaints/FormComplaints';
import { useTranslation } from 'react-i18next';
import './ComplaintsSuggestions.css';


const ComplaintsSuggestions = () => {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.dir() === 'rtl';

    return (
        <section 
            className='complaintSuggestions relative py-12' 
            aria-labelledby="complaints-heading"
        >
            <div className="complaint-overlay" aria-hidden="true"></div>
            
            <TransitionWhileInterview dir='x' num={isRtl ? 100 : -100}>
                <div className='complaint-content container mx-auto px-4 max-w-3xl relative z-10'>
                    <h2 id="complaints-heading" className='complaint-title text-2xl md:text-3xl font-bold text-center mb-6 text-gray-800'>
                        {t('complaint_title')}
                    </h2>
                    
                    <FormComplaints/>
                </div>
            </TransitionWhileInterview>
        </section>
    );
}

export default ComplaintsSuggestions;