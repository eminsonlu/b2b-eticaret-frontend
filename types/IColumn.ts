import { ReactNode } from 'react';

export default interface IColumn {
  title: string;
  icon?: ReactNode;
  className?: string;
  content: (row: any, index: number) => any;
}
