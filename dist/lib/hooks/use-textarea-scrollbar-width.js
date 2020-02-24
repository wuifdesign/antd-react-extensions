import { useEffect, useState } from 'react';

const useTextareaScrollbarWidth = ref => {
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
      var _ref$resizableTextAre;

      window.removeEventListener('resize', updateWidth);

      if (ref && (_ref$resizableTextAre = ref.resizableTextArea) !== null && _ref$resizableTextAre !== void 0 && _ref$resizableTextAre.textArea) {
        ref.resizableTextArea.textArea.removeEventListener('keyup', updateWidth);
        ref.resizableTextArea.textArea.removeEventListener('mouseup', updateWidth);
      }
    };
  }, [ref]);
  return width;
};

export default useTextareaScrollbarWidth;