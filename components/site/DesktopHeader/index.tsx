'use client';
import React from 'react';
import Image from 'next/image';
import { useAuthStore } from '@/stores/authStore';
import Link from 'next/link';
import { AiOutlineLogin, AiOutlineLogout } from 'react-icons/ai';
import ICategory from '@/types/ICategory';
import {
  RiArrowDownSLine,
  RiPokerHeartsLine,
  RiSearchLine,
} from 'react-icons/ri';
import { TbShoppingCart } from 'react-icons/tb';
import { useSearchParams, useRouter } from 'next/navigation';
import { useWishListStore } from '@/stores/wishListStore';
import { useCartStore } from '@/stores/cartStore';
import { LuCircleUserRound } from 'react-icons/lu';
import classNames from 'classnames';
import Input from '@/components/shared/Input';
import ListCategories from '../ListCategories';

interface Props {
  categories: ICategory[];
}

const DesktopHeader = ({ categories = [] }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, logout } = useAuthStore();
  const { wishList } = useWishListStore();
  const { cart } = useCartStore();

  const [search, setSearch] = React.useState<string>(
    searchParams.get('s') || ''
  );

  return (
    <>
      <header className="w-full flex-col mb-8 hidden lg:flex border-t-[5px] border-primary-400">
        <div className="w-full border-b border-slate-100">
          <div className="container min-h-[80px] flex items-center gap-10 ">
            <Link href="/">
              <Image
                src="/logo.svg"
                loader={({ src }) => src}
                width={0}
                height={0}
                title="Logo"
                alt="Logo"
                unoptimized
                className="h-[40px] w-full"
              />
            </Link>

            <div className="flex-1 relative max-w-[450px]">
              <RiSearchLine
                className="absolute top-2.5 left-3 text-slate-400 z-20"
                size={20}
              />
              <Input
                placeholder="Ürün ara..."
                className="w-ful pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) =>
                  e.code === 'Enter' && router.push(`/ara?s=${search}`)
                }
              />
            </div>

            {!user && (
              <>
                <div className="flex ml-auto items-center gap-2">
                  <Link
                    href="/giris-yap"
                    className="flex items-center gap-2 text-slate-600 text-sm hover:text-black"
                  >
                    <AiOutlineLogin size={20} />
                    <span>Giriş Yap</span>
                  </Link>

                  <span className="text-xs text-slate-300">/</span>

                  <Link
                    href="/kayit-ol"
                    className="flex items-center gap-2 text-slate-600 text-sm hover:text-black"
                  >
                    <AiOutlineLogout size={20} />
                    <span>Kayıt Ol</span>
                  </Link>
                </div>
              </>
            )}

            {user && (
              <div className="flex items-center gap-6 ml-auto">
                <Link
                  href="/favoriler"
                  className="flex items-center gap-2 relative"
                >
                  <RiPokerHeartsLine size={20} className="text-slate-600" />
                  <span className="text-sm text-slate-600">Favorilerim</span>
                  {wishList.length > 0 && (
                    <span className="w-[17px] h-[17px] flex items-center justify-center text-[10px] bg-orange-400 text-white absolute -top-1.5 -right-2.5 rounded-full">
                      {wishList.length}
                    </span>
                  )}
                </Link>

                <Link
                  href="/sepet"
                  className="flex items-center gap-2 relative"
                >
                  <TbShoppingCart size={20} className="text-slate-600" />
                  <span className="text-sm text-slate-600">Sepetim</span>
                  {cart.length > 0 && (
                    <span className="w-[17px] h-[17px] flex items-center justify-center text-[10px] bg-green-400 text-white absolute -top-1.5 -right-2.5 rounded-full">
                      {cart.length}
                    </span>
                  )}
                </Link>

                <div className="flex items-center gap-2 relative group">
                  <LuCircleUserRound size={20} className="text-slate-600" />
                  <span className="text-sm font-medium text-slate-600">
                    {user.firstName}
                  </span>
                  <RiArrowDownSLine
                    size={18}
                    className="text-slate-600 -ml-1"
                  />

                  <div
                    className={classNames(
                      'bg-white w-[200px]',
                      'absolute z-20 top-full right-0',
                      'border border-slate-200 rounded-md',
                      'hidden p-2 box-border shadow-sm flex-col group-hover:flex'
                    )}
                  >
                    <Link
                      href={`/profil`}
                      className="w-full min-h-[30px] flex p-1.5 rounded items-center text-sm font-medium text-slate-600 hover:text-black hover:bg-primary-100/30"
                    >
                      Profilim
                    </Link>

                    <Link
                      href={`/siparisler`}
                      className="w-full min-h-[30px] flex p-1.5 rounded items-center text-sm font-medium text-slate-600 hover:text-black hover:bg-primary-100/30"
                    >
                      Siparişlerim
                    </Link>

                    {user?.role?.isAdmin && (
                      <Link
                        href={`/panel`}
                        className="w-full min-h-[30px] flex p-1.5 rounded items-center text-sm font-medium text-slate-600 hover:text-black hover:bg-primary-100/30"
                      >
                        Yönetim Paneli
                      </Link>
                    )}

                    <Link
                      href="#"
                      className="w-full min-h-[30px] flex p-1.5 rounded items-center text-sm font-medium text-slate-600 hover:text-black hover:bg-primary-100/30"
                      onClick={logout}
                    >
                      Çıkış Yap
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="w-full border-b border-slate-100">
          <div className="container flex items-center justify-center gap-8 h-[50px]">
            <ListCategories categories={categories} />
          </div>
        </div>
      </header>
    </>
  );
};

export default DesktopHeader;
