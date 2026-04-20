import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

const NavItem = ({
  title,
  icon,
  path,
  className,
  badge,
  hidden = false,
}: {
  title: string;
  icon: ReactNode;
  path: string;
  className?: string;
  badge?: ReactNode;
  hidden?: boolean;
}) => {
  const pathname = usePathname();

  return (
    <Link
      href={path}
      className={classNames(
        'w-full h-[40px] min-h-[40px] flex items-center gap-2 px-4 box-border rounded-md hover:bg-white/10 text-white text-sm',
        {
          '!bg-white/10 !text-white': pathname === path,
          hidden: hidden,
        },
        className
      )}
      title={title}
    >
      {icon}
      <span className="truncate">{title}</span>
      {badge}
    </Link>
  );
};

export default NavItem;
