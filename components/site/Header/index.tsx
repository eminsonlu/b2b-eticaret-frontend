"use client";
import React, { useEffect, useState } from "react";
import ICategory from "@/types/ICategory";
import MobileHeader from "../MobileHeader";
import DesktopHeader from "../DesktopHeader";
import { useCommonStore } from "@/stores/commonStore";
import { usePathname } from "next/navigation";

interface Props {
  categories: ICategory[];
}

const Header = ({ categories = [] }: Props) => {
  const { isHamburgerMenuOpen, setIsHamburgerMenuOpen } = useCommonStore();
  const pathname = usePathname();

  useEffect(() => {
    setIsHamburgerMenuOpen(false);
  }, [pathname, setIsHamburgerMenuOpen]);

  useEffect(() => {
    if (isHamburgerMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isHamburgerMenuOpen]);

  return (
    <>
      <MobileHeader categories={categories} />
      <DesktopHeader categories={categories} />
    </>
  );
};

export default Header;
