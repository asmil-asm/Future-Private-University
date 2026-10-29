import { useMutation } from '@tanstack/react-query'; 
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useActions } from '../store/useActions';
export const useApply=(onSuccessCallback)=>{
     const baseUrl="https://university-management-system-607v.onrender.com/api/v1/admissions/applications/"
         const {t}=useTranslation()
     const { setApply, selectedProgram} = useActions();
    const mutations = useMutation({
        mutationFn: async (formData) => {
    
            if (!formData.full_name || !formData.email || !formData.national_id) {
                toast.error(t("fill_all_fields_error") || "الرجاء ملء جميع الحقول ورفع السيرة الذاتية");
                throw new Error("Missing fields");
            }
            
            const applicationData = new FormData();

      applicationData.append("full_name",formData.full_name);
      applicationData.append("email",formData.email);
      applicationData.append("national_id",formData.national_id);
if (formData.form_file instanceof File || formData.form_file instanceof Blob) {
    applicationData.append("form_file", formData.form_file);
}

if (selectedProgram !== null && selectedProgram !== undefined) {
    applicationData.append("program", selectedProgram);
}           
           

            const res = await axios.post(baseUrl,applicationData,{headers: {
          'Content-Type': 'multipart/form-data', 
     }   });
            return res.data;
        },
        onSuccess: () => {
      toast.success(t("Application submitted successfully"));
            if (onSuccessCallback) onSuccessCallback();
      setApply();
        },
        onError: (error) => {
      console.error(error.response?.data || error.message);
            const apiErrors = error.response?.data;

            if (apiErrors?.email) {
        toast.error(apiErrors.email[0]);
      } else if (apiErrors?.national_id) {
        toast.error(apiErrors.national_id[0]);
      } else if (apiErrors?.detail) {
        toast.error(apiErrors.detail);
      } else {
        toast.error(t("Failed to submit application"));
      }
        }
    });
     return {
        apply: mutations.mutate,
        isLoading: mutations.isPending,
        isError: mutations.isError
    };
}