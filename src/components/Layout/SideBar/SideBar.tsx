"use client";
import ItemSelector from "@/components/UI/menu-item";
import { LinkType } from "@/types/side-bar";
import { Box, List } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState } from "react";
const SideBar: React.FC<{ links: LinkType[] }> = ({ links }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  return (
    <aside
      className={`${isOpen ? "hover:min-w-60 lg:min-w-60" : "lg:min-w-14"} bg-primary text-primary-foreground fixed left-0 top-[100px] z-40 h-[calc(100vh-100px)] w-14 translate-x-[-100%] overflow-hidden shadow-2xl duration-300 ease-in-out md:block md:translate-x-0 lg:sticky`}
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
      <Box className="scroll-bar-hidden max-h-[calc(100vh-100px)] w-60 overflow-y-auto overflow-x-hidden lg:mt-0 lg:max-h-[calc(100vh-140px)]">
        <List>
          {links.map((link, index) => (
            <ItemSelector
              key={index}
              link={link}
              isOpen={isOpen}
              collapseOnClick={open}
              onClick={close}
            />
          ))}
        </List>
      </Box>
    </aside>
  );
};

export default SideBar;
