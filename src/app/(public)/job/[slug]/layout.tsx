import React from "react";
import Header from "../../search/header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="bg-[url('/images/search-background.jpg')] bg-cover bg-center">
        <div className="from-light-primary-transparent to-primary-transparent bg-gradient-to-b p-4 shadow-md">
          <Header />
          <div className="text-primary-foreground container mx-auto p-4 lg:max-w-[1170px]">
            <h2 className="text-[45px] font-black md:text-[60px]">
              <span className="text-main text-[45px] font-black md:text-[60px]">
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
