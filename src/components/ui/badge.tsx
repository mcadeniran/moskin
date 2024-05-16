import * as React from "react";
import {cva, type VariantProps} from "class-variance-authority";

import {cn} from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        delivered: 'border-transparent bg-emerald-500/15 text-emerald-500 hover:bg-emerald-500/30',
        pending: 'border-transparent bg-destructive/15 ttext-destructive hover:bg-destructive/30',
        processing: 'border-transparent bg-rosegold/15 ttext-rosegold hover:bg-rosegold/30',
        shipped: 'border-transparent bg-skyblue/15 ttext-skyblue hover:bg-skyblue/30',
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> {}

function Badge({className, variant, ...props}: BadgeProps) {
  return (
    <div className={cn(badgeVariants({variant}), className)} {...props} />
  );
}

export {Badge, badgeVariants};
