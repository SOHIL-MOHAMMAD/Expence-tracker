'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import useMediaQuery from './useMediaQuery' 
import { SlMenu } from "react-icons/sl";
import { RxCross2 } from "react-icons/rx";

const NavItems = [
  { name: 'Wallet', path: '/' },
  { name: 'Expense', path: '/expense' },
  { name: 'Task', path: '/task' },
]

const Navbar = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState<boolean>(false) 
  const isMobile = useMediaQuery('(max-width : 768px)') 

 
  const listVariants = {
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1 
      }
    },
    hidden: { opacity: 0 },
  }

  
  const itemVariants = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: 100 },
  }

  return (
    <nav className='flex items-center gap-10 justify-between bg-[#3C3D37] text-[#ECDFCC] py-4 px-7 font-semibold tracking-wider relative z-50'>
      <h1 className='md:text-xl text-lg'>TrAcker</h1>
      
      {isMobile ? (
        <div>
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open Menu"
            className='bg-[#ECDFCC] cursor-pointer flex items-center justify-center rounded-full h-9 w-9 text-lg'
          >
            <SlMenu className='text-[#3C3D37]' />
          </button>

          <AnimatePresence>
            {isOpen && (
              <>
              
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsOpen(false)}
                  className="fixed inset-0 bg-black z-40"
                />
                
               
                <motion.div 
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'tween', duration: 0.3 }}
                  className='fixed top-0 right-0 min-h-screen w-64 bg-[#3C3D37] flex flex-col p-7 z-50 shadow-2xl'
                >
                  <div className='flex justify-end mb-8'>
                    <motion.button
                      whileHover={{rotate: 180}}
                      transition={{duration: 0.3}}
                      className='text-2xl font-bold cursor-pointer text-[#ECDFCC] hover:text-white transition-colors' 
                      onClick={() => setIsOpen(false)}
                      aria-label="Close Menu"
                    >
                      <RxCross2 />
                    </motion.button> 
                  </div>
                  
                 
                  <motion.ul
                    initial="hidden"
                    animate="visible"
                    variants={listVariants} 
                    className='flex flex-col gap-6'
                  >
                    {NavItems.map((navItem) => {
                      const isActive = pathname === navItem.path;
                      return (
                        <motion.li 
                          key={navItem.path} 
                          variants={itemVariants} // Applied corrected child variants
                          className='cursor-pointer'
                          onClick={() => setIsOpen(false)} 
                        > 
                          <Link href={navItem.path} className={`block text-lg transition-colors ${isActive ? 'text-white' : 'text-[#ECDFCC] hover:text-white'}`}> 
                            {navItem.name}
                          </Link> 
                        </motion.li>
                      )
                    })}
                  </motion.ul>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <ul className='flex gap-6 text-lg items-center'>
          {NavItems.map((navItem) => {
            const isActive = pathname === navItem.path
            return (
              <li key={navItem.path} className='relative cursor-pointer'> 
                <Link href={navItem.path}> 
                  <span className="relative pb-1">
                    {navItem.name}
                    {isActive && (
                      <motion.div
                        layoutId='underline' 
                        className='absolute left-0 bottom-0 h-0.5 w-full bg-[#ECDFCC]'
                      />
                    )} 
                  </span> 
                </Link> 
              </li>
            )
          })}
        </ul>
      )}
    </nav>    
  )
}

export default Navbar