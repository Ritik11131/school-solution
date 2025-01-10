export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "School Solution",
  description: "Need help with your school work? We got you covered!",
  welcomeMsg: "Welcome back",
  navItems: [
    {
      label: "Dashboard",
      href: "/main/dashboard",
    },
    {
      label: "Management",
      href: "/main/route-management",
      children: [
        { key:'crew',label: "Crew", href: "/main/management/crew" },
        { key:'parent',label: "Parent", href: "/main/management/parent" },
        { key:'route',label: "Route", href: "/main/management/route" },
      ],
    },
  ],
  profileItems: [
    {
      key: "profile",
      content: "Signed in as",
      email: "zoey@example.com",
      isProfile: true,
    },
    { key: "logout", 
      content: "Log Out", 
      color: "danger"
    },
  ]
};
