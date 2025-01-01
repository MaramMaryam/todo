import { Routes } from "./endPoinrs";

export const MenuItems = [
  {
    name: <span className="text-md"> Home </span>,
    logo: '',
    href: '/',
    current: true,
  },
  {
    name: <span className="ml-12 text-lg font-bolder"> About </span>,
    logo: '',
    href: '/about-page',
    current: true,
  },
  {
    name: <span className="ml-12 text-lg font-bolder"> Posts </span>,
    logo: '',
    href: Routes.posts.POSTS,
    current: true,
  },
  {
    name: <span className="ml-12 text-lg font-bolder"> Contact </span>,
    logo: '',
    href: '/contact-page',
    current: true,
  },

]