'use client'

import axios from 'axios';
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'; // Added AnimatePresence

const AddCategory = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [name, setName] = useState<string>('')
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 

    if (!name.trim()) return; 

    try {
      const res = await axios.post('https://expence-tracker-9rco.onrender.com/category/', {
        name: name 
      });
      
      console.log("Success: Category Added", res.data);
      
      setIsOpen(false);
      setName('');
      
    } catch (err) {
      console.error("Error adding category:", err);
    }
  }

  return (
    <>
      <motion.button
        whileTap={{scale:0.9}}
        transition={{duration:0.5, type:'spring'}}
        onClick={() => setIsOpen(true)} 
        className='bg-[#697565] px-4 py-2 md:text-lg text-sm text-[#ECDFCC] md:w-auto w-1/2 font-bold tracking-wider rounded-2xl shadow-lg shadow-[#3c3d37]/50 border-[#3c3d37] border-2'
      >
        Add Category
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          /* CHANGED: This wrapper creates a dark, semi-transparent background over the whole screen */
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            {/* CHANGED: Removed absolute positioning. Used w-full max-w-md to make it perfectly responsive */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className='bg-[#1e101e] text-[#ECDFCC] shadow-2xl shadow-black/50 w-full max-w-md h-auto p-6 sm:p-8 rounded-xl flex flex-col gap-4'
            >
              <h2 className="text-xl sm:text-2xl font-bold mb-2 border-b border-[#3c3d37] pb-2">
                Add New Category
              </h2>
              
              <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input 
                  type="text" 
                  placeholder='e.g. Health, Shopping' 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="p-3 bg-transparent border border-[#3c3d37] rounded focus:outline-none focus:border-[#697565] w-full"
                />
                
                <div className="flex justify-end gap-3 mt-4">
                  <button 
                    type="button" 
                    onClick={() => setIsOpen(false)} 
                    className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="bg-[#697565] hover:bg-[#566052] transition-colors px-6 py-2 rounded font-bold text-[#ECDFCC]"
                  >
                    Save
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default AddCategory