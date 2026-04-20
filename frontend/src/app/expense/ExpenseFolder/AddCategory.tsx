'use client'

import axios from 'axios';
import React, { useState } from 'react'
import { motion } from 'motion/react';
const AddCategory = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [name, setName] = useState<string>('')
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 

    if (!name.trim()) return; 

    try {
     
      const res = await axios.post('http://127.0.0.1:8000/category/', {
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
        className='bg-[#697565] px-4 py-2 md:text-lg text-sm text-[#ECDFCC] md:w-auto w-1/2 font-bold tracking-wider rounded-2xl shadow-2xl shadow-[#3c3d37] border-[#3c3d37] border-2'
      >
        Add Category
      </motion.button>
      
      {isOpen && (
        <div className='bg-[#1e101e] z-50 absolute text-[#ECDFCC] left-[25%] shadow-2xl shadow-[#1e101e] top-10 h-auto p-8 w-1/2 rounded-xl flex flex-col gap-4'>
          <h2 className="text-2xl font-bold mb-4 border-b border-[#3c3d37] pb-2">Add New Category</h2>
          
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <input 
              type="text" 
              placeholder='Enter category name (e.g. Health, Shopping)' 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="p-2 bg-transparent border border-[#3c3d37] rounded focus:outline-none focus:border-[#697565]"
            />
            
            <div className="flex justify-end gap-4 mt-4">
              <button 
                type="button" 
                onClick={() => setIsOpen(false)} 
                className="px-4 py-2 text-gray-400 hover:text-white"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="bg-[#697565] px-6 py-2 rounded font-bold text-[#ECDFCC]"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}

export default AddCategory