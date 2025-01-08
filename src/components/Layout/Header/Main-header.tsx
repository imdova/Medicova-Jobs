"use client";
import LogoIcon from "@/components/icons/logo";
import UserAvatar from "@/components/UI/Avatar";
import ItemSelector from "@/components/UI/menu-item";
import NotificationModal from "@/components/UI/Notification-modal";
import { NextAuthProvider } from "@/NextAuthProvider";
import { UserState } from "@/types";
import { LinkType } from "@/types/side-bar";
import { getLastSegment } from "@/util";
import { NotificationsActive, NotificationsNone } from "@mui/icons-material";
import { Drawer, IconButton, List } from "@mui/material";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type HeaderType = "home" | "employer" | "job-seeker";

interface MainHeaderProps {
  headerType?: HeaderType;
  textColor?: string;
  logoColor?: string;
}
const homeLinks: LinkType[] = [
  {
    title: "Jobs",
    url: "/search",
  },
  {
    title: "Boost",
    url: "#",
  },
  {
    title: "Prep",
    url: "#",
  },
  {
    title: "Learn",
    url: "#",
  },
  {
    title: "Career Advice",
    url: "#",
  },
];
const employerLinks: LinkType[] = [
  {
    title: "Dashboard",
    url: "/employer/dashboard",
  },
  {
    title: "My Jobs",
    url: "/employer/job/manage-jobs",
  },
  {
    title: "CV Search",
    url: "/employer/search",
  },
  {
    title: "Report",
    url: "#",
  },
  {
    title: "Billing",
    url: "/employer/subscription-plans",
  },
];

const MainHeader = ({
  headerType = "home",
  textColor,
  logoColor,
}: MainHeaderProps) => {
  const session = useSession();
  const user = session.data?.user as UserState;

  const pathname = usePathname(); // Get the current path

  const currentPage = pathname.split("/")[1];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const close = () => setIsMenuOpen(false);
  const open = () => setIsMenuOpen(true);

  const links =
    headerType === "job-seeker"
      ? homeLinks
      : headerType === "employer"
        ? employerLinks
        : homeLinks;

  return (
    <header>
      <div
        className={`container mx-auto flex h-[70px] items-center justify-between gap-12 lg:max-w-[1170px] ${textColor}`}
      >
        {/* Logo and Brand Name */}
        <Link
          href="/"
          className={`flex items-end ${logoColor || "text-primary"}`}
        >
          <LogoIcon className="h-[40px] w-[30px]" />
          <div className="flex h-fit flex-col text-center">
            <h1 className="font-baiJamJuree text-[20px] font-bold leading-[18px]">
              MEDICOVA
            </h1>
            <p className="font-baiJamJuree text-[10px] font-medium">
              MEDICAL COMMUNITY
            </p>
          </div>
        </Link>

        <Drawer
          anchor="right"
          open={isMenuOpen}
          onClose={close} // Handles backdrop clicks automatically
          className="text-inherit"
        >
          <div className="h-full max-w-[600px] overflow-hidden bg-primary">
            <div className="scroll-bar-hidden max-h-full overflow-y-auto py-5">
              <List>
                {links.map((link, index) => (
                  <ItemSelector key={index} link={link} onClick={close} />
                ))}
              </List>
            </div>
          </div>
        </Drawer>

        {/* Navigation Menu */}
        <nav
          className="hidden flex-1 uppercase text-inherit md:flex"
          aria-label="Main navigation"
        >
          <ul className="flex md:gap-4 lg:gap-12">
            {links.map((link, i) => (
              <HeaderItem key={i} {...link} currentPage={currentPage} />
            ))}
          </ul>
        </nav>
        {/* notification */}

        {/* Actions */}
        <HeaderAction {...user} currentPage={currentPage} />

        {/* Mobile Menu Button */}
        <button
          onClick={open}
          className="text-inherit focus:outline-none md:hidden"
          aria-label="Open menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

const HeaderItem: React.FC<LinkType & { currentPage: string }> = ({
  title,
  url,
  currentPage,
}) => {
  const route = getLastSegment(url);
  const isActive = currentPage == route;
  return (
    <li>
      <Link
        href={url || "#"}
        className={`${isActive ? "font-black" : "font-semibold"} text-[16px] focus:outline-none`}
      >
        {title}
      </Link>
    </li>
  );
};

const Header = ({
  headerType = "home",
  textColor,
  logoColor,
}: MainHeaderProps) => {
  return (
    <NextAuthProvider>
      <MainHeader
        headerType={headerType}
        textColor={textColor}
        logoColor={logoColor}
      />
    </NextAuthProvider>
  );
};

export default Header;

const HeaderAction: React.FC<UserState & { currentPage: string }> = ({
  id,
  firstName,
  photo,
  currentPage,
  name,
  image,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  if (id) {
    return (
      <div className="hidden items-center gap-3 text-inherit md:flex">
        <NotificationModal anchorEl={anchorEl} onClose={handleClose} />
        <IconButton
          className="relative h-12 w-12 text-inherit"
          size="medium"
          onClick={handleClick}
          disabled={currentPage === "notifications"}
        >
          {currentPage !== "notifications" && (
            <div className="absolute right-4 top-3 h-2 w-2 rounded-full border border-white bg-red-500" />
          )}
          {currentPage === "notifications" ? (
            <NotificationsActive className="h-6 w-6 text-inherit" />
          ) : (
            <NotificationsNone className="h-6 w-6 text-inherit" />
          )}
        </IconButton>
        <UserAvatar
          userAvatar={photo || image}
          userName={firstName || name || "User Image"}
        />
      </div>
    );
  } else {
    return (
      <div className="hidden gap-3 md:flex">
        <Link
          href="/auth/register"
          className="text-nowrap rounded-[10px] px-4 py-2 font-semibold uppercase text-inherit transition-colors duration-300 hover:bg-primary-foreground hover:text-primary focus:ring-2 focus:ring-primary-foreground"
        >
          Sign Up
        </Link>
        <Link
          href="/auth/signin"
          className="rounded-[10px] bg-primary px-4 py-2 font-semibold uppercase text-primary-foreground transition-colors duration-300 hover:bg-primary-foreground hover:text-primary focus:ring-2 focus:ring-primary-foreground"
        >
          Login
        </Link>
      </div>
    );
  }
};
