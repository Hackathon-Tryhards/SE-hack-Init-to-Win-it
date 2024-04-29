// import React from 'react'
import { motion } from "framer-motion"
import Tile from "./Tile"
import StylishButton from '../StylishButton/StylishButton'


const Hero = () => {

  return (
    <main className="w-full max-h-full relative">
      {/* Grid background */}
      <section className="w-full grid grid-cols-20 h-screen overflow-y-clip">
        {Array.from(Array(200 * 12), (i) => (
          <Tile key={i} />
        ))}
      </section>
      <div className="pointer-events-none absolute inset-0 flex flex-col gap-5 items-center justify-center z-10 mb-10 font-poppins">
        <motion.h1
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-9xl text-neutral-100 font-black uppercase tracking-tight"
        >
          Study Sync
        </motion.h1>
        {/* */}
        {/* <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="text-neutral-100 rounded-full text-3xl bg-darkgrey px-10 py-3 border border-maingreen pointer-events-auto"

        >
          Get Started
        </motion.button> */}
        <StylishButton text={"Scroll to Explore"} />

      </div>

    </main>
  )
}

export default Hero