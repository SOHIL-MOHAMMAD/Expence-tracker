'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'


interface DATA {
  id: number
  name: string
  amount: number
  category: number 
  category_name?: string
  date: string
}

const Table = () => {
  const [data, setData] = useState<DATA[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:8000/expenses/')
        setData(res.data.results ? res.data.results : res.data)
      } catch (err) {
        console.log("Error fetching data:", err)
      }
    }

    fetchData()
  }, [])

const handleDelete = async (id: number) => {
   
    const isConfirmed = window.confirm("Are you sure you want to delete this expense?");
    if (!isConfirmed) return;

    try {
      console.log(`Attempting to delete ID: ${id}`); 
      
     
      const response = await axios.delete(`http://127.0.0.1:8000/expenses/${id}/`);
      
      console.log("Delete Success! Status:", response.status); 

      
      setData((prevData) => prevData.filter((item) => item.id !== id));
      
    } catch (err: any) {
      
      console.error("Backend Error Response:", err.response?.data);
      console.error("Full Error:", err.message);
      alert("Delete fail ho gaya bhai! Console check karo.");
    }
  }

  return (
    <div className="w-full mt-8 overflow-x-auto">
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
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="text-[#1e101e] border-b border-[#3c3d37] hover:bg-[#2a2b27] hover:text-[#ECDFCC] transition-colors">
              <td className="p-3">{item.name}</td>
              <td className="p-3 font-bold text-[#697565]">₹{item.amount}</td>
              
             
              <td className="p-3">{item.category_name || item.category}</td>
              
             
              <td className="p-3 text-sm text-gray-400">
                {new Date(item.date).toLocaleDateString('en-GB')} 
              </td>
              
              
              <td className="p-3">
                <button 
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-900/50 hover:bg-red-800 text-red-200 px-3 py-1 rounded text-sm transition-colors border border-red-800"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan={5} className="p-4 text-center text-gray-500">
                No expenses found. Add some!
              </td>
            </tr>
          )}
        </tbody>
      </table>      
    </div>
  )
}

export default Table