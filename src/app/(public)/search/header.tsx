"use client";
import LogoIcon from "@/components/icons/logo";
import ItemSelector from "@/components/UI/menu-item";
import { jobSeekerSideBarLinks } from "@/constants/side-bar";
import { Drawer, List } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const close = () => setIsMenuOpen(false);
  const open = () => setIsMenuOpen(true);
  return (
    <header>
      <div className="container mx-auto flex h-[100px] items-center justify-between gap-12 lg:max-w-[1170px]">
        {/* Logo and Brand Name */}
        <Link href="/" className="text-primary-foreground flex items-end">
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
          <div className="bg-primary text-primary-foreground h-full max-w-[600px] overflow-hidden">
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
          className="text-primary-foreground hidden flex-1 uppercase md:flex"
          aria-label="Main navigation"
        >
          <ul className="flex md:gap-4 lg:gap-12">
            <li>
              <Link
                href="#"
                className="hover:text-primary focus:text-primary text-[16px] font-semibold focus:outline-none"
              >
                Jobs
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-primary focus:text-primary text-[16px] font-semibold focus:outline-none"
              >
                Boost
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-primary focus:text-primary text-[16px] font-semibold focus:outline-none"
              >
                Prep
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-primary focus:text-primary text-[16px] font-semibold focus:outline-none"
              >
                Learn
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-primary focus:text-primary text-[16px] font-semibold focus:outline-none"
              >
                Career Advice
              </Link>
            </li>
          </ul>
        </nav>

        {/* Actions */}
        <div className="hidden gap-3 md:flex">
          <Link
            href="/register"
            className="hover:text-primary text-primary-foreground hover:bg-primary-foreground focus:ring-primary-foreground rounded-[10px] px-4 py-2 font-semibold uppercase transition-colors duration-300 focus:ring-2"
          >
            Sign Up
          </Link>
          <Link
            href="/login"
            className="bg-primary hover:text-primary text-primary-foreground hover:bg-primary-foreground focus:ring-primary-foreground rounded-[10px] px-4 py-2 font-semibold uppercase transition-colors duration-300 focus:ring-2"
          >
            Login
          </Link>
        </div>

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

export default Header;
