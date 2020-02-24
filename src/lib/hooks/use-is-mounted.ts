import React, { useEffect } from 'react';

const useIsMounted = () => {
  const ref = React.useRef(false);

  useEffect(() => {
    ref.current = true;
    return () => {
      ref.current = false;
    };
  }, []);

  return () => ref.current;
};

export default useIsMounted;
