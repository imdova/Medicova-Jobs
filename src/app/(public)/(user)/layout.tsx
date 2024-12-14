import { MenuIcon } from "@/components/icons/icons";
import { Box, Button, Container } from "@mui/material";
import Image from "next/image";

const layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      {/* Header */}
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Image
            src="/images/logo.png"
            width={100}
            height={100}
            alt="Company Logo"
            className="object-contain"
          />
        </Box>
      </Container>
      {children}
    </Box>
  );
};

export default layout;
