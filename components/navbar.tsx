"use client";

import { useMemo } from 'react';
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/navbar";

import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { usePathname } from 'next/navigation';
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { Logo } from "@/components/icons";
import ProfileDropdown from "./profile-dropdown";
import authService from "@/services/authService";
import { redirect } from "next/navigation";

export const Navbar = () => {

    const pathname = usePathname();


      // Memoize the navigation items rendering
  const renderedNavItems = useMemo(() => {
    if (pathname === "/main") {
      return null;
    }

    return siteConfig.navItems?.map((item) => (
      <NavbarItem key={item.href}>
        <NextLink
          className={clsx(
            linkStyles({ color: "foreground" }),
            "data-[active=true]:text-primary data-[active=true]:font-medium"
          )}
          href={item.href}
          aria-label={`Navigate to ${item.label}`}
        >
          {item.label}
        </NextLink>
      </NavbarItem>
    ));
  }, [pathname, siteConfig.navItems]);


  const handleAction = (key: string) => {
    console.log('Selected action:', key);
    // Handle the selected action here

    key === 'logout' && (authService.clearTokens(), redirect('/auth/login'))
  };

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">RITIK</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {renderedNavItems}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>

        <NavbarItem className="hidden sm:flex gap-2">
          <ProfileDropdown items={siteConfig?.profileItems} onAction={handleAction}/>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <ProfileDropdown items={siteConfig?.profileItems} onAction={handleAction}/>
      </NavbarContent>
    </NextUINavbar>
  );
};
