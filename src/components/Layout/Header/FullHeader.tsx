import React, { useEffect, useState } from "react";
import LogoIcon from "@/components/icons/logo";
import { BaseHeaderProps } from "@/types";
import Link from "next/link";
import { getNavLinks } from "./routeConfigs";
import HeaderAction from "./HeaderAction";

const FullHeader: React.FC<BaseHeaderProps> = ({ user, pathname }) => {
  const role = user?.role;
  const links = getNavLinks(role, pathname);
  const pageName = pathname.split("/").filter(Boolean).pop() || "home";

  return (
    <header className="sticky top-0 z-50 w-full bg-white text-black shadow-md transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-[70px] items-center">
          <Link href="/">
            <LogoIcon className={`h-[40px] w-auto text-primary`} />
          </Link>
          <nav className="ml-auto flex items-center space-x-8">
            <div className="hidden items-center space-x-8 md:flex">
              {links.map((link, i) => (
                <Link
                  key={i}
                  href={link.url}
                  className="font-medium hover:text-gray-300"
                >
                  {link.title}
                </Link>
              ))}
            </div>

            <HeaderAction user={user} pageName={pageName} />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default FullHeader;
