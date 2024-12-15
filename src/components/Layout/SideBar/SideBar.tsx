import ItemSelector from "@/components/UI/menu-item";
import { LinkType } from "@/types/side-bar";
import { Box, List } from "@mui/material";

const SideBar: React.FC<{ links: LinkType[] }> = ({ links }) => {
  return (
    <Box className="fixed top-[100px] left-0 translate-x-[-100%] md:translate-x-0 z-40 h-[calc(100vh-100px)] bg-[#f7f7fd] overflow-hidden w-14 text-[#7C8493CC] duration-300 ease-in-out hover:w-60 md:block lg:sticky lg:w-60 shadow-2xl">
      <Box className="lg:mt-0 w-60 overflow-y-auto max-h-[calc(100vh-100px)] overflow-x-hidden pt-5 scroll-bar-hidden">
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
