export const siteConfig = {
    name: "Clear Mind Life",
    description: "Next-Generation Healthcare & Identity Intelligence SaaS.",
    url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    mainNav: [
        {
            title: "Home",
            href: "/",
        },
        {
            title: "Solutions",
            href: "/solutions",
        },
        {
            title: "Dashboard",
            href: "/dashboard",
        },
    ],
    links: {
        github: "https://github.com/clearmindlife",
    },
}

export type SiteConfig = typeof siteConfig
