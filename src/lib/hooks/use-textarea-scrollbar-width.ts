import { useEffect, useState } from 'react';

const useTextareaScrollbarWidth = <T extends any>(ref: any | null) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (ref) {
        setWidth(ref.resizableTextArea.textArea.offsetWidth - ref.resizableTextArea.textArea.clientWidth);
      } else {
        setWidth(0);
      }
    };
    if (ref) {
      updateWidth();
      window.addEventListener('resize', updateWidth);
      ref.resizableTextArea.textArea.addEventListener('keyup', updateWidth);
      ref.resizableTextArea.textArea.addEventListener('mouseup', updateWidth);
    }
    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, [ref]);

  return width;
};

export default useTextareaScrollbarWidth;
