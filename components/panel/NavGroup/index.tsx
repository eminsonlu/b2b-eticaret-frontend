import classNames from 'classnames';
import { usePathname } from 'next/navigation';
import { ReactNode, useState } from 'react';
import { LuChevronUp } from 'react-icons/lu';
import NavItem from '../NavItem';

const NavGroup = ({
  title,
  icon,
  subMenus,
}: {
  title: string;
  icon: ReactNode;
  subMenus?: { title: string; icon: ReactNode; path: string }[];
}) => {
  const pathname = usePathname();
  const isActive = subMenus?.some((subMenu) => subMenu.path === pathname);

  const [show, setShow] = useState(isActive);

  return (
    <div className={classNames('w-full')}>
      <div
        className={classNames(
          'w-full h-[40px] min-h-[40px]',
          'text-white text-sm',
          'flex items-center gap-2',
          'px-4 box-border rounded-md group cursor-pointer'
        )}
        onClick={() => setShow((prev) => !prev)}
      >
        {icon}
        {title}
        <LuChevronUp
          size={20}
          className={classNames(
            'ml-auto transition-all group-hover:rotate-180 duration-300',
            {
              'transform rotate-180': show,
            }
          )}
        />
      </div>

      {show && (
        <div className="ml-6 flex flex-col gap-1">
          {subMenus?.map((subMenu, index) => (
            <NavItem
              key={index}
              {...subMenu}
              className="text-white/75 hover:!text-white"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NavGroup;
