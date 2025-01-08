import React, { useEffect, useState } from "react";
import LogoIcon from "@/components/icons/logo";
import { BaseHeaderProps } from "@/types";
import Link from "next/link";
import { getNavLinks } from "./routeConfigs";
import HeaderAction from "./HeaderAction";

const TransparentHeader: React.FC<BaseHeaderProps> = ({ user, pathname }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const role = user?.role;
  const pageName = pathname.split("/").filter(Boolean).pop() || "home";
  const links = getNavLinks(role, pathname);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-colors duration-300 ${isScrolled ? "bg-white text-black shadow-md" : "bg-transparent text-white"}`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-[70px] items-center">
          <Link
            href="/"
            // className={`${isScrolled ? "text-primary" : "text-white"}`}
          >
            <LogoIcon
              className={`${isScrolled ? "text-primary" : "text-white"} h-[30px] w-auto md:h-[40px]`}
            />
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

export default TransparentHeader;
