import { Divider, Typography } from "@mui/material";
import { LinkType } from "@/types/side-bar";
import LinkItem from "./LinkItem";
import CollapseIem from "./CollapseIem";

const ItemSelector: React.FC<{
  link: LinkType;
  onClick?: () => void;
}> = ({ link, onClick }) => {
  switch (link.kind) {
    case "divider":
      return <Divider sx={{ my: 2 }} />;
    case "title":
      return (
        <Typography
          className="ml-2 text-[#9E9E9E] font-medium"
          variant="caption"
        >
          SETTINGS
        </Typography>
      );
    case "collapse":
      return <CollapseIem onClick={onClick} {...link} />;
    default:
      return <LinkItem onClick={onClick} {...link} />;
  }
};

export default ItemSelector;
