export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "School Solution",
  description: "Need help with your school work? We got you covered!",
  navItems: [
    {
      label: "Home",
      href: "/main/home",
    },
    {
      label: "About",
      href: "/main/about",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/main/home",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
