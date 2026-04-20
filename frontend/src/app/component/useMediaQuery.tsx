'use client'
import React, { useEffect, useState } from 'react'

const useMediaQuery = (query : string) => {
  const [matches , setMatches] = useState<boolean>(false)
  
  useEffect(()=>{
    const media = window.matchMedia(query);
    setMatches(media.matches)

    const listner = (e) => setMatches(e.matches)

    media.addEventListener('change', listner)

    return ()=>{
      media.removeEventListener('change',listner)
    };
  },[query])

  return matches
}

export default useMediaQuery
