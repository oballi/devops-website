import * as React from "react";
import * as RadixSelect from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

// Multi-select desteği için prop ekliyoruz
interface SelectProps extends RadixSelect.SelectProps {
  multiple?: boolean;
  value: string[];
  onValueChange: (value: string[]) => void;
  children: React.ReactNode;
}

export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  ({ multiple, value, onValueChange, children, ...props }, ref) => {
    return (
      <RadixSelect.Root
        value={value.length > 0 ? value[value.length - 1] : undefined}
        onValueChange={(val) => {
          if (!multiple) {
            onValueChange([val]);
          } else {
            if (value.includes(val)) {
              onValueChange(value.filter((v) => v !== val));
            } else {
              onValueChange([...value, val]);
            }
          }
        }}
        {...props}
      >
        {children}
      </RadixSelect.Root>
    );
  }
);
Select.displayName = "Select";

export const SelectTrigger = React.forwardRef<
  HTMLButtonElement,
  RadixSelect.SelectTriggerProps
>(({ className, children, ...props }, ref) => (
  <RadixSelect.Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  >
    {children}
    <RadixSelect.Icon asChild>
      <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
    </RadixSelect.Icon>
  </RadixSelect.Trigger>
));
SelectTrigger.displayName = "SelectTrigger";

export const SelectValue = RadixSelect.Value;

export const SelectContent = React.forwardRef<
  HTMLDivElement,
  RadixSelect.SelectContentProps
>(({ className, children, ...props }, ref) => (
  <RadixSelect.Portal>
    <RadixSelect.Content
      ref={ref}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-80",
        className
      )}
      {...props}
    >
      <RadixSelect.Viewport>{children}</RadixSelect.Viewport>
    </RadixSelect.Content>
  </RadixSelect.Portal>
));
SelectContent.displayName = "SelectContent";

export const SelectItem = React.forwardRef<
  React.ElementRef<typeof RadixSelect.Item>,
  RadixSelect.SelectItemProps
>(({ className, children, ...props }, ref) => (
  <RadixSelect.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <RadixSelect.ItemIndicator>
        <Check className="h-4 w-4" />
      </RadixSelect.ItemIndicator>
    </span>
    <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
  </RadixSelect.Item>
));
SelectItem.displayName = "SelectItem"; 