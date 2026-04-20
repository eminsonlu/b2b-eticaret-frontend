import React from 'react';

interface Props {
  className?: string;
  label?: string;
  value?: string;
  error?: string | boolean;
  onSelect: (value: string) => void;
}

const ColorPicker = ({ label, error, value = '#000000', onSelect }: Props) => {
  return (
    <div className="w-full flex flex-col gap-1">
      {label && <span className="text-sm text-black/80">{label}</span>}

      <div className="w-12 h-8 rounded-md bg-slate-100 border-slate-200 flex items-center justify-center">
        <div
          className="w-10 h-6 rounded relative"
          style={{
            backgroundColor: value,
          }}
        >
          <input
            type="color"
            value={value}
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            onChange={(e) => onSelect(e.target.value)}
          />
        </div>
      </div>

      {error && <span className="text-sm italic text-red-400">{error}</span>}
    </div>
  );
};

export default ColorPicker;
