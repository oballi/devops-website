"use client";
import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Option {
  label: string;
  value: string | number;
}

interface MultiSelectComboboxProps {
  options: Option[];
  value: (string | number)[];
  onChange: (value: (string | number)[]) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function MultiSelectCombobox({ options, value, onChange, placeholder, disabled }: MultiSelectComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const filtered = options.filter(opt =>
    opt.label.toLowerCase().includes(search.toLowerCase()) && !value.includes(opt.value)
  );

  function handleSelect(val: string | number) {
    if (!value.includes(val)) {
      onChange([...value, val]);
      setSearch("");
      if (inputRef.current) inputRef.current.focus();
    }
  }

  function handleRemove(val: string | number) {
    onChange(value.filter(v => v !== val));
    if (inputRef.current) inputRef.current.focus();
  }

  return (
    <div className="relative">
      <div
        className={cn(
          "flex flex-wrap gap-2 items-center border rounded-md px-3 py-2 min-h-[42px] bg-background cursor-text focus-within:ring-2 focus-within:ring-ring",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        tabIndex={0}
        onClick={() => !disabled && setOpen(true)}
        onFocus={() => !disabled && setOpen(true)}
      >
        {value.length === 0 && (
          <span className="text-muted-foreground text-sm select-none">
            {placeholder || "Seçiniz"}
          </span>
        )}
        {value.map(val => {
          const opt = options.find(o => o.value === val);
          if (!opt) return null;
          return (
            <span key={val} className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded text-xs">
              {opt.label}
              <button
                type="button"
                className="ml-1 hover:text-destructive"
                onClick={e => {
                  e.stopPropagation();
                  handleRemove(val);
                }}
                tabIndex={-1}
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          );
        })}
        <input
          ref={inputRef}
          type="text"
          className="flex-1 bg-transparent outline-none border-0 text-sm min-w-[60px]"
          value={search}
          onChange={e => setSearch(e.target.value)}
          onFocus={() => setOpen(true)}
          disabled={disabled}
          placeholder={value.length === 0 ? placeholder : ""}
        />
        <button
          type="button"
          tabIndex={-1}
          className="ml-2 text-muted-foreground hover:text-foreground"
          onClick={e => {
            e.stopPropagation();
            setOpen((prev) => !prev);
            if (inputRef.current) inputRef.current.focus();
          }}
        >
          <ChevronsUpDown className="w-4 h-4" />
        </button>
      </div>
      {open && !disabled && (
        <div className="absolute z-50 mt-1 w-full bg-popover border rounded-md shadow-lg animate-in fade-in-80 max-h-60 overflow-y-auto">
          {filtered.length === 0 && (
            <div className="p-2 text-muted-foreground text-sm">Sonuç yok</div>
          )}
          {filtered.map(opt => (
            <div
              key={opt.value}
              className="flex items-center px-3 py-2 cursor-pointer select-none hover:bg-accent hover:text-accent-foreground text-sm"
              onMouseDown={e => {
                e.preventDefault();
                handleSelect(opt.value);
              }}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  value.includes(opt.value) ? "opacity-100" : "opacity-0"
                )}
              />
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 