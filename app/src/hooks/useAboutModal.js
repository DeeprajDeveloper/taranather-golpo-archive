import { useDrawerAnimation } from './useDrawerAnimation';

export function useAboutModal() {
  const drawer = useDrawerAnimation();

  return {
    isOpen: drawer.isVisible,
    isVisible: drawer.isVisible,
    isActive: drawer.isActive,
    open: drawer.open,
    close: drawer.close,
  };
}
