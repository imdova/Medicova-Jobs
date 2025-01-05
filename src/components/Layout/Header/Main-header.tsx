"use client";
import LogoIcon from "@/components/icons/logo";
import ItemSelector from "@/components/UI/menu-item";
import NotificationModal from "@/components/UI/Notification-modal";
import { jobSeekerSideBarLinks } from "@/constants/side-bar";
import { NextAuthProvider } from "@/NextAuthProvider";
import { useAppSelector } from "@/store/hooks";
import { LinkType } from "@/types/side-bar";
import { getLastSegment } from "@/util";
import { NotificationsActive, NotificationsNone } from "@mui/icons-material";
import { Drawer, IconButton, List } from "@mui/material";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type HeaderType = "home" | "employer" | "job-seeker";

interface MainHeaderProps {
  headerType?: HeaderType;
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
    url: "/cv-search",
  },
  {
    title: "Report",
    url: "/report",
  },
  {
    title: "Billing",
    url: "/billing",
  },
];

const Header: React.FC<MainHeaderProps> = ({ headerType = "home" }) => {
  const user = useAppSelector((state) => state.user);
  const pathname = usePathname(); // Get the current path
  const currentPage = pathname.split("/")[1];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const close = () => setIsMenuOpen(false);
  const open = () => setIsMenuOpen(true);

  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const toggleNotification = () => setNotificationOpen(!isNotificationOpen);
  const closeNotification = () => setNotificationOpen(false);

  const links =
    headerType === "job-seeker"
      ? homeLinks
      : headerType === "employer"
        ? employerLinks
        : homeLinks;

  return (
    <header>
      <div className="container mx-auto flex h-[100px] items-center justify-between gap-12 lg:max-w-[1170px]">
        {/* Logo and Brand Name */}
        <Link href="/" className="flex items-end text-primary-foreground">
          <LogoIcon className="h-[50px] w-[40px]" />
          <div className="flex h-fit flex-col text-center">
            <h1 className="font-baiJamJuree text-[30px] font-bold leading-[25px]">
              MEDICOVA
            </h1>
            <p className="font-baiJamJuree text-[14px] font-medium">
              MEDICAL COMMUNITY
            </p>
          </div>
        </Link>

        <Drawer
          anchor="right"
          open={isMenuOpen}
          onClose={close} // Handles backdrop clicks automatically
        >
          <div className="h-full max-w-[600px] overflow-hidden bg-primary text-primary-foreground">
            <div className="scroll-bar-hidden max-h-full overflow-y-auto py-5">
              <List>
                {jobSeekerSideBarLinks.map((link, index) => (
                  <ItemSelector key={index} link={link} onClick={close} />
                ))}
              </List>
            </div>
          </div>
        </Drawer>

        {/* Navigation Menu */}
        <nav
          className="hidden flex-1 uppercase text-primary-foreground md:flex"
          aria-label="Main navigation"
        >
          <ul className="flex md:gap-4 lg:gap-12">
            {links.map((link, i) => (
              <HeaderItem key={i} {...link} currentPage={currentPage} />
            ))}
          </ul>
        </nav>
        {/* notification */}
        <NotificationModal
          isOpen={isNotificationOpen}
          onClose={closeNotification}
        />
        {/* Actions */}
        {user?.email ? (
          <div className="hidden gap-3 md:flex">
            <Link href="/notifications">
              <IconButton
                className="relative h-12 w-12"
                size="medium"
                component="div" // Ensures proper accessibility
              >
                {currentPage !== "notifications" && (
                  <div className="absolute right-4 top-3 h-2 w-2 rounded-full border border-white bg-red-500" />
                )}
                {currentPage === "notifications" ? (
                  <NotificationsActive className="h-6 w-6 text-white" />
                ) : (
                  <NotificationsNone className="h-6 w-6 text-white" />
                )}
              </IconButton>
            </Link>
            <Link href={`/me/${user?.firstName || "1"}`}>
              {user?.photo ? (
                <Image
                  src={user?.photo}
                  alt={user?.firstName ?? "User Image"}
                  height={48}
                  width={48}
                  className="h-12 w-12 rounded-full object-cover transition-transform duration-150 hover:scale-105 hover:shadow-md"
                />
              ) : (
                <div className="flex h-12 w-12 items-center rounded-full bg-gray-500 transition-transform duration-150 hover:scale-105 hover:shadow-md">
                  <span className="w-full text-center text-3xl uppercase text-white">
                    {user?.firstName?.[0] ?? ""}
                  </span>
                </div>
              )}
            </Link>
          </div>
        ) : (
          <div className="hidden gap-3 md:flex">
            <Link
              href="/register"
              className="text-nowrap rounded-[10px] px-4 py-2 font-semibold uppercase text-primary-foreground transition-colors duration-300 hover:bg-primary-foreground hover:text-primary focus:ring-2 focus:ring-primary-foreground"
            >
              Sign Up
            </Link>
            <Link
              href="/login"
              className="rounded-[10px] bg-primary px-4 py-2 font-semibold uppercase text-primary-foreground transition-colors duration-300 hover:bg-primary-foreground hover:text-primary focus:ring-2 focus:ring-primary-foreground"
            >
              Login
            </Link>
          </div>
        )}

        {/* Mobile Menu Button */}
        <button
          onClick={open}
          className="text-primary-foreground focus:outline-none md:hidden"
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
        className={`${isActive ? "font-black" : "font-semibold"} text-[16px] text-white focus:outline-none`}
      >
        {title}
      </Link>
    </li>
  );
};

const MainHeader: React.FC<MainHeaderProps> = ({ headerType }) => {
  return (
    <NextAuthProvider>
      <Header headerType={headerType} />
    </NextAuthProvider>
  );
};

export default MainHeader;
