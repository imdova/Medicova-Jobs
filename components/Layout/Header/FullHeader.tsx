import LogoIcon from "@/components/icons/logo";
import { BaseHeaderProps } from "@/types";
import Link from "next/link";
import { getNavLinks } from "./routeConfigs";
import HeaderAction from "./HeaderAction";
import { isCurrentPage } from "@/util";
import SideBarDrawer from "../SideBar/mobile-side-bar";

const FullHeader: React.FC<BaseHeaderProps> = ({ user, pathname }) => {
  const links = getNavLinks(user, pathname);

  return (
    <header className="sticky top-0 z-50 w-full bg-white text-black shadow-md transition-colors duration-300">
      <div className="container mx-auto px-6 lg:max-w-[1170px]">
        <div className="flex h-[70px] items-center">
          <div className="flex-1 justify-start items-center flex md:hidden">
            <SideBarDrawer user={user} pathname={pathname} />
          </div>

          <Link href="/"> 
            <LogoIcon className="h-[30px] w-auto text-primary md:h-[40px]" />
          </Link>
          <nav className="ml-auto flex flex-1 justify-end md:justify-end items-center space-x-8">
            <div className="hidden items-center space-x-8 md:flex">
              {links.map((link, i) => {
                const path = link.pattern || link.path;
                const isPage = isCurrentPage(pathname, path);
                return (
                  <Link
                    key={i}
                    href={link?.path || "#"}
                    className={`font-medium ${isPage ? "text-primary" : "hover:text-primary"}`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
            <HeaderAction user={user} pathname={pathname} />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default FullHeader;
