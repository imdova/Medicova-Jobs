"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Box,
  Button,
  IconButton,
  Avatar,
  AppBar,
  Container,
  Toolbar,
  Drawer,
  List,
} from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import logo from "@/components/images/logo.svg";
import Image from "next/image";
import { HamburgerIcon } from "@/components/icons/icons";
import ItemSelector from "@/components/UI/menu-item";
import { employerSideBarLinks } from "@/constants/side-bar";
import LogoIcon from "@/components/icons/logo";
import { Close } from "@mui/icons-material";
import NotificationCard from "@/components/UI/NotificationCard";

const links = [
  {
    title: "Dashboard",
    link: "/employer/dashboard",
  },
  {
    title: "My Jobs",
    link: "/employer/job/manage-jobs",
  },
  {
    title: "CV Search",
    link: "/cv-search",
    disabled: true,
  },
  {
    title: "Report",
    link: "/report",
    disabled: true,
  },
  {
    title: "Billing",
    link: "/billing",
    disabled: true,
  },
];

type Notification = {
  id: number;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  timestamp: string;
};

const dummyNotifications: Notification[] = [
  {
    id: 1,
    title: "New Job Alert",
    message: "A new Nursing job has been posted in Los Angeles.",
    type: "info",
    timestamp: "2024-12-31 10:00 AM",
  },
  {
    id: 2,
    title: "Application Update",
    message: "Your application for Pediatrician has been shortlisted.",
    type: "success",
    timestamp: "2024-12-30 5:30 PM",
  },
  {
    id: 3,
    title: "Reminder",
    message: "Don't forget to update your profile for better matches.",
    type: "warning",
    timestamp: "2024-12-29 9:15 AM",
  },
  {
    id: 4,
    title: "Error",
    message: "Unable to fetch your job recommendations. Try again later.",
    type: "error",
    timestamp: "2024-12-28 7:45 PM",
  },
];

const Header = () => {
  const [isMenuOpen, setMenuOpen] = React.useState(false);
  const toggleMenu = () => setMenuOpen(!isMenuOpen);
  const close = () => setMenuOpen(false);

  const [isNotificationOpen, setNotificationOpen] = React.useState(false);
  const toggleNotification = () => setNotificationOpen(!isNotificationOpen);
  const closeNotification = () => setNotificationOpen(false);
  const pathname = usePathname(); // Get the current path

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#fff" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          {/* Mobile Menu */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              className="group"
              aria-haspopup="true"
              aria-expanded={isMenuOpen}
              onClick={toggleMenu}
            >
              <HamburgerIcon />
            </IconButton>
          </Box>
          {/* notification */}
          <Drawer
            anchor="right"
            open={isNotificationOpen}
            onClose={closeNotification} // Handles backdrop clicks automatically
          >
            <div className="h-full w-80 bg-white p-4 shadow-lg">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Notifications</h2>
                <IconButton onClick={closeNotification}>
                  <Close />
                </IconButton>
              </div>

              <div className="space-y-4">
                {dummyNotifications.map((notification) => (
                  <NotificationCard
                    key={notification.id}
                    notification={notification}
                  />
                ))}
              </div>
            </div>
          </Drawer>

          {/* mobile menu */}
          <Drawer
            anchor="left"
            open={isMenuOpen}
            onClose={close} // Handles backdrop clicks automatically
          >
            <Box className="h-full max-w-[600px] overflow-hidden bg-primary text-primary-foreground">
              <Box className="scroll-bar-hidden max-h-full overflow-y-auto py-5">
                <List>
                  {employerSideBarLinks.map((link, index) => (
                    <ItemSelector key={index} link={link} onClick={close} />
                  ))}
                </List>
              </Box>
            </Box>
          </Drawer>
          {/* Logo */}
          <div className="flex h-[100px] items-center justify-center">
            <Link href="/" className="my-2 flex items-center text-primary">
              <LogoIcon className="h-[50px] w-[40px]" />
              <div className="flex h-fit flex-col text-center">
                <h1 className="font-baiJamJuree text-[16px] font-bold leading-none">
                  MEDICOVA
                </h1>
                <p className="font-baiJamJuree text-[8px] font-medium">
                  MEDICAL COMMUNITY
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <Box
            sx={{
              flexGrow: 2,
              alignItems: "center",
              display: { xs: "none", md: "flex" },
            }}
          >
            {links.map((link) => {
              const href = `${link.link.toLowerCase().replace(" ", "-")}`;
              const currentPage = pathname.split("/").pop();
              const isActive = `/${currentPage}` === href;
              return (
                <Link
                  key={link.title}
                  href={href}
                  style={{
                    pointerEvents: link.disabled ? "none" : "auto",
                    cursor: link.disabled ? "none" : "pointer",
                    textDecoration: "none",
                    textTransform: "capitalize",
                  }}
                >
                  <Button
                    disabled={link.disabled}
                    sx={{
                      fontWeight: 600,
                      color: isActive ? "#185D43" : "#000",
                      textTransform: "capitalize",
                      cursor: "pointer",
                      "&:hover": {
                        color: "#185D43",
                      },

                      fontSize: { xs: "14px", sm: "14px" },
                    }}
                  >
                    {link.title}
                  </Button>
                </Link>
              );
            })}
          </Box>

          {/* Right Section */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Button
              variant="contained"
              sx={{
                marginRight: "16px",
                display: { xs: "none", md: "block" },
                fontWeight: "bold",
                fontSize: { xs: "12px", sm: "14px" },
                padding: { xs: "8px 16px", sm: "10px 10px" },
              }}
            >
              Add New Post
            </Button>
            <IconButton onClick={toggleNotification} className="relative">
              <div className="absolute right-3 top-3 h-2 w-2 rounded-full border border-white bg-red-500" />
              <NotificationsNoneIcon sx={{ color: "#515B6F" }} />
            </IconButton>
            <Link href="/profile" className="duration-300 hover:scale-105">
              <Avatar
                sx={{
                  display: { xs: "none", md: "flex" },
                  cursor: "pointer",
                }}
                alt="User Avatar"
                src="/images/company-avatar.jpg"
              />
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
