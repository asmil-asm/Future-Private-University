import { useMutation } from '@tanstack/react-query'; 
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import axios from 'axios'
export const useMessage=(onSuccessCallback)=>{
    const basUrl='http://127.0.0.1:8000/api/v1/core/contact/'
    const {t}=useTranslation()
const mutations=useMutation({
    mutationFn:async(formData)=>{
        if(!formData.sender_name || !formData.sender_email || !formData.subject || !formData.message)
     throw new Error(t("Please fill in all fields"))
    const res=await axios.post(basUrl,{
        sender_name:formData.sender_name,
        sender_email:formData.sender_email,
        subject:formData.subject,
        message:formData.message

    })
    return res.data


    },
    onSuccess:()=>{
 toast.success(t("submit_success_message") || "تم تقديم طلبك بنجاح!");
if (onSuccessCallback) onSuccessCallback();
    },
     onError:(error)=>{
          console.error(error); 
toast.error(error.message || t("form_failed"));     }
})
 return{
    send:mutations.mutate,
    isLoading:mutations.isPending,
    isError:mutations.isError
 }

}