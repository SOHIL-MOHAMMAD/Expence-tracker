'use client'

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; 

interface Category {
  id: number;
  name: string;
}

const AddExpense = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [categoryId, setCategoryId] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [description, setDescription] = useState<string>('')


  useEffect(() => {
    axios.get(`https://expence-tracker-9rco.onrender.com/category/`)
      .then(res => setCategories(res.data))
      .catch(err => console.error("Failed to load categories:", err));
  }, []);

  const resetForm = () => {
    setIsOpen(false);
    setName(''); 
    setAmount(''); 
    setDate(new Date().toISOString().split('T')[0]); // Reset to today
    setCategoryId(''); 
    setImage(null);
    setError(null);
    setDescription('')
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setError(null);
    setIsLoading(true);
   
    const formData = new FormData();
    formData.append('name', name);
    formData.append('amount', amount);
    formData.append('date', date); 
    formData.append('category', categoryId); 
    if (image) {
      formData.append('images', image); 
    }
    formData.append('description', description);

    try { 
      const res = await axios.post(`https://expence-tracker-9rco.onrender.com/expenses/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log("Success:", res.data);
      resetForm();
    } catch (err) {
      console.error("Error submitting expense:", err);
      setError("Failed to add expense. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <motion.button
        whileTap={{scale: 0.9}}
        transition={{duration: 0.5, type: 'spring'}}
        onClick={() => setIsOpen(true)}
        className='bg-[#697565] relative px-4 py-2 md:text-lg text-sm text-[#ECDFCC] md:w-auto w-1/2 font-bold tracking-wider rounded-2xl shadow-2xl shadow-[#3c3d37] border-[#3c3d37] border-2'
      >
        Add Expense
      </motion.button>
      
      {isOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4'>
          <div className='bg-[#1e101e] text-[#ECDFCC] shadow-2xl shadow-black h-auto p-8 w-full max-w-lg rounded-xl flex flex-col gap-4'>
            <h2 className="text-2xl font-bold mb-4 border-b border-[#3c3d37] pb-2">New Expense</h2>
            
            {error && <div className="text-red-400 text-sm">{error}</div>}

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
                min="0"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="p-2 bg-transparent border border-[#3c3d37] rounded"
              />

              <input 
                type="date" 
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
                className="p-2 bg-transparent border border-[#3c3d37] rounded file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-[#697565] file:text-[#ECDFCC] cursor-pointer"
              />
              <textarea name="" id="" placeholder='Description'
              required
              value={description}
              onChange={(e)=> setDescription(e.target.value)} 
              className="p-2 bg-transparent border border-[#3c3d37] h-40 rounded"
              ></textarea>
              
              <div className="flex justify-end gap-4 mt-4">
                <button type="button" onClick={resetForm} disabled={isLoading} className="px-4 py-2 text-gray-400 hover:text-white transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={isLoading} className="bg-[#697565] px-6 py-2 rounded font-bold text-[#ECDFCC] disabled:opacity-50 transition-opacity">
                  {isLoading ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default AddExpense;