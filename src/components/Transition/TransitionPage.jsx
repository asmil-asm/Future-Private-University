
import  {motion}  from "framer-motion"
function TransitionPage({ children }) {
    return (
        <motion.div


            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 1.5 }}>
            {children}
        </motion.div>
    )
}

export default TransitionPage