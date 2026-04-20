import { useCommonStore } from "@/stores/commonStore";
import { useEffect, useRef } from "react";

export const useOnHamburgerMenuClose = (callback: () => void) => {
  const { isHamburgerMenuOpen } = useCommonStore();
  const prevIsOpenRef = useRef(isHamburgerMenuOpen);

  useEffect(() => {
    if (prevIsOpenRef.current === true && isHamburgerMenuOpen === false) {
      const timer = setTimeout(() => {
        callback();
      }, 300);
      return () => clearTimeout(timer);
    }

    prevIsOpenRef.current = isHamburgerMenuOpen;
  }, [isHamburgerMenuOpen, callback]);

  return { isHamburgerMenuOpen };
};
