import { motion } from "framer-motion"

const AnimatedDiv = ({children}: {children: React.ReactNode})=>{
    return(
        <motion.div
        className="flex flex-col items-center text-center space-y-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {/* <LightbulbIcon className="w-10 h-10 text-gray-500 dark:text-gray-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
          Insightful Analytics
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Discover patterns and trends in your journaling with our powerful
          AI-driven analytics.
        </p> */}
        {children}
      </motion.div>
    )
}


export default AnimatedDiv