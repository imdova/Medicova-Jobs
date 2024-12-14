"use client";

import { Avatar, AvatarGroup, Box, Container } from "@mui/material";
import RegisterForm from "./RegisterForm";
import Image from "next/image";

const users = [
  {
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    image: "https://randomuser.me/api/portraits/men/88.jpg",
  },
  {
    image: "https://randomuser.me/api/portraits/men/41.jpg",
  },
  {
    image: "https://randomuser.me/api/portraits/men/64.jpg",
  },
  {
    image: "https://randomuser.me/api/portraits/men/24.jpg",
  },
];

const Register = () => {
  return (
    <Container className="flex justify-between gap-5">
      {/* Right Section: Register Form */}
      <RegisterForm />
      <Box
        sx={{
          backgroundColor: "#2EAE7D",
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          justifyContent: "space-between",
          flex: 1,
          minHeight: 500,
          margin: 2,
          position: "relative",
        }}
      >
        <div className="mt-8 ml-12">
          <h3>
            <span className="text-[42px] font-bold text-white mr-20">
              Find new pathways
            </span>
            <br />
            <span className="text-[42px] font-bold text-white mr-2">to</span>
            <span className=" text-[42px] font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#2EAE7D] via-[#134834] via-85% to-[#134834]">
              Healthcare Professionals
            </span>
            <br />
            <span className="text-[42px] font-bold text-white">“</span>
          </h3>
          <p className="text-2xl text-white leading-9 max-w-lg">
            “Search for healthcare professionals from more than 300000 CVs. Use
            35+ robust filters and shortlist candidates faster. Hire top talent
            faster and smarter. “
          </p>
        </div>
        <div className="bg-white relative ml-[8%] m-8 mb-24 max-w-[366px] p-6 pr-14">
          <div className="absolute w-16 h-16 top-0 right-0 bg-[#2EAE7D]"></div>
          <h4 className="text-2xl font-bold text-[#03353C] mb-2 ">
            Trusted by 12,000 organizations, including:
          </h4>
          <div className="flex items-center">
            <p className="flex-1 text-lg text-[#03353C]">
              Saudi German Hospital ,DAF Hospital Alsalam International Hospital
            </p>

            <AvatarGroup max={5}>
              {users.slice(0, 3).map((user, index) => (
                <Avatar
                  key={index}
                  alt={`Avatar n°${index + 1}`}
                  src={user.image}
                  sx={{
                    width: 30,
                    height: 30,
                  }}
                />
              ))}
              <Avatar
                sx={{
                  backgroundColor: "#03353C",
                  color: "white",
                  width: 30,
                  height: 30,
                }}
              >
                +{users.length - 3}
              </Avatar>
            </AvatarGroup>
          </div>
        </div>

        {/* Background */}
        <div className="absolute top-1/3 right-10 ">
          <Image
            src="/images/vector-2.svg"
            alt="background"
            width={300}
            height={155}
          />
        </div>
        <div className="absolute w-20 h-20 bottom-0 left-0 bg-white"></div>
        <div className="absolute w-20 h-20 top-0 right-0 bg-white"></div>
      </Box>
    </Container>
  );
};

export default Register;
