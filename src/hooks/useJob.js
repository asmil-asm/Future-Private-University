import { useMutation } from '@tanstack/react-query'; 
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useActions } from '../store/useActions';

export const useJob = (onSuccessCallback, job) => {
    const { t } = useTranslation();
    const { setSelectedJob } = useActions();
    
    
    const baseUrl = 'https://university-management-system-607v.onrender.com/api/v1/careers/applications/';
    
    const mutations = useMutation({
        mutationFn: async (formData) => {
            if (!job || job === true || (typeof job === 'object' && !job.id)) {
                toast.error("خطأ: لم يتم تحديد الوظيفة بشكل صحيح من الأب");
                throw new Error("Invalid Job Object");
            }

            if (!formData.applicant_name || !formData.applicant_email || !formData.cv) {
                toast.error(t("fill_all_fields_error") || "الرجاء ملء جميع الحقول ورفع السيرة الذاتية");
                throw new Error("Missing fields");
            }
            
            const dataToSend = new FormData();
            dataToSend.append("applicant_name", formData.applicant_name);  
            dataToSend.append("applicant_email", formData.applicant_email); 
            dataToSend.append("cv", formData.cv);
            
            const jobId = typeof job === 'object' ? job.id : job;
            dataToSend.append("job", Number(jobId));  

            const res = await axios.post(baseUrl, dataToSend, { 
                headers: {
                    'Content-Type': 'multipart/form-data' 
                }
            });
            return res.data;
        },
        onSuccess: () => {
            toast.success(t("submit_success_message") || "تم تقديم طلبك بنجاح!");
            if (onSuccessCallback) onSuccessCallback();
            setSelectedJob(null);
        },
        onError: (error) => {
            console.log("Server Error Data:", error.response?.data);
            const serverMessage = error.response?.data?.job || 
                                  error.response?.data?.message || 
                                  error.response?.data?.error || 
                                  (t("submit_error_message") || "حدث خطأ ما أثناء إرسال البيانات.");
            
            toast.error(`${t("submission_failed") || "فشل التقديم"}: ${Array.isArray(serverMessage) ? serverMessage[0] : JSON.stringify(serverMessage)}`);
        }
    });

    return {
        providing: mutations.mutate,
        isLoading: mutations.isPending,
        isError: mutations.isError
    };
};