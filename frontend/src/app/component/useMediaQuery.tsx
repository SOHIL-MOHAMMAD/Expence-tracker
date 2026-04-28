'use client'
import { useSyncExternalStore } from 'react'

const useMediaQuery = (query: string) => {
  const subscribe = (callback: () => void) => {
    // Prevent SSR errors by checking if window exists
    if (typeof window === 'undefined') return () => {}

    const media = window.matchMedia(query)
    media.addEventListener('change', callback)
    return () => media.removeEventListener('change', callback)
  }

  const getSnapshot = () => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(query).matches
  }

  const getServerSnapshot = () => false // Fallback value during SSR

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

export default useMediaQuery