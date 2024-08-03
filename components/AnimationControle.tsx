import { MotionConfig,motion, useAnimationControls } from 'framer-motion'
import React from 'react'

const AnimationControle = () => {
    const controls = useAnimationControls()
    const handleclick=()=>{
        controls.start('flip')
    }
    return (
        <MotionConfig transition={{
            duration:1,
            ease:'easeInOut'
        }}>
    
        <motion.div
        initial={{opacity:0,y:20}}
        animate={{opacity:1,y:0}}
        className='flex justify-center flex-col gap-4 items-center  w-80 h-80 '>
    <motion.button 
    whileHover={{
        scale:1.20,
        scaleX:2,
        scaleY:2
    }}
    animate={controls}
    whileTap={{scale:0.80,rotate:'1.5deg'}}
    className="px-4 py-2 bg-blue-500 text-white">ClickMe</motion.button>
    <motion.button onClick={handleclick}
    whileHover={{
        scale:1.20,
        scaleX:2
    }}
    whileTap={{scale:0.80,rotate:'-1.5deg'}}
    className="px-4 py-2 bg-pink-500 text-white">ClickMe</motion.button>
    
    <motion.div 
    variants={{
        initial:{
            rotate:'180deg'
        },
        flip:{
            rotate:'360deg'
        }
    }}
    animate={controls}
    whileHover='flip'
    initial='initial'
    className='w-40 h-40 bg-green-400 text-white'>

    </motion.div>

        </motion.div>
    </MotionConfig>
      )
}

export default AnimationControle