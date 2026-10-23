import { motion, AnimatePresence } from "framer-motion"

function Transition({ children, isVisible }) 
{
    const childrenMotion = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { y: -20, opacity: 0 }
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    variants={childrenMotion}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.7 }}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default Transition