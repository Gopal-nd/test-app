'use client'
import { motion, useInView } from 'framer-motion'
import React, { useRef } from 'react'

const WhileInView = () => {
const ref= useRef(null)
const inuse = useInView(ref,{once:true})
    return (
    <div>
    
<div style={{height:"150vh"}}>hello
</div>
<motion.div ref={ref} style={{height:"100vh"}}
className='bg-blue-400' initial={{opacity:0}}
animate={{opacity:1}} transition={{duration:1}}>go
</motion.div>
<motion.div style={{height:"100vh"}}
className={inuse?'bg-red-500  transition duration-100':'bg-green-600 transition duration-100' }>d
</motion.div>
    </div>
)
}

export default WhileInView