// import React from 'react'
import { motion } from 'framer-motion'
import './StylishButton.css'
import { useNavigate } from 'react-router-dom'

const StylishButton = ({ text }) => {

    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/register')
    }
    return (
        <motion.button onClick={handleClick}
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
            className="px-6 py-4 rounded-lg relative radial-gradient"
        >
            <span className="text-maingreen tracking-wide h-full w-full block relative linear-mask text-4xl font-bold">
                {text}
            </span>
            <span className="block absolute inset-0 rounded-md p-px linear-overlay" />
        </motion.button>
    )
}

export default StylishButton