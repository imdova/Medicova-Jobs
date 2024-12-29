import React, { Suspense } from "react";
import Header from "./header";
import SearchForm from "@/components/UI/search-form";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="bg-[url('/images/search-background.jpg')] bg-cover bg-center">
        <div className="from-light-primary-transparent to-primary-transparent bg-gradient-to-b p-4 shadow-md">
          <Header />
          <div className="container mx-auto p-4 lg:max-w-[1170px]">
            <h2 className="text-main mb-6 text-[45px] font-black leading-none md:text-[60px]">
              Find your{" "}
              <span className="text-primary-foreground text-[45px] font-black md:text-[60px]">
                dream job
              </span>
            </h2>
            <Suspense>
              <SearchForm />
            </Suspense>
            <p className="text-primary-foreground mt-4">
              {" "}
              <span className="text-primary-foreground font-bold">
                Popular
              </span>{" "}
              : Medical Claims Officer,Dental Designer, Healthcare- Presales
              specialist, Medical Ambassador
            </p>
          </div>
        </div>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
