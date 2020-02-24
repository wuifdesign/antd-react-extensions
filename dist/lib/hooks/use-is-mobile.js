import { useEffect, useState } from 'react';

const useIsMobile = (maxWidth = 850) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= maxWidth);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= maxWidth);
    };

    window.addEventListener('resize', checkMobile);
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, [maxWidth]);
  return isMobile;
};

export default useIsMobile;