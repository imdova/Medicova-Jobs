import Link from "next/link";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { icons } from "@/constants/side-bar";
import { LinkType } from "@/types/side-bar";

const LinkItem: React.FC<LinkType & { onClick?: () => void }> = ({
  title,
  url,
  icon,
  onClick,
}) => {
  const Icon = icon ? icons[icon] : null;
  return (
    <ListItem disablePadding>
      <ListItemButton
        sx={{
          "&:hover": {
            backgroundColor: "rgba(222, 240, 235, 1)", // Background color on hover
          },
        }}
        component={Link}
        disabled={!url}
        href={url || "#"}
        onClick={onClick}
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
      </ListItemButton>
    </ListItem>
  );
};

export default LinkItem;
