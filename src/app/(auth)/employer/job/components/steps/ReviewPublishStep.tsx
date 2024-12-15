import React from "react";
import { Box, Button, Chip, Typography } from "@mui/material";
import Image from "next/image";
import CreateIcon from "@mui/icons-material/Create";
import ShareIcon from "@mui/icons-material/Share";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import StarsOutlinedIcon from "@mui/icons-material/StarsOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import ShareMenu from "@/components/UI/ShareMenu";

const ReviewPublishStep: React.FC = () => (
  <Box>
    <div className="bg-white border-[#D6DDEB] border">
      <div className="flex items-center gap-4 p-4">
        <Image
          src="https://randomuser.me/api/portraits/men/1.jpg"
          alt="profile"
          width={60}
          height={60}
          className="rounded-xl object-cover"
        />
        <h3 className="text-xl font-bold text-black/80">
          Saudi German Hospital
        </h3>
      </div>
      <div className="flex mx-14 mb-4 justify-between flex-wrap">
        <div>
          <div className="flex items-center gap-8">
            <h4 className="text-3xl text-[#185D43]">
              Safety Specialist, Health & Safety
            </h4>
            <button
              type="button"
              className=" border w-10 text-[#6A727A] h-10 border-[#D6DDEB] hover:text-[#185D43] hover:border-[#185D43]"
            >
              <CreateIcon className=" m-2" />
            </button>
          </div>
          <div className="flex items-center gap-1 md:gap-4 lg:gap-8 my-4 text-black/50 flex-wrap">
            <div>
              <span className="inline-block w-2 h-2 bg-yellow-500 rounded-full ring-1 ring-yellow-500  mr-3"></span>
              <p className="inline-block">Male and Female</p>
            </div>
            <div>
              <span className="inline-block w-2 h-2 bg-yellow-500 rounded-full ring-1 ring-yellow-500  mr-3"></span>
              <p className="inline-block">Consultant</p>
            </div>
            <div>
              <span className="inline-block w-2 h-2 bg-yellow-500 rounded-full ring-1 ring-yellow-500  mr-3"></span>
              <p className="inline-block">Cardiology</p>
            </div>
            <div>
              <span className="inline-block w-2 h-2 bg-yellow-500 rounded-full ring-1 ring-yellow-500  mr-3"></span>
              <p className="inline-block">5 Vaccancies</p>
            </div>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-4 mb-2 flex-wrap">
            <Chip
              sx={{ color: "#185D43" }}
              label="Healthcare"
              variant="outlined"
            />
            <Chip
              sx={{ color: "#185D43" }}
              label="Doctors"
              variant="outlined"
            />
            <Chip
              sx={{ color: "#185D43" }}
              avatar={
                <Image
                  src="/images/flag-egypt.jpg"
                  alt="egypt flag"
                  width={20}
                  height={20}
                  className="mr-2 object-contain"
                />
              }
              label="Egypt"
              variant="outlined"
            />
          </div>
        </div>
        <div className="flex h-fit">
          <ShareMenu link="https://google.com" className="mx-2" />
          <Button variant="contained" className="px-10">
            Easy Apply
          </Button>
        </div>
      </div>
    </div>

    <div className="flex sm:gap-8 sm:flex-row flex-col mt-10">
      <div className="flex-1">
        <div>
          <div className="flex justify-between items-center mb-2">
            <Typography variant="h3">Job Description</Typography>
            <button
              type="button"
              className=" border w-10 text-[#6A727A] h-10 border-[#D6DDEB] hover:text-[#185D43] hover:border-[#185D43]"
            >
              <CreateIcon className=" m-2" />
            </button>
          </div>
          <p className="text-[#515B6F]">
            Stripe is looking for Social Media Marketing expert to help manage
            our online networks. You will be responsible for monitoring our
            social media channels, creating content, finding effective ways to
            engage the community and incentivize others to engage on our
            channels.Stripe is looking for Social Media Marketing expert to help
            manage our online networks. You will be responsible for monitoring
            our social media channels, creating content, finding effective ways
            to engage the community and incentivize others to engage on our
            channels.
          </p>
        </div>
        <div className="my-10 ">
          <Typography variant="h3" className="mb-2">
            Job Requirements
          </Typography>
          <ul className="text-[#515B6F] font-semibold">
            <li>
              <CheckCircleOutlineIcon className="text-[#185D43] mr-2 mb-2" />
              You get energy from people and building the ideal work environment
            </li>
            <li>
              <CheckCircleOutlineIcon className="text-[#185D43] mr-2 mb-2" />
              You have a sense for beautiful spaces and office experiences
            </li>
            <li>
              <CheckCircleOutlineIcon className="text-[#185D43] mr-2 mb-2" />
              You are a confident office manager, ready for added
              responsibilities
            </li>
            <li>
              <CheckCircleOutlineIcon className="text-[#185D43] mr-2 mb-2" />
              You&apos;re detail-oriented and creative
            </li>
            <li>
              <CheckCircleOutlineIcon className="text-[#185D43] mr-2 mb-2" />
              You&apos;re a growth marketer and know how to run campaigns
            </li>
            <li>
              <CheckCircleOutlineIcon className="text-[#185D43] mr-2 mb-2" />
              You&apos;re a growth marketer and know how to run campaigns
            </li>
            <li>
              <CheckCircleOutlineIcon className="text-[#185D43] mr-2 mb-2" />
              You get energy from people and building the ideal work environment
            </li>
            <li>
              <CheckCircleOutlineIcon className="text-[#185D43] mr-2 mb-2" />
              You&apos;re a growth marketer and know how to run campaigns
            </li>
          </ul>
        </div>
        <div className="my-10 ">
          <Typography variant="h3" className="mb-2">
            Additional Details
          </Typography>
          <textarea
            className="rounded-md bg-white w-full border  border-[#2EAE7D80] shadow-md p-4 focus:border-[#2EAE7D] focus:ring-[#2EAE7D] focus:outline-none"
            rows={5}
            placeholder=" Stripe is looking for Social Media Marketing expert to help manage our
        online networks. You will be responsible for monitoring our social media
        channels, creating content, finding effective ways"
          ></textarea>
        </div>
        <div className="my-10 bg-white border border-[#D6DDEB] p-4">
          <Typography variant="h3" className="mb-2">
            Skills related to the job post
          </Typography>

          <div className="flex flex-wrap gap-2 text-[#2EAE7D]">
            <div className="p-2 border border-[#2EAE7D]">
              <span>Healthcare</span>
              <button type="button" className="text-red-500 inline mx-2">
                X
              </button>
            </div>
            <div className="p-2 border border-[#2EAE7D]">
              <span> Medical Services </span>
              <button type="button" className="text-red-500 inline mx-2">
                X
              </button>
            </div>
            <div className="p-2 border border-[#2EAE7D]">
              <span> Education healthcare </span>
              <button type="button" className="text-red-500 inline mx-2">
                X
              </button>
            </div>
            <div className="p-2 border border-[#2EAE7D]">
              <span>Healthcare</span>
              <button type="button" className="text-red-500 inline mx-2">
                X
              </button>
            </div>
            <div className="p-2 border border-[#2EAE7D]">
              <span> Medical Services </span>
              <button type="button" className="text-red-500 inline mx-2">
                X
              </button>
            </div>
            <div className="p-2 border border-[#2EAE7D]">
              <span> Education healthcare </span>
              <button type="button" className="text-red-500 inline mx-2">
                X
              </button>
            </div>
          </div>
        </div>
        <div className="my-10 bg-white border border-[#D6DDEB] p-4">
          <Typography variant="h3" className="mb-2">
            Keywords
          </Typography>

          <div className="flex flex-wrap gap-2 text-[#2EAE7D]">
            <div className="p-2 border border-[#2EAE7D]">
              <span>Healthcare</span>
              <button type="button" className="text-red-500 inline mx-2">
                X
              </button>
            </div>
            <div className="p-2 border border-[#2EAE7D]">
              <span> Medical Services </span>
              <button type="button" className="text-red-500 inline mx-2">
                X
              </button>
            </div>
            <div className="p-2 border border-[#2EAE7D]">
              <span> Education healthcare </span>
              <button type="button" className="text-red-500 inline mx-2">
                X
              </button>
            </div>
            <div className="p-2 border border-[#2EAE7D]">
              <span>Healthcare</span>
              <button type="button" className="text-red-500 inline mx-2">
                X
              </button>
            </div>
            <div className="p-2 border border-[#2EAE7D]">
              <span> Medical Services </span>
              <button type="button" className="text-red-500 inline mx-2">
                X
              </button>
            </div>
            <div className="p-2 border border-[#2EAE7D]">
              <span> Education healthcare </span>
              <button type="button" className="text-red-500 inline mx-2">
                X
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full sm:w-60  rounded-3xl h-fit bg-[#EBF5F4] p-4">
        <h4 className="font-semibold text-lg mb-4">Job Overview</h4>
        <div className="flex flex-col gap-2">
          <div className="flex gap-3 items-center">
            <PersonOutlineOutlinedIcon
              fontSize="medium"
              sx={{ color: "#2EAE7D" }}
            />
            <div className="flex flex-col">
              <h5 className="font-semibold"> Career Level </h5>
              <p className="text-black/50"> Consultant </p>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <AccessTimeOutlinedIcon
              fontSize="medium"
              sx={{ color: "#2EAE7D" }}
            />
            <div className="flex flex-col">
              <h5 className="font-semibold"> Job Type </h5>
              <p className="text-black/50"> Full Time Onsite </p>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <WorkOutlineOutlinedIcon
              fontSize="medium"
              sx={{ color: "#2EAE7D" }}
            />
            <div className="flex flex-col">
              <h5 className="font-semibold"> Category </h5>
              <p className="text-black/50"> Doctors </p>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <StarsOutlinedIcon fontSize="medium" sx={{ color: "#2EAE7D" }} />
            <div className="flex flex-col">
              <h5 className="font-semibold"> Experience </h5>
              <p className="text-black/50"> (3-5) Years </p>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <SchoolOutlinedIcon fontSize="medium" sx={{ color: "#2EAE7D" }} />
            <div className="flex flex-col">
              <h5 className="font-semibold"> Degree </h5>
              <p className="text-black/50"> Master’s Degree </p>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <AccountBalanceWalletOutlinedIcon
              fontSize="medium"
              sx={{ color: "#2EAE7D" }}
            />
            <div className="flex flex-col">
              <h5 className="font-semibold"> Required Age </h5>
              <p className="text-black/50"> (45-50) Years </p>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <PaidOutlinedIcon fontSize="medium" sx={{ color: "#2EAE7D" }} />
            <div className="flex flex-col">
              <h5 className="font-semibold"> Offered Salary </h5>
              <p className="text-black/50"> $40000-$42000 </p>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <FmdGoodOutlinedIcon fontSize="medium" sx={{ color: "#2EAE7D" }} />
            <div className="flex flex-col">
              <h5 className="font-semibold"> Location </h5>
              <p className="text-black/50"> Geddah, Saudi Arabia </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Box>
);

export default ReviewPublishStep;
