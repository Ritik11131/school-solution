"use client";

import React from "react";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/navbar";
import { usePathname,useRouter  } from "next/navigation";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { Logo } from "@/components/icons";
import ProfileDropdown from "./profile-dropdown";
import { redirect } from "next/navigation";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { ChevronDownIcon, User2Icon, Users } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const {logout} = useAuth();
  

  const handleNavigation = (href : string) => {
    router.push(href);
  };

  const handleAction = (key: string) => {
    console.log("Selected action:", key);
    key === "logout" && (logout());
  };


  const renderedNavItems = React.useMemo(() => {
    return siteConfig.navItems?.map((item) => {
      if (item.children) {
        return (
          <Dropdown key={item.href}>
            <NavbarItem>
              <DropdownTrigger>
                <Button
                  disableRipple
                  endContent={<ChevronDownIcon />}
                  radius="sm"
                  variant="light"
                >
                  {item.label}
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
              aria-label={`${item.label} features`}
              onAction={(key:any) => handleNavigation(key)}
              itemClasses={{
                base: "gap-4",
              }}
            >
              {item.children.map((child) => (
                <DropdownItem
                  key={child.href}
                  startContent={
                    child.key === "parent" ? <Users /> : <User2Icon />
                  }
                >
                  {child.label}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        );
      }

      return (
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
      );
    });
  }, [siteConfig.navItems]);

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">RITIK</p>
          </NextLink>
        </NavbarBrand>
        {/* <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {renderedNavItems}
        </ul> */}
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
      {renderedNavItems}
    </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>

        <NavbarItem className="hidden sm:flex gap-2">
          <ProfileDropdown
            items={siteConfig?.profileItems}
            onAction={handleAction}
          />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <ProfileDropdown
          items={siteConfig?.profileItems}
          onAction={handleAction}
        />
      </NavbarContent>
    </NextUINavbar>
  );
};
