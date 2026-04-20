'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useAuthStore } from '@/stores/authStore';
import Link from 'next/link';
import { AiOutlineLogin, AiOutlineLogout } from 'react-icons/ai';
import ICategory from '@/types/ICategory';
import {
  RiMenuLine,
  RiCloseLine,
  RiPokerHeartsLine,
  RiSearchLine,
} from 'react-icons/ri';
import { RiFileList3Line } from 'react-icons/ri';
import { BsShieldLock } from 'react-icons/bs';
import { TbShoppingCart } from 'react-icons/tb';
import { useSearchParams, useRouter } from 'next/navigation';
import { useWishListStore } from '@/stores/wishListStore';
import { useCartStore } from '@/stores/cartStore';
import { LuCircleUserRound } from 'react-icons/lu';
import Input from '@/components/shared/Input';
import cn from 'classnames';
import MobileListCategories from '../MobileListCategories';
import { useCommonStore } from '@/stores/commonStore';
interface Props {
  categories: ICategory[];
}

const MobileHeader = ({ categories = [] }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, logout } = useAuthStore();
  const { wishList } = useWishListStore();
  const { cart } = useCartStore();
  const { isHamburgerMenuOpen, setIsHamburgerMenuOpen } = useCommonStore();
  const [search, setSearch] = useState<string>(searchParams.get('s') || '');

  const toggleMobileMenu = () => {
    setIsHamburgerMenuOpen(!isHamburgerMenuOpen);
  };

  const handleSearch = () => {
    if (search) {
      router.push(`/ara?s=${search}`);
    }
  };

  return (
    <>
      <header className="w-full flex flex-col mb-8 lg:hidden">
        {/* Top bar */}
        <div className="w-full border-b border-slate-100  bg-primary">
          <div className="container min-h-[60px] flex items-center">
            {/* Left side - Menu and Logo */}
            <div className="flex items-center gap-3">
              <button onClick={toggleMobileMenu} aria-label="Menu">
                <RiMenuLine size={24} className="text-white" />
              </button>

              <Link href="/" className="mt-1.5">
                <Image
                  src="/logo_beyaz.svg"
                  loader={({ src }) => src}
                  width={0}
                  height={0}
                  alt="Logo"
                  title="Logo"
                  unoptimized
                  className="h-[30px] aspect-[17/3] w-full"
                />
              </Link>
            </div>

            {/* Right side - Favorites, Search & Cart icons */}
            <div className="flex items-center gap-3 ml-auto">
              {user && (
                <Link href="/sepet" className="relative" aria-label="Cart">
                  <TbShoppingCart size={22} className="text-slate-700" />
                  {cart.length > 0 && (
                    <span className="w-[15px] h-[15px] flex items-center justify-center text-[9px] bg-green-400 text-white absolute -top-1 -right-1 rounded-full">
                      {cart.length}
                    </span>
                  )}
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Search bar */}
        <div className="w-full border-b border-slate-100 animate-fadeIn">
          <div className="container py-3">
            <div className="relative">
              <RiSearchLine
                className="absolute top-2.5 left-3 text-slate-400 z-20"
                size={20}
              />
              <Input
                placeholder="Ürün ara..."
                className="w-full pl-10 pr-12"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.code === 'Enter' && handleSearch()}
                autoFocus
              />
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-primary-500 text-white rounded text-xs"
                onClick={handleSearch}
              >
                Ara
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={cn(
            'fixed inset-0 bg-white z-[9999] pb-24 overflow-y-auto transition-all duration-300',
            {
              'translate-x-0 pointer-events-auto': isHamburgerMenuOpen,
              'translate-x-full pointer-events-none': !isHamburgerMenuOpen,
            }
          )}
        >
          <div>
            <div className="container w-full border-b border-slate-100 bg-primary">
              <div className="min-h-[60px] flex items-center">
                <div className="flex items-center gap-3">
                  <button onClick={toggleMobileMenu} aria-label="Menu">
                    <RiCloseLine size={24} className="text-white" />
                  </button>

                  <Link href="/" className="mt-1.5">
                    <Image
                      src="/logo_beyaz.svg"
                      loader={({ src }) => src}
                      width={0}
                      height={0}
                      alt="Logo"
                      title="Logo"
                      unoptimized
                      className="h-[30px] aspect-[17/3] w-full"
                    />
                  </Link>
                </div>

                <div className="flex items-center gap-3 ml-auto">
                  {user && (
                    <Link href="/sepet" className="relative" aria-label="Cart">
                      <TbShoppingCart size={22} className="text-slate-700" />
                      {cart.length > 0 && (
                        <span className="w-[15px] h-[15px] flex items-center justify-center text-[9px] bg-green-400 text-white absolute -top-1 -right-1 rounded-full">
                          {cart.length}
                        </span>
                      )}
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {!user && (
              <div className="flex justify-center gap-4 py-4 border-b border-slate-100 mb-4">
                <Link
                  href="/giris-yap"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary-50/50 text-primary-600 rounded-full"
                  onClick={() => setIsHamburgerMenuOpen(false)}
                >
                  <AiOutlineLogin size={18} />
                  Giriş Yap
                </Link>

                <Link
                  href="/kayit-ol"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary-50/50 text-primary-600 rounded-full"
                  onClick={() => setIsHamburgerMenuOpen(false)}
                >
                  <AiOutlineLogout size={18} />
                  Kayıt Ol
                </Link>
              </div>
            )}

            {user && (
              <div className="flex flex-col gap-2 py-4 border-b border-slate-100 container mb-4">
                <div className="flex items-center gap-2">
                  <LuCircleUserRound size={24} className="text-slate-700" />
                  <span className="font-bold text-lg text-left">
                    Merhaba, {user.firstName}
                  </span>
                </div>
                <Link
                  href="/profil"
                  className="text-sm font-medium text-slate-600 flex items-center gap-2"
                >
                  <LuCircleUserRound size={18} />
                  Profilim
                </Link>
                <Link
                  href="/siparisler"
                  className="text-sm font-medium text-slate-600 flex items-center gap-2"
                >
                  <RiFileList3Line size={18} />
                  Siparişlerim
                </Link>

                <Link
                  href="/favoriler"
                  className="text-sm font-medium text-slate-600 flex items-center gap-2"
                >
                  <RiPokerHeartsLine size={18} />
                  Favorilerim
                  {wishList.length > 0 && (
                    <span className="ml-1 px-1.5 py-0.5 bg-orange-400 text-white text-[10px] rounded-full">
                      {wishList.length}
                    </span>
                  )}
                </Link>

                {user?.role?.isAdmin && (
                  <Link
                    href="/panel"
                    className="text-sm font-medium text-slate-600 flex items-center gap-2"
                  >
                    <BsShieldLock size={18} />
                    Yönetim Paneli
                  </Link>
                )}

                <Link
                  href="#"
                  className="text-sm font-medium text-slate-600 flex items-center gap-2"
                  onClick={() => {
                    logout();
                  }}
                >
                  <AiOutlineLogout size={18} />
                  Çıkış Yap
                </Link>
              </div>
            )}

            <div className="flex flex-col relative container overflow-hidden">
              <h3 className="font-bold text-lg mb-3">Kategoriler</h3>
              <MobileListCategories categories={categories} />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default MobileHeader;
