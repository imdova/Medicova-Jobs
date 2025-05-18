import LogoIcon from "@/components/icons/logo";
import { BaseHeaderProps } from "@/types";
import Link from "next/link";
import { getNavLinks } from "./routeConfigs";
import { isCurrentPage } from "@/util";

const DarkHeader: React.FC<BaseHeaderProps> = ({ user, pathname }) => {
  const links = getNavLinks(user, pathname);

  return (
    <header className="flex h-[70px] w-full items-center justify-center bg-primary">
      <div className="container px-4">
        <div className="flex h-16 justify-between items-center">
          <Link href="/" className="text-xl font-bold text-white">
            <LogoIcon className="h-[20px] w-auto md:h-[30px]" />
          </Link>
          <nav className="ml-8 flex space-x-6">
            {links.map((link, i) => {
              const path = link.pattern || link.path;
              const isPage = isCurrentPage(pathname, path);
              return (
                <Link
                  key={i}
                  href={link?.path || "#"}
                  className={`${isPage ? "text-white" : ""} text-gray-300 hover:text-white`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default DarkHeader;
