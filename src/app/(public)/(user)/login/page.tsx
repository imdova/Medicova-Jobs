import { Box, Typography, Container } from "@mui/material";
import cover from "@/components/images/login.svg";
import network from "@/components/images/network.svg";
import Image from "next/image";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <Box className="min-h-[calc(100vh-100px)] px-5 w-full flex justify-center items-center flex-col">
      {/* Main Content */}
      <Container
        sx={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        {/* Left Section: Photo */}
        <Box className="hidden md:flex flex-col justify-center items-center relative flex-1 px-2">
          {/* Main Background Image */}
          <Image
            src={cover}
            alt="Login Cover"
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
            priority={true}
          />

          {/* Overlaid Text */}
          <Typography
            sx={{
              position: "absolute",
              top: "18%",
              left: "20%",
              transform: "translate(-50%, -50%)",
              color: "#000",
              background: "rgba(242, 242, 242,0.7)",
              padding: "10px 20px",
              borderRadius: "8px",
              fontSize: { xs: "16px", md: "20px" },
              fontWeight: "700",
              textAlign: "center",
              width: { xs: "90%", sm: "250px" },
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            Reach more than 100K+
            <Typography
              component="span"
              sx={{
                display: "block", // Ensures it appears on a new line
                color: "#03353C",
                marginTop: "5px", // Optional spacing
              }}
            >
              Healthcare Professional
            </Typography>
          </Typography>

          {/* Overlaid Text */}
          <Typography
            sx={{
              position: "absolute",
              bottom: "0%",
              right: "0",
              transform: "translate(-10%, -20%)",
              color: "#000",
              background: "rgba(242, 242, 242,0.7)",
              padding: "10px 20px",
              borderRadius: "8px",
              fontSize: { xs: "16px", md: "16px" },
              fontWeight: "600",
              textAlign: "center",
              width: { xs: "90%", sm: "250px" },
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            “Great platform for the Healthcare Employers to find experienced
            healthcare Professionals“
          </Typography>

          {/* Additional Image */}
          <Box
            sx={{
              position: "absolute",
              top: "0", // Adjust positioning relative to the parent Box
              left: "10%", // Adjust positioning relative to the parent Box
            }}
          >
            <Image
              src={network}
              alt="Additional Image"
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </Box>
        </Box>

        {/* Right Section: Login Form */}
        <LoginForm />
      </Container>
    </Box>
  );
};

export default Login;
