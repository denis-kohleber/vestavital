import { useEffect, useState } from 'react';

function useWindowWidth() {
    const [windowWidth, setWindowWidth] = useState<number | null>(null);
    
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial Call

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowWidth;
}

export { useWindowWidth }