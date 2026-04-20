import React, {
  createContext,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import cn from 'classnames';
import MultiSelectItem from './MultiSelectItem';

interface Props {
  label: string;
  error?: string;
  disabled?: boolean;
  readOnly?: boolean;
  children?: ReactNode[] | ReactNode;
  selecteds: any[];
  onSelect: (items: any) => void;
  className?: string;
  onCreate?: () => void;
}

export const MultiSelectContext = createContext<any>({});

const MultiSelect = ({
  label,
  error,
  disabled,
  readOnly,
  children,
  selecteds = [],
  onSelect,
  className,
  onCreate,
}: Props) => {
  const divRef = useRef<any>(null);
  const [showList, setShowList] = useState(false);
  const [search, setSearch] = useState('');

  const _children = children ? children : [];
  const arrayChildren: any[] = Array.isArray(_children)
    ? _children
    : [_children];
  const options = arrayChildren.map((child: any) => ({
    value: child.props.value,
    label: child.props.label,
  }));

  const filteredOptions = options
    .filter((i) => !selecteds.includes(i.value))
    .filter((item, index) => {
      const regex = new RegExp(String(search).toLocaleLowerCase(), 'gi');
      if (String(item.label).toLocaleLowerCase().match(regex)) {
        return item;
      }
    });

  const handleOnSelect = (option: any) => {
    onSelect([...selecteds, option.value]);
  };

  const handleOnRemove = (value: any) => {
    onSelect(selecteds.filter((item: any) => item != value));
  };

  useEffect(() => {
    const clickEvent = (event: any) => {
      if (!divRef?.current.contains(event.target)) {
        setShowList(false);
        setSearch('');
      }
    };

    window.addEventListener('click', clickEvent);
    return () => {
      window.removeEventListener('click', clickEvent);
    };
  }, []);

  return (
    <MultiSelectContext.Provider value={{ selecteds, options, handleOnRemove }}>
      <div
        ref={divRef}
        className={cn('w-full flex flex-col gap-1 relative', className)}
      >
        {label && <span className="text-sm text-black/80">{label}</span>}

        <div
          className={cn(
            'bg-white',
            'w-full',
            'rounded border box-border border-slate-200 p-2',
            'flex gap-2 flex-wrap',
            {
              '!border-red': error,
              '!bg-slate-200 cursor-not-allowed !border-gray !text-gray':
                disabled || readOnly,
            }
          )}
        >
          {children}
          <input
            type="text"
            className="flex-1 px-2 bg-white outline-none box-border max-w-[125px] w-[125px]"
            placeholder="Ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClick={() => setShowList(true)}
          />
        </div>

        {/* error start */}
        {error && <span className="text-sm text-red">{error}</span>}
        {/* error */}

        {showList && (
          <div className="flex flex-col gap-1 w-full absolute top-full mt-1 left-0 z-20 bg-white rounded box-border shadow border-2 border-primary overflow-hidden max-h-[225px] overflow-y-auto p-2">
            {filteredOptions.map((option: any, index: number) => (
              <div
                key={index}
                className={cn(
                  'w-full h-[35px]',
                  'p-2 box-border',
                  'flex items-center gap-2',
                  'cursor-pointer rounded',
                  'text-sm',
                  'border border-transparent',
                  'hover:bg-primary-100/30 hover:text-primary-700 hover:border-primary-200'
                )}
                onClick={() => handleOnSelect(option)}
              >
                {option.label}
              </div>
            ))}

            {onCreate && (
              <div
                className={cn(
                  'w-full h-[35px]',
                  'p-2 box-border',
                  'flex items-center gap-2',
                  'cursor-pointer rounded',
                  'text-sm',
                  'border border-transparent',
                  '!bg-primary-100/30 !text-primary-700'
                )}
                onClick={() => onCreate()}
              >
                Yeni Oluştur
              </div>
            )}
          </div>
        )}
      </div>
    </MultiSelectContext.Provider>
  );
};

MultiSelect.Item = MultiSelectItem;

export default MultiSelect;
