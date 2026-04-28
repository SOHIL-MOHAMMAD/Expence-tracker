'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation' // Imported useRouter

interface DATA {
  id: number
  name: string
  amount: number
  category: number 
  category_name?: string
  date: string
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
  hover: { scale: 1.02, transition: { duration: 0.2 } }, 
};

const detailsVariants = {
  hidden: { height: 0, opacity: 0, overflow: 'hidden' },
  visible: { height: 'auto', opacity: 1, overflow: 'visible', transition: { duration: 0.3 } },
  exit: { height: 0, opacity: 0, overflow: 'hidden', transition: { duration: 0.2 } },
};

const Table = () => {
  const [data, setData] = useState<DATA[]>([])
  const [expandedItems, setExpandedItems] = useState<{ [id: number]: boolean }>({}) 
  const router = useRouter() // Initialize router

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://expence-tracker-9rco.onrender.com/expenses/')
        setData(res.data.results ? res.data.results : res.data)
      } catch (err) {
        console.log("Error fetching data:", err)
      }
    }

    fetchData()
  }, [])

  const handleDelete = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation(); 
    
    const isConfirmed = window.confirm("Are you sure you want to delete this expense?");
    if (!isConfirmed) return;

    try {
      console.log(`Attempting to delete ID: ${id}`); 
      const response = await axios.delete(`https://expence-tracker-9rco.onrender.com/expenses/${id}/`);
      console.log("Delete Success! Status:", response.status); 

      setData((prevData) => prevData.filter((item) => item.id !== id));
      
    } catch (err: any) {
      console.error("Backend Error Response:", err.response?.data);
      console.error("Full Error:", err.message);
      alert("Delete fail ho gaya bhai! Console check karo.");
    }
  }

  const toggleExpand = (id: number) => {
    setExpandedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full mt-8"
    >
      {/* --- DESKTOP VIEW --- */}
      <div className="md:block hidden w-full overflow-x-visible">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#3c3d37] text-[#ECDFCC]">
              <th className="p-3 border-b border-[#1e101e]">Name</th>
              <th className="p-3 border-b border-[#1e101e]">Amount</th>
              <th className="p-3 border-b border-[#1e101e]">Category</th>
              <th className="p-3 border-b border-[#1e101e]">Date</th>
              <th className="p-3 border-b border-[#1e101e]">Action</th>
            </tr>
          </thead>
         
          <motion.tbody 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {data.map((item) => (
              <motion.tr 
                key={item.id} 
                variants={itemVariants} 
                whileHover="hover"
                onClick={() => router.push(`/expense/${item.id}`)}
                className="text-[#1e101e] border-b border-[#3c3d37] hover:bg-[#2a2b27] hover:text-[#ECDFCC] transition-colors hover:border-[#697565] cursor-pointer"
              >
                <td className="p-3">{item.name}</td>
                <td className="p-3 font-bold text-[#697565]">₹{item.amount}</td>
                <td className="p-3">{item.category_name || item.category}</td>
                <td className="p-3 text-sm text-gray-400">
                  {new Date(item.date).toLocaleDateString('en-GB')} 
                </td>
                <td className="p-3">
                  <button 
                    onClick={(e) => handleDelete(e, item.id)} // Pass event to stop propagation
                    className="bg-red-900/50 hover:bg-red-800 text-red-200 px-3 py-1 rounded text-sm transition-colors border border-red-800"
                  >
                    Delete
                  </button>
                </td>
              </motion.tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  No expenses found. Add some!
                </td>
            </tr>
          )}
          </motion.tbody>
        </table>      
      </div>

      {/* --- MOBILE VIEW --- */}
      <div className="block md:hidden w-full overflow-x-hidden space-y-4">
        <AnimatePresence> 
          {data.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30, transition: { duration: 0.2 } }} 
              transition={{ delay: index * 0.05 }} 
              className="bg-[#3c3d37] p-4 rounded-lg border border-[#697565] shadow-lg overflow-hidden"
            >
              <div 
                onClick={() => toggleExpand(item.id)}
                className="flex justify-between items-center cursor-pointer border-b border-[#697565]/20 pb-2 mb-2"
              >
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-200 text-lg">{item.name}</span>
                  <span className="text-sm text-gray-400">
                    {new Date(item.date).toLocaleDateString('en-GB')}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="font-bold text-xl text-[#ECDFCC]">₹{item.amount}</span>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      strokeWidth={2} 
                      stroke="currentColor" 
                      className={`w-5 h-5 text-gray-300 transition-transform ${expandedItems[item.id] ? 'rotate-180' : ''}`}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                </div>
              </div>

              <AnimatePresence initial={false}> 
                {expandedItems[item.id] && (
                  <motion.div
                    key="details"
                    variants={detailsVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <div className="space-y-2 text-[#ECDFCC] mt-2">
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-300">Category:</span>
                        <span>{item.category_name || item.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-300">Amount:</span>
                        <span className="font-bold">₹{item.amount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-300">Date:</span>
                        <span>{new Date(item.date).toLocaleDateString('en-GB')}</span>
                      </div>
                      
                      <div className="flex gap-2 mt-3">
                        <button 
                          onClick={() => router.push(`/expense/${item.id}`)}
                          className="bg-[#697565] hover:bg-[#566052] w-full text-[#ECDFCC] px-4 py-2 rounded text-sm transition-colors font-semibold"
                        >
                          Details
                        </button>
                        <button 
                          onClick={(e) => handleDelete(e, item.id)}
                          className="bg-red-900/50 hover:bg-red-800 w-full text-red-200 px-4 py-2 rounded text-sm transition-colors border border-red-800 font-semibold"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {data.length === 0 && (
          <div className="p-4 text-center text-gray-500">
            No expenses found. Add some!
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default Table; 