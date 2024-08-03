import React from 'react'
import { motion } from "framer-motion"
const Hero = () => {
  return (
   <div className='flex flex-col justify-center mx-3 my-auto items-start gap-2 z-10 text-black '>
    <h1 className=" font-extrabold text-2xl">Hey, I'm Gopal <span className='text-4xl text-green-700 font-extrabold'>.</span></h1>
    <p className='text-xl font-thin'>I'm a <span className='text-green-700 font-bold'> Frontend Developer</span></p>
    <p className='text-sm font-normal'>I've spent the last 5 years building and scaling software for some pretty cool companies. I also teach people to paint online (incase you've got an empty canvas layin' around 🎨). Let's connect!</p>
   
   <button className='text-black bg-green-700 px-4 py-2 '>Contact me</button>

   <MyComponent />
   </div>
  )
}

export default Hero

export const MyComponent = () => (
    <motion.div
      animate={{
        scale: [1, 2, 2, 1, 1],
        rotate: [0, 0, 270, 270, 0],
        borderRadius: ["20%", "20%", "50%", "50%", "20%"],
      }}
    />
  )