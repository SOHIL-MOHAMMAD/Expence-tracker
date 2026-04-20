'use client'
import React from 'react'
import AddExpense from './AddExpense'
import AddCategory from './AddCategory'
import { motion } from 'motion/react'
const Buttons = () => {
  return (
     <div className=' flex md:flex-row flex-col justify-end md:items-center items-end-safe py-4 px-2 md:gap-5 gap-2'>
      <AddExpense/>
      <AddCategory/>
      <motion.button
      whileTap={{scale:0.9}}
      transition={{duration:0.5, type:'spring'}}
      className='bg-[#697565] px-4  py-2 md:text-lg text-sm text-[#ECDFCC] md:w-auto w-1/2  font-bold tracking-wider rounded-2xl shadow-2xl shadow-[#3c3d37] border-[#3c3d37] border-2'
      >Filter
      </motion.button>
      <motion.button
      whileTap={{scale:0.9}}
      transition={{duration:0.5, type:'spring'}}
      className='bg-[#697565] px-4 py-2 md:text-lg text-sm text-[#ECDFCC] md:w-auto w-1/2 font-bold tracking-wider] rounded-2xl shadow-2xl shadow-[#3c3d37] border-[#3c3d37] border-2'
      >Sort</motion.button>
    </div>
  )
}

export default Buttons
