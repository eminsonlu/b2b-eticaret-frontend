'use client';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import cn from 'classnames';
import { FiInfo } from 'react-icons/fi';
import { HiOutlineExclamationTriangle } from 'react-icons/hi2';
import { VscError } from 'react-icons/vsc';
import { PiCheckCircle } from 'react-icons/pi';
import { IoIosClose } from 'react-icons/io';
import { useNotificationStore } from '@/stores/notificationStore';
import INotification from '@/types/INotification';

const TYPES = {
  success: {
    borderColor: '!border-green-400',
    icon: <PiCheckCircle size={22} className="text-green-400" />,
  },
  error: {
    borderColor: '!border-red-400',
    icon: <VscError size={22} className="text-red-400" />,
  },
  warning: {
    borderColor: '!border-orange-400',
    icon: (
      <HiOutlineExclamationTriangle size={22} className="text-orange-400" />
    ),
  },
  info: {
    borderColor: '!border-blue-400',
    icon: <FiInfo size={22} className="text-blue-400" />,
  },
};

const NotificationItem = ({
  id,
  title,
  text,
  type = 'info',
}: INotification) => {
  const { removeNotification } = useNotificationStore();
  return (
    <div
      className={cn(
        'w-[350px]',
        'p-4 box-border rounded relative',
        'flex gap-2',
        'bg-white',
        'shadow',
        'border-r-[3px] border-slate-300',
        TYPES[type].borderColor
      )}
    >
      <IoIosClose
        size={20}
        className="absolute top-2 right-2 cursor-pointer text-black/60 hover:text-black/100"
        onClick={() => removeNotification(id)}
      />
      <div className="">{TYPES[type].icon}</div>
      <div className="w-full flex flex-col">
        <strong className="font-medium text-sm">{title}</strong>
        <p className="text-sm text-black/80">{text}</p>
      </div>
    </div>
  );
};

const Notifications = () => {
  const { notifications } = useNotificationStore();

  const [render, setRender] = useState(false);

  useEffect(() => {
    setRender(true);
  }, []);

  const template = (
    <div className="fixed right-4 bottom-4 flex flex-col gap-4 z-50">
      {notifications.map((notification, index) => (
        <NotificationItem key={index} {...notification} />
      ))}
    </div>
  );

  return render ? createPortal(template, document?.body) : <></>;
};

export default Notifications;
