import React from 'react'
import { motion } from 'framer-motion'
import './StylishButton.css'

const StylishButton = ({text}) => {
    return (
        <motion.button
            initial={{ "--x": "100%", scale: 1 }}
            animate={{ "--x": "-100%" }}
            whileTap={{ scale: 0.97 }}
            transition={{
                repeat: Infinity,
                repeatType: "loop",
                repeatDelay: 1,
                type: "spring",
                stiffness: 20,
                damping: 15,
                mass: 2,
                scale: {
                    type: "spring",
                    stiffness: 10,
                    damping: 5,
                    mass: 0.1,
                },
            }}
            className="px-10 py-8 rounded-md relative radial-gradient"
        >
            <span className="text-neutral-100 tracking-wide h-full w-full block relative linear-mask text-7xl font-bold">
                {text}
            </span>
            <span className="block absolute inset-0 rounded-md p-px linear-overlay" />
        </motion.button>
    )
}

export default StylishButton