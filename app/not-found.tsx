'use client'
import Hero from "@/components/Hero";
// import "./styles.css";
import { easeInOut, motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function App() {
  const [visible, setVisible]=useState(true)
  return (
    <>
    {/* <motion.div
  animate={{
    x: 0,
    backgroundColor: "#000",
    boxShadow: "10px 10px 0 rgba(0, 0, 0, 0.2)",
    position: "fixed",
    transitionEnd: {
      display: "none",
    },
  }}
>
I've spent the last 5 years building and scaling software for some pretty cool companies. I also teach people to paint online (incase you've got an empty canvas layin' around 🎨). Let's connect!

</motion.div> */}

    <motion.div
     variants={{
      hidden:{opacity:0,y:0},
      visible:{opacity:1,y:30}
     }}
     initial="hidden"
     animate="visible"
     transition={{duration:0.75}}
      >
        <Hero />
    </motion.div>
    <motion.button layout onClick={(prev)=>setVisible(!visible)} className="block mb-10 p-2 bg-pink-600 text-white">click Me</motion.button>
      <motion.div animate={{ x: 100 }} />
      <div className="bg-blue-500 w-screen h-screen text-white font-normal rounded-sm p-4 ">
<AnimatePresence mode="popLayout">

{
  visible && 
<motion.div 
className="w-56 h-56 bg-slate-900"
initial={{rotate:'0deg',scale:0,opacity:0,y:0}}
animate={{rotate:'180deg',scale:1,opacity:1,y:[0,100,-200,100,0]}}
exit={{rotate:'0deg',scale:0}}
transition={{duration:2,
  ease:'backInOut',
  times:[0,0.25,0.50,0.67,1]
}}
>

</motion.div>
}
</AnimatePresence>
      </div>
      </>
  );
}