// import React from 'react';
import { motion } from 'framer-motion';

const SimpleCard = ({ prop }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto bg-darkgrey border border-maingreen rounded-xl shadow-md overflow-hidden md:max-w-2xl"
    >
      <div className="md:flex">
        {/* <div className="md:flex-shrink-0">
          <img className="h-48 w-full object-cover md:w-48" src="https://via.placeholder.com/150" alt="Placeholder" />
        </div> */}
        <div className="p-16">
          <div className="uppercase tracking-wide text-2xl text-maingreen font-semibold">{prop}</div>
          <a href="#" className="block mt-1 text-lg leading-tight font-medium  text-white"></a>
        </div>
      </div>
    </motion.div>
  );
}

export default SimpleCard;