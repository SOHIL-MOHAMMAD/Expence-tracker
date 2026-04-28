'use client'
import React, { useEffect, useState } from 'react'

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState<boolean>(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    setMatches(media.matches)

    const listener = (e: MediaQueryListEvent) => {
      setMatches(e.matches)
    }

    media.addEventListener('change', listener)

    return () => {
      media.removeEventListener('change', listener)
    }
  }, [query])

  return matches
}

export default useMediaQuery