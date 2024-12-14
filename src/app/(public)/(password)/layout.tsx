import Header from "@/components/Header/Header";
import { Box } from "@mui/material";

const layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      {/* Header */}
      <Header />
      {children}
    </Box>
  );
};

export default layout;
