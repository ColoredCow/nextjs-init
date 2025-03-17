"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const BottomTabBar = ({ routes }) => {
  /* 
    /* Example of routes props
     */
  // const routes = [
  //     {
  //         href: '/home',
  //         label: 'HOME',
  //         icon: (
  //             <svg className="h-6 w-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
  //                 <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
  //             </svg>
  //         ),
  //         activeIcon: (
  //             <svg className="h-6 w-6 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
  //                 <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
  //             </svg>
  //         ),
  //     },
  // ];

  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t">
      <div className="flex justify-between max-w-lg mx-auto px-6">
        {routes.map((route, index) => {
          const isActive = pathname.startsWith(route.href);
          return (
            <Link
              key={index}
              href={{ pathname: route.href }}
              className={"flex flex-col items-center py-3"}
            >
              {isActive ? route.activeIcon : route.icon}
              <span
                className={`text-xs font-bold ${isActive ? "text-gray-800" : "text-gray-400"}`}
              >
                {route.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomTabBar;
