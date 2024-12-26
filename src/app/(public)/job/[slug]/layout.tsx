import React from "react";
import Header from "../../search/header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="bg-[url('/images/search-background.jpg')] bg-cover bg-center">
        <div className="bg-gradient-to-b from-[#82C341E5] to-[#2BA149E5] p-4 shadow-md">
          <Header />
          <div className="container mx-auto p-4 text-white lg:max-w-[1170px]">
            <h2 className="text-[45px] font-black text-white md:text-[60px]">
              <span className="text-[45px] font-black text-black md:text-[60px]">
                Job
              </span>{" "}
              Details
            </h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&apos;s standard dummy
            </p>
          </div>
        </div>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
