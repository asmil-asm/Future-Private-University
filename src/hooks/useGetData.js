import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const baseUrl='http://127.0.0.1:8000/api/v1'
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