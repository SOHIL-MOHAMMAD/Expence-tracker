'use client'

import React, { useEffect, useState } from 'react'

const Home = () => {
  const [msg, setmsg] = useState()
  useEffect(()=>{
    const fetchData = async()=>{
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/`)
        if(!res){
          throw new Error("something went wrong")
        }

        const result = await res.json()
        console.log(result.message)
        setmsg(result.message)
      } catch (err){
        console.error(`got some error ${err}`)
      }
    }
    fetchData()
  }, [])
  return (
    <div>
         {msg}
    </div>
  )
}

export default Home
