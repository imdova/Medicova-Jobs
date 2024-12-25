import React from "react";
import Header from "./header";
import { LocationOnOutlined, Search } from "@mui/icons-material";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="bg-[url('/images/search-background.jpg')] bg-cover bg-center">
        <div className="bg-gradient-to-b from-[#82C341E5] to-[#2BA149E5] p-4 shadow-md">
          <Header />
          <div className="container mx-auto p-4 lg:max-w-[1170px]">
            <h2 className="text-[45px] font-bold text-white md:text-[60px]">
              <span className="text-[45px] font-bold text-black md:text-[60px]">
                Find your
              </span>{" "}
              dream job
            </h2>
            <form className="flex flex-col gap-2 rounded-[20px] bg-white p-[10px] md:h-[70px] md:flex-row">
              <div className="flex flex-1 items-center gap-2 px-2">
                <Search className="h-8 w-8 text-green-400" />
                <input
                  type="text"
                  placeholder="Job title or keyword"
                  className="h-[50px] w-full border-b border-gray-300 bg-transparent focus:border-green-400 focus:outline-none md:h-full"
                />
              </div>
              <div className="flex flex-1 items-center gap-2 px-2">
                <LocationOnOutlined className="h-8 w-8 text-green-400" />
                <select className="h-[50px] w-full border-b border-gray-300 bg-transparent focus:border-green-400 focus:outline-none md:h-full">
                  <option value="">Select country</option>
                  <option value="us">United States</option>
                  <option value="ca">Canada</option>
                  <option value="uk">United Kingdom</option>
                  <option value="au">Australia</option>
                  <option value="in">India</option>
                </select>
              </div>
              <button className="h-[50px] text-nowrap rounded-[10px] bg-[#2BA149] px-4 py-2 font-semibold text-white transition-colors duration-300 hover:bg-white hover:text-[#2BA149] focus:ring-2 focus:ring-white md:h-full">
                Search my job
              </button>
            </form>
            <p className="mt-4 text-gray-100">
              {" "}
              <span className="font-bold text-white">Popular</span> : Medical
              Claims Officer,Dental Designer, Healthcare- Presales specialist,
              Medical Ambassador
            </p>
          </div>
        </div>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
