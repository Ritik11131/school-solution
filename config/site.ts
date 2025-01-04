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
      label: "Route Management",
      href: "/main/route-management",
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
