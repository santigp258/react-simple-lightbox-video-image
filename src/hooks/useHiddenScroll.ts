import { useEffect } from 'react';

export const useHiddenScroll = (preventHidden = false) => {
  useEffect(() => {
    const body = document.querySelector('body');
    if (body && !preventHidden) {
      body.style.touchAction = 'none';
      body.style.overflow = 'hidden';
    }
    return () => {
      if (body) {
        body.style.touchAction = '';
        body.style.overflow = '';
      }
    };
  }, []);
};
