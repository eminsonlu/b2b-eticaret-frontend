'use client';
import React from 'react';
import cn from 'classnames';
import IColumn from '@/types/IColumn';
import { TbDotsVertical } from 'react-icons/tb';

interface Props {
  columns: IColumn[];
  data: any[];
  actions?: any[];
}

const Table = ({ columns, data, actions = [] }: Props) => {
  actions = actions.filter((action) => action.hidden !== true);

  return (
    <div className="w-full flex flex-col">
      <div className="w-full min-h-[50px] flex bg-slate-100 border border-r-0 border-slate-200 box-border rounded-t-md">
        {columns.map((column: IColumn, index) => (
          <div
            key={index}
            className={cn(
              'flex-1 flex items-center gap-2',
              'px-3 box-border',
              'border-r border-slate-200',
              'text-sm font-medium text-slate-600',
              column?.className
            )}
          >
            {column.icon && column.icon}
            {column.title}
          </div>
        ))}

        {actions.length > 0 && (
          <div
            className={cn(
              'flex-1 flex items-center gap-2',
              'px-3 box-border',
              'border-r border-slate-200',
              'text-sm font-medium text-slate-600',
              'w-[45px] max-w-[45px]'
            )}
          ></div>
        )}
      </div>

      {data.map((row, index) => (
        <div
          key={index}
          className="w-full min-h-[40px] flex border-b bg-white border-l border-slate-200 box-border hover:bg-slate-100 last:rounded-b-md odd:bg-slate-50"
        >
          {columns.map((column: IColumn, columnIndex) => (
            <div
              key={columnIndex}
              className={cn(
                'flex-1 flex items-center gap-2',
                'px-3 py-1 box-border',
                'border-r border-slate-200',
                'text-sm text-slate-600',
                column?.className
              )}
            >
              {column.content(row, index)}
            </div>
          ))}

          {actions.length > 0 && (
            <div
              className={cn(
                'relative group',
                'flex-1 flex items-center gap-2',
                'px-3 box-border',
                'border-r border-slate-200',
                'text-sm text-slate-600',
                'w-[45px] max-w-[45px]'
              )}
            >
              <div className="w-full h-full flex items-center justify-center">
                <TbDotsVertical size={20} className="cursor-pointer" />
              </div>

              <div className="w-[200px] min-h-[25px] p-2 flex-col gap-1 rounded-md border border-slate-200 bg-white hidden absolute right-[20px] top-[25px] z-10 shadow-md group-hover:flex">
                {actions.map((action, actionIndex) => (
                  <button
                    key={actionIndex}
                    className="w-full flex items-center gap-1 px-2 py-1 hover:bg-slate-50 rounded-md cursor-pointer"
                    onClick={() => action.action(row, index)}
                  >
                    <div className="w-[20px] h-[25px] flex items-center justify-center">
                      {action.icon}
                    </div>
                    <span className="!text-sm">{action.title}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Table;
