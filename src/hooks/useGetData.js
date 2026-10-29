import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const baseUrl=import.meta.env.VITE_API_BASE_URL
const getData=async({url,key})=>{
try {
    const response=await axios.get(`${baseUrl}${url}`)
    return response.data
} catch (error) {
    console.log(error,key)
    throw error
}
}
export const useGetData=({key,endpoint})=>{
    return useQuery({
        queryKey:[key],
        queryFn:()=>getData({url:endpoint,key})
    })

}