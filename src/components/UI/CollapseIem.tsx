"use client";
import Link from "next/link";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { icons } from "@/constants/side-bar";
import { LinkType } from "@/types/side-bar";
const CollapseIem: React.FC<LinkType & { onClick?: () => void }> = ({
  title,
  links,
  icon,
  onClick,
}) => {
  const Icon = icon ? icons[icon] : null;
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <div>
      <ListItem disablePadding>
        <ListItemButton
          sx={{
            "&:hover": {
              backgroundColor: "rgba(222, 240, 235, 1)", // Background color on hover
            },
          }}
          onClick={toggle}
        >
          {Icon && (
            <ListItemIcon>
              {" "}
              <Icon sx={{ color: "#7C8493CC", fontSize: "20px" }} />
            </ListItemIcon>
          )}
          <ListItemText
            primaryTypographyProps={{
              sx: { fontSize: "14px", fontWeight: "bold" },
            }}
            primary={title}
          />
          {isOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {links &&
            links.length > 0 &&
            links.map((link, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton
                  component={Link}
                  disabled={!link.url}
                  href={link.url || "#"}
                  onClick={() => {
                    onClick && onClick();
                    setIsOpen(false);
                  }}
                  sx={{
                    pl: 7,
                    "&:hover": {
                      backgroundColor: "rgba(222, 240, 235, 1)", // Background color on hover
                    },
                  }}
                >
                  <ListItemText primary={link.title} />
                </ListItemButton>
              </ListItem>
            ))}
        </List>
      </Collapse>
    </div>
  );
};

export default CollapseIem;
