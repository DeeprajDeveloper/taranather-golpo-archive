import { useCallback, useState } from 'react';
import {
  getCardLayoutAriaLabel,
  getStoredCardLayout,
  setStoredCardLayout,
  toggleCardLayout,
} from '../handlers/cardLayoutHandler';

export function useCardLayout() {
  const [layout, setLayout] = useState(getStoredCardLayout);

  const onToggle = useCallback(() => {
    setLayout((current) => {
      const next = toggleCardLayout(current);
      setStoredCardLayout(next);
      return next;
    });
  }, []);

  return {
    layout,
    isHorizontal: layout === 'horizontal',
    onToggle,
    ariaLabel: getCardLayoutAriaLabel(layout),
  };
}
