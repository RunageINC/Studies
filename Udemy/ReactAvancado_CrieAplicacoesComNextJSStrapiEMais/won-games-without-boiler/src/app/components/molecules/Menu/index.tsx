import Link from "next/link";
import { Menu2 as MenuIcon } from "styled-icons/remix-fill";
import { ShoppingCart as ShoppingCartIcon } from "@styled-icons/material-outlined";
import { Search as SearchIcon } from "styled-icons/material-outlined";
import { Close as CloseIcon } from "styled-icons/material-outlined";

import { IconWrapper } from "../../@shared/svgs/iconWrapper";
import Logo from "../../@shared/Logo";

import { useWindowAdaptation } from "@/app/contexts/useWindowAdaptation";
import { useState } from "react";

import "./index.css";
import Button from "../../@shared/Button";

type MenuProps = {
  username?: string;
};

const Menu = ({ username }: MenuProps) => {
  const [navMenuOpened, setNavMenuOpened] = useState(false);

  const { isMobile } = useWindowAdaptation();

  return (
    <menu className="won-games__menu">
      <IconWrapper>
        <MenuIcon
          aria-label="Open Menu"
          onClick={() => setNavMenuOpened(true)}
        />
      </IconWrapper>
      <div className="logo-wrapper">
        <Logo hideText={isMobile} />
      </div>
      <div className="won-games__menu-group">
        <IconWrapper>
          <SearchIcon aria-label="Search" />
        </IconWrapper>
        <IconWrapper>
          <ShoppingCartIcon aria-label="Open Shopping Cart" />
        </IconWrapper>
      </div>
      <nav
        className={`${!navMenuOpened ? "menu-hidden" : "won-games__nav-menu"}`}
        style={{
          opacity: navMenuOpened ? 1 : 0,
          transition: "opacity .3s ease-in-out",
        }}
        aria-hidden={!navMenuOpened}
      >
        <CloseIcon
          color="black"
          aria-label="Close Menu"
          onClick={() => setNavMenuOpened(false)}
        />

        <div className="won-games__nav-menu-item">
          <Link className="won-games__nav-menu-link" href="#">
            Home
          </Link>
          <Link className="won-games__nav-menu-link" href="#">
            Explore
          </Link>
          {username && (
            <>
              <Link className="won-games__nav-menu-link" href="#">
                My Account
              </Link>
              <Link className="won-games__nav-menu-link" href="#">
                Wishlist
              </Link>
            </>
          )}
        </div>

        {!username && (
          <div className="won-games__register-box">
            <Button fullWidth size="small">
              Login now!
            </Button>
            <span>or</span>
            <Link
              className="won-games__create-account"
              title="sign in"
              href="#"
            >
              Sign up
            </Link>
          </div>
        )}
      </nav>
    </menu>
  );
};

export default Menu;
