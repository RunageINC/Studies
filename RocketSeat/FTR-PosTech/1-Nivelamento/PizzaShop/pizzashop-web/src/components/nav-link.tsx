import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router";
import type { LinkProps } from "react-router";

export type NavLinkProps = LinkProps;

export function NavLink(props: NavLinkProps) {
  const { pathname } = useLocation();
  return (
    <Link
      data-current={pathname === props.to}
      {...props}
      className={cn(
        "data-[current=true]:text-foreground text-muted-foreground hover:text-foreground flex items-center gap-1.5 text-sm font-medium",
        props.className,
      )}
    />
  );
}
