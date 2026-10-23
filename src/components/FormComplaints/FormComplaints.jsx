import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './FormComplaints.css'; 
import { useMessage } from '../../hooks/useMessage';
const FormComplaints = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        sender_name: "",
        sender_email: "",
        subject: "",
        message: ""
    });
    const resetForm = () => {
        setFormData({
            sender_name: "",
            sender_email: "",
            subject: "",
            message: ""
        });
    };
    const {send,isLoading}=useMessage(resetForm)

    const handelChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handelSubmit = async (e) => {
        e.preventDefault();
        send(formData)
       
    };

    return (
        <div id="complaints-form" className="formComplaints">
            <form className="form-suggestions" onSubmit={handelSubmit}>
                <div className='flex flex-col md:flex-row gap-4'>
                    <div className="form-group flex-1">
                        <label className="form-label">{t('form_sender_name')}: </label>
                        <input 
                            type="text"
                            name="sender_name"
                            value={formData.sender_name}
                            onChange={handelChange}
                            placeholder={t('form_name_placeholder')} 
                            className='form-input'
                            required
                        />
                    </div>
                    <div className="form-group flex-1">
                        <label className="form-label">{t('form_email')}: </label>
                        <input 
                            type="email"
                            name="sender_email"
                            value={formData.sender_email}
                            onChange={handelChange}
                            placeholder={t('form_email_placeholder')} 
                            className='form-input'
                            required
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label className="form-label">{t('form_subject')}: </label>
                    <input 
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handelChange}
                        placeholder={t('form_subject_placeholder')} 
                        className='form-input'
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">{t('form_message')}: </label>
                    <textarea 
                        rows={5}
                        name="message"
                        value={formData.message}
                        onChange={handelChange}
                        placeholder={t('form_message_placeholder')} 
                        className="form-textarea"
                        required
                    />
                </div>
                <button className="send-btn" type='submit' disabled={isLoading}>
                    {isLoading ? t('form_sending') : t('form_send')}
                </button>
            </form>
        </div>
    );
}

export default FormComplaints;