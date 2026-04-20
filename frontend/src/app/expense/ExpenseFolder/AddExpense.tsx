'use client'

import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { motion } from 'motion/react';

interface Category {
  id: number;
  name: string;
}

const AddExpense = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    
    axios.get('http://127.0.0.1:8000/category/').then(res => setCategories(res.data));
    
  }, []);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
   
    const formData = new FormData();
    formData.append('name', name);
    formData.append('amount', amount);
    formData.append('date', new Date(date).toISOString()); 
    formData.append('category', categoryId); 
    
    if (image) {
      formData.append('receipt_image', image);
    }

    try { 
      const res = await axios.post(`http://127.0.0.1:8000/expenses/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log("Success:", res.data);
      
      
      setIsOpen(false);
      setName(''); setAmount(''); setDate(''); setCategoryId(''); setImage(null);
      
    } catch (err) {
      console.error("Error submitting expense:", err);
    }
  }

  return (
    <>
      <motion.button
        whileTap={{scale:0.9}}
        transition={{duration:0.5, type:'spring'}}
        onClick={() => setIsOpen(true)}
        className='bg-[#697565] relative px-4 py-2 md:text-lg text-sm text-[#ECDFCC] md:w-auto w-1/2 font-bold tracking-wider rounded-2xl shadow-2xl shadow-[#3c3d37] border-[#3c3d37] border-2'
      >
        Add Expense
      </motion.button>
      
      {isOpen && (
        <div className='bg-[#1e101e] z-50 absolute text-[#ECDFCC] left-[25%] shadow-2xl shadow-[#1e101e] top-10 h-auto p-8 w-1/2 rounded-xl flex flex-col gap-4'>
          <h2 className="text-2xl font-bold mb-4 border-b border-[#3c3d37] pb-2">New Expense</h2>
          
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            
            <input 
              type="text" 
              placeholder='Expense Name' 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 bg-transparent border border-[#3c3d37] rounded"
            />
            
            <input 
              type="number" 
              placeholder='Amount' 
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="p-2 bg-transparent border border-[#3c3d37] rounded"
            />

            <input 
              type="datetime-local" 
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="p-2 bg-transparent border border-[#3c3d37] rounded"
            />
            
            <select 
              required
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="p-2 bg-transparent border border-[#3c3d37] rounded"
            >
              <option value="" className='bg-[#1e101e]'>Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id} className='bg-[#1e101e]'>
                  {cat.name}
                </option>
              ))}
            </select>
            
          
            <input 
              type="file" 
              accept="image/*"
              onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
              className="p-2 bg-transparent border border-[#3c3d37] rounded"
            />
            
            <div className="flex justify-end gap-4 mt-4">
              <button type="button" onClick={() => setIsOpen(false)} className="px-4 py-2 text-gray-400 hover:text-white">Cancel</button>
              <button type="submit" className="bg-[#697565] px-6 py-2 rounded font-bold text-[#ECDFCC]">Save</button>
            </div>
            
          </form>
        </div>
      )}
    </>
  )
}

export default AddExpense