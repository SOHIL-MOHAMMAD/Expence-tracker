'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
const Backbutton = () => {
  const router = useRouter()
  return (
    <button type='button' onClick={()=> router.back()}
    className='bg-[#ECDFCC] text-[#3c3d37] rounded-xl px-4 py-2 text-lg font-bold tracking-wide'
    >
      Go Back
    </button>
  )
}

export default Backbutton

