import { useCallback, useEffect, useRef, useState } from 'react';

export const DRAWER_CLOSE_MS = 220;

export function useDrawerAnimation({ onClosed } = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const closeTimerRef = useRef(null);
  const onClosedRef = useRef(onClosed);

  onClosedRef.current = onClosed;

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current !== null) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const open = useCallback(() => {
    clearCloseTimer();
    setIsVisible(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setIsActive(true));
    });
  }, [clearCloseTimer]);

  const close = useCallback(() => {
    if (!isVisible || closeTimerRef.current !== null) return;

    setIsActive(false);
    closeTimerRef.current = window.setTimeout(() => {
      setIsVisible(false);
      closeTimerRef.current = null;
      onClosedRef.current?.();
    }, DRAWER_CLOSE_MS);
  }, [isVisible]);

  useEffect(() => () => clearCloseTimer(), [clearCloseTimer]);

  useEffect(() => {
    if (!isVisible) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') close();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isVisible, close]);

  return { isVisible, isActive, open, close };
}
