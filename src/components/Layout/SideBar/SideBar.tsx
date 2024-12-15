"use client";
import ItemSelector from "@/components/UI/menu-item";
import { LinkType } from "@/types/side-bar";
import { Box, List } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState } from "react";
const SideBar: React.FC<{ links: LinkType[] }> = ({ links }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <Box
      className={`${isOpen ? "hover:min-w-60 lg:min-w-60" : "lg:min-w-14"} fixed left-0 top-[100px] z-40 h-[calc(100vh-100px)] w-14 translate-x-[-100%] overflow-hidden bg-[#f7f7fd] text-[#7C8493CC] shadow-2xl duration-300 ease-in-out md:block md:translate-x-0 lg:sticky`}
    >
      <div className="hidden w-full justify-end pr-3 pt-5 lg:flex">
        <button
          onClick={toggle}
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
          className="rounded-full duration-200"
        >
          <ArrowForwardIosIcon />
        </button>
      </div>
      <Box className="scroll-bar-hidden max-h-[calc(100vh-100px)] w-60 overflow-y-auto overflow-x-hidden lg:mt-0">
        <List>
          {links.map((link, index) => (
            <ItemSelector key={index} link={link} />
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default SideBar;
