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

  ],
  links: {
    
  },
  profileItems: [
    {
      key: "profile",
      content: "Signed in as",
      email: "zoey@example.com",
      isProfile: true,
    },
    { key: "logout", content: "Log Out", color: "danger" },
  ]
};
