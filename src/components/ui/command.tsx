import * as React from "react";
import { cn } from "@/lib/utils";

export function Command({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col overflow-hidden rounded-md bg-popover text-popover-foreground shadow-md", className)} {...props} />
  );
}

export function CommandInput({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="p-2 border-b">
      <input
        className={cn(
          "w-full bg-transparent outline-none text-sm placeholder:text-muted-foreground",
          className
        )}
        {...props}
      />
    </div>
  );
}

export function CommandList({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("max-h-60 overflow-y-auto", className)} {...props} />;
}

export function CommandItem({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex items-center px-3 py-2 cursor-pointer select-none hover:bg-accent hover:text-accent-foreground text-sm",
        className
      )}
      tabIndex={0}
      {...props}
    />
  );
} 