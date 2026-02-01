import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { Slot } from "@radix-ui/react-slot";

const buttonVariants = tv({
  base: "text-zinc-400 rounded-lg hover:text-zinc-100 hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed aria-disabled:opacity-50 aria-disabled:cursor-not-allowed",
  variants: {
    size: {
      default: "px-3 py-2",
      icon: "p-2",
      "icon-sm": "p-1",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

type ButtonVariants = typeof buttonVariants;

type ButtonProps = ComponentProps<"button"> &
  VariantProps<ButtonVariants> & {
    asChild?: boolean;
  };

export function Button({ size, className, asChild, ...props }: ButtonProps) {
  const Component = asChild ? Slot : "button";

  return (
    <Component className={buttonVariants({ size, className })} {...props} />
  );
}
