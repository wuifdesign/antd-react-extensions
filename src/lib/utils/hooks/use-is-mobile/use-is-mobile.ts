import { useEffect, useState } from 'react'

export const useIsMobile = (maxWidth: number = 850) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= maxWidth)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= maxWidth)
    }
    window.addEventListener('resize', checkMobile)
    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [maxWidth])

  return isMobile
}
