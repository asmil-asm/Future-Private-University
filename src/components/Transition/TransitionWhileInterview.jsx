import { motion } from "framer-motion"
const TransitionWhileInterview=({children,dir='y' ,num=0})=>{

return(
<motion.div initial={{ opacity: 0, [dir]: num }} 
      whileInView={{ opacity: 1, [dir]: 0 }} 
     
      transition={{ duration:0.9, ease: "easeOut" }} >
    {children}
</motion.div>
)
}
export default TransitionWhileInterview