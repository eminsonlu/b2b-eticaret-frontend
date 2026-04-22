'use client';
import React, { Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AiOutlineHome, AiOutlineTags } from 'react-icons/ai';
import { BiBox, BiCategoryAlt, BiBuilding } from 'react-icons/bi';
import { FiUsers } from 'react-icons/fi';
import { RxValue } from 'react-icons/rx';
import { TbShoppingCart, TbLockOpen } from 'react-icons/tb';
import { TfiLayoutSlider } from 'react-icons/tfi';
import { FaPercentage } from 'react-icons/fa';
import { BsBank } from 'react-icons/bs';
import NavGroup from '../NavGroup';
import NavItem from '../NavItem';
import { useAuthStore } from '@/stores/authStore';

const PanelSidebar = () => {
  const { user } = useAuthStore();

  const PANEL_ROUTES = [
    {
      title: 'Anasayfa',
      icon: <AiOutlineHome size={18} />,
      path: '/panel',
      type: 'link',
    },
    {
      title: 'Ürün Yönetimi',
      icon: <BiBox size={18} />,
      type: 'subMenu',
      path: '/panel/products',
      hidden:
        !user?.role?.product?.includes('READ') &&
        !user?.role?.variant?.includes('READ') &&
        !user?.role?.category?.includes('READ') &&
        !user?.role?.tag?.includes('READ'),
      subMenus: [
        {
          title: 'Ürünler',
          icon: <BiBox size={18} />,
          path: '/panel/products',
          hidden: !user?.role?.product?.includes('READ'),
        },
        {
          title: 'Varyantlar',
          icon: <RxValue size={18} />,
          path: '/panel/products/variants',
          hidden: !user?.role?.variant?.includes('READ'),
        },
        {
          title: 'Kategoriler',
          icon: <BiCategoryAlt size={18} />,
          path: '/panel/products/categories',
          hidden: !user?.role?.category?.includes('READ'),
        },
        {
          title: 'Etiketler',
          icon: <AiOutlineTags size={18} />,
          path: '/panel/products/tags',
          hidden: !user?.role?.tag?.includes('READ'),
        },
      ],
    },
    {
      title: 'Sipariş Yönetimi',
      icon: <TbShoppingCart size={18} />,
      type: 'link',
      path: '/panel/orders',
      hidden: !user?.role?.order?.includes('READ'),
    },
    {
      title: 'Slider Yönetimi',
      icon: <TfiLayoutSlider size={18} />,
      type: 'link',
      path: '/panel/sliders',
      hidden: !user?.role?.slider?.includes('READ'),
    },
    {
      title: 'Kupon Kodu Yönetimi',
      icon: <FaPercentage size={18} />,
      type: 'link',
      path: '/panel/coupons',
      hidden: !user?.role?.coupon?.includes('READ'),
    },
    {
      title: 'Havale/EFT Yönetimi',
      icon: <BsBank size={18} />,
      type: 'link',
      path: '/panel/bank-accounts',
      hidden: !user?.role?.bankAccount?.includes('READ'),
    },
    {
      title: 'Kullanıcı Yönetimi',
      icon: <FiUsers size={18} />,
      type: 'subMenu',
      path: '/panel/users',
      hidden:
        !user?.role?.user?.includes('READ') &&
        !user?.role?.userRole?.includes('READ') &&
        !user?.isCompanyAdmin,
      subMenus: [
        {
          title: 'Kullanıcılar',
          icon: <FiUsers size={18} />,
          path: '/panel/users',
          hidden: !user?.role?.user?.includes('READ') && !user?.isCompanyAdmin,
        },
        {
          title: 'Yetkilendirme',
          icon: <TbLockOpen size={18} />,
          path: '/panel/users/roles',
          hidden: !user?.role?.userRole?.includes('READ'),
        },
      ],
    },
    {
      title: user?.isCompanyAdmin && !user?.role?.isAdmin ? 'Şirket / Davetler' : 'Şirketler',
      icon: <BiBuilding size={18} />,
      type: 'link',
      path: user?.isCompanyAdmin && !user?.role?.isAdmin ? `/panel/companies/${user.companyId}` : '/panel/companies',
      hidden: !user?.role?.isAdmin && !user?.isCompanyAdmin,
    },
    {
      title: 'Blog Yönetimi',
      icon: <BiCategoryAlt size={18} />,
      type: 'link',
      path: '/panel/blogs',
      hidden: !user?.role?.blog?.includes('READ'),
    },
  ];

  return (
    <div className="min-w-[300px] w-[300px] min-h-full flex flex-col gap-4 bg-black p-4 box-border">
      <Link href="/panel">
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

      <div className="w-full h-[1px] bg-slate-50/20"></div>

      <div className="flex flex-col gap-1">
        {PANEL_ROUTES.filter((i) => i.hidden !== true).map((route, index) => (
          <Fragment key={index}>
            {route.type === 'link' && <NavItem {...route} />}
            {route.type === 'subMenu' && <NavGroup {...route} />}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default PanelSidebar;
