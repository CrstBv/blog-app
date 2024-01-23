"use client"

import Link from "next/link";
import { usePathname } from "next/navigation"

const headerLinks = [
    {
        label: 'Home',
        route: '/',
    },
    {
        label: 'Create Post',
        route: '/post/create',
    },
    {
        label: 'Profile',
        route: '/profile',
    },
]


const AuthNavItems = () => {
    const pathname = usePathname();

  return (
    <ul className="md:flex flex w-full flex-col items-start gap-5 md:flex-row ">
        
        {headerLinks.map((link) => {
            const isActive = pathname === link.route

            return (
                <li
                key={link.route}
                className={`${
                    isActive && "text-cyan-400"
                  } flex-center p-medium-16 whitespace-nowrap`}
                >
                    <Link href={link.route}>{link.label}</Link>
                </li>
            )
        })}
    </ul>
  )
}

export default AuthNavItems