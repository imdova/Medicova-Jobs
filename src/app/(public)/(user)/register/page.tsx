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
      <div className="from-light-primary to-primary relative m-2 hidden min-h-[500px] flex-1 flex-col justify-between bg-gradient-to-b md:flex">
        <div className="ml-12 mt-8">
          <h3>
            <span className="text-primary-foreground mr-20 text-[42px] font-bold">
              Find new pathways
            </span>
            <br />
            <span className="text-primary-foreground mr-2 text-[42px] font-bold">
              to
            </span>
            <span className="text-main text-[42px] font-bold">
              Healthcare Professionals
            </span>
            <br />
            <span className="text-primary-foreground text-[42px] font-bold">
              “
            </span>
          </h3>
          <p className="text-primary-foreground max-w-lg text-2xl leading-9">
            “Search for healthcare professionals from more than 300000 CVs. Use
            35+ robust filters and shortlist candidates faster. Hire top talent
            faster and smarter. “
          </p>
        </div>
        <div className="m-8 mb-24 ml-[8%] max-w-[366px] bg-white p-6 pr-14">
          <h4 className="text-main mb-2 text-2xl font-bold">
            Trusted by 12,000 organizations, including:
          </h4>
          <div className="flex items-center">
            <p className="text-secondary flex-1 text-lg">
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
        <div className="absolute right-10 top-1/3">
          <Image
            src="/images/vector-2.svg"
            alt="background"
            width={300}
            height={155}
          />
        </div>
        <div className="absolute bottom-0 left-0 h-20 w-20 bg-white"></div>
        <div className="absolute right-0 top-0 h-20 w-20 bg-white"></div>
      </div>
    </Container>
  );
};

export default Register;
