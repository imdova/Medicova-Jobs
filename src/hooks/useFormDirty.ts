import { useAppDispatch } from '@/store/hooks';
import { showModal } from '@/store/slices/modalSlice';
import { useState, useCallback, useEffect } from 'react';

export const useFormDirty = (initialState: boolean = false) => {
  const [isDirty, setIsDirty] = useState(initialState);
  const dispatch = useAppDispatch();

  const markAsDirty = useCallback(() => {
    setIsDirty(true);
  }, []);

  const markAsClean = useCallback(() => {
    setIsDirty(false);
  }, []);

  const handleNavigateAway = useCallback((targetUrl?: string) => {
    if (isDirty) {
      dispatch(showModal({
        message: 'You have unsaved changes. Are you sure you want to leave?',
        buttons: [
          {
            label: 'Stay',
            actionType: 'STAY',
            variant: 'secondary'
          },
          {
            label: 'Leave',
            actionType: 'LEAVE',
            variant: 'primary'
          }
        ],
        navigationUrl: targetUrl
      }));
      return false;
    }
    return true;
  }, [isDirty, dispatch]);

  // Handle clicks on all anchor tags
  useEffect(() => {
    const handleLinkClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor) {
        const href = anchor.getAttribute('href');
        
        if (!href || 
            href.startsWith('#') || 
            href.startsWith('javascript:') ||
            href.startsWith('mailto:') ||
            href.startsWith('tel:') ||
            anchor.getAttribute('target') === '_blank' ||
            anchor.hasAttribute('download')) {
          return;
        }

        if (isDirty) {
          event.preventDefault();
          handleNavigateAway(href);
        }
      }
    };

    document.addEventListener('click', handleLinkClick, true);
    return () => {
      document.removeEventListener('click', handleLinkClick, true);
    };
  }, [isDirty, handleNavigateAway]);

  return {
    isDirty,
    markAsDirty,
    markAsClean,
    handleNavigateAway
  };
};