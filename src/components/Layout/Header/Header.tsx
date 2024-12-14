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
import { sideBarLinks } from "@/constants/side-bar";

const links = [
  {
    title: "Dashboard",
    link: "/dashboard",
  },
  {
    title: "My Jobs",
    link: "/job/manage-jobs",
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
const Header = () => {
  const [isMenuOpen, setMenuOpen] = React.useState(false);
  const toggleMenu = () => setMenuOpen(!isMenuOpen);
  const close = () => setMenuOpen(false);
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

          <Drawer
            anchor="left"
            open={isMenuOpen}
            onClose={close} // Handles backdrop clicks automatically
          >
            <Box className=" h-full bg-[#f7f7fd] overflow-hidden max-w-[600px] text-[#7C8493CC]">
              <Box className=" overflow-y-auto py-5 max-h-full scroll-bar-hidden">
                <List>
                  {sideBarLinks.map((link, index) => (
                    <ItemSelector key={index} link={link} onClick={close} />
                  ))}
                </List>
              </Box>
            </Box>
          </Drawer>
          {/* Logo */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: { xs: "100%", sm: "auto" },
            }}
          >
            <Image
              src={logo}
              alt="Company Logo"
              style={{
                height: "100px",
                width: "150px",
                marginRight: "8px",
              }}
            />
          </Box>

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
            <IconButton className="relative">
              <div className="absolute right-3 top-3 h-2 w-2 rounded-full border border-white bg-red-500" />
              <NotificationsNoneIcon sx={{ color: "#515B6F" }} />
            </IconButton>
            <Link href="/profile" className="hover:scale-105 duration-300">
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
