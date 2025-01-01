import MainHeader from "@/components/Layout/Header/Main-header";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="bg-[url('/images/search-background.jpg')] bg-cover bg-center">
        <div className="bg-gradient-to-b from-light-primary-transparent to-primary-transparent p-4 shadow-md">
          <MainHeader />
          <div className="container mx-auto p-4 text-primary-foreground lg:max-w-[1170px]">
            <h2 className="text-[45px] font-black md:text-[60px]">
              <span className="text-[45px] font-black text-main md:text-[60px]">
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
