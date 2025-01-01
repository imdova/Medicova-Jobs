"use client";
import LogoIcon from "@/components/icons/logo";
import ItemSelector from "@/components/UI/menu-item";
import NotificationModal from "@/components/UI/Notification-modal";
import NotificationCard from "@/components/UI/NotificationCard";
import { dummyNotifications } from "@/constants/notifications";
import { jobSeekerSideBarLinks } from "@/constants/side-bar";
import { NextAuthProvider } from "@/NextAuthProvider";
import { Close, NotificationsNone } from "@mui/icons-material";
import { Avatar, Drawer, IconButton, List } from "@mui/material";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Header: React.FC = () => {
  const { data: session } = useSession();
  const pathname = usePathname(); // Get the current path

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const close = () => setIsMenuOpen(false);
  const open = () => setIsMenuOpen(true);

  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const toggleNotification = () => setNotificationOpen(!isNotificationOpen);
  const closeNotification = () => setNotificationOpen(false);

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
            <li>
              <Link
                href="#"
                className="text-[16px] font-semibold hover:text-primary focus:text-primary focus:outline-none"
              >
                Jobs
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-[16px] font-semibold hover:text-primary focus:text-primary focus:outline-none"
              >
                Boost
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-[16px] font-semibold hover:text-primary focus:text-primary focus:outline-none"
              >
                Prep
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-[16px] font-semibold hover:text-primary focus:text-primary focus:outline-none"
              >
                Learn
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-[16px] font-semibold hover:text-primary focus:text-primary focus:outline-none"
              >
                Career Advice
              </Link>
            </li>
          </ul>
        </nav>
        {/* notification */}
        <NotificationModal
          isOpen={isNotificationOpen}
          onClose={closeNotification}
        />
        {/* Actions */}
        {session?.user?.email ? (
          <div className="hidden gap-3 md:flex">
            <IconButton
              onClick={toggleNotification}
              className="relative h-12 w-12"
              size="medium"
            >
              <div className="absolute right-4 top-3 h-2 w-2 rounded-full border border-white bg-red-500" />
              <NotificationsNone className="h-6 w-6 text-white" />
            </IconButton>
            <Link href="/job-seeker/profile">
              {session?.user?.image ? (
                <Image
                  src={session?.user?.image}
                  alt={session?.user?.name ?? "User Image"}
                  height={48}
                  width={48}
                  className="h-12 w-12 rounded-full object-cover transition-transform duration-150 hover:scale-105 hover:shadow-md"
                />
              ) : (
                <div className="h-12 w-12 rounded-full bg-gray-500 object-cover transition-transform duration-150 hover:scale-105 hover:shadow-md">
                  {session?.user?.name?.[0] ?? ""}
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

const MainHeader: React.FC = () => {
  return (
    <NextAuthProvider>
      <Header />
    </NextAuthProvider>
  );
};

export default MainHeader;
