import React from 'react'
import {motion,MotionConfig} from 'framer-motion'

const Button = () => {
  return (
    <MotionConfig transition={{
        duration:1,
        ease:'easeInOut'
    }}>

    <div className='flex justify-center flex-col gap-4 items-center  w-80 h-80 '>
<motion.button 
whileHover={{
    scale:1.20,
    scaleX:2,
    scaleY:2
}}
whileTap={{scale:0.80,rotate:'1.5deg'}}
className="px-4 py-2 bg-blue-500 text-white">ClickMe</motion.button>
<motion.button 
whileHover={{
    scale:1.20,
    scaleX:2
}}
whileTap={{scale:0.80,rotate:'-1.5deg'}}
className="px-4 py-2 bg-pink-500 text-white">ClickMe</motion.button>
    </div>
</MotionConfig>
  )
}

export default Button