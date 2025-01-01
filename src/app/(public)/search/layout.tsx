import React, { Suspense } from "react";
import SearchForm from "@/components/UI/search-form";
import MainHeader from "@/components/Layout/Header/Main-header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="bg-[url('/images/search-background.jpg')] bg-cover bg-center">
        <div className="bg-gradient-to-b from-light-primary-transparent to-primary-transparent p-4 shadow-md">
          <MainHeader />
          <div className="container mx-auto p-4 lg:max-w-[1170px]">
            <h2 className="mb-6 text-[45px] font-black leading-none text-main md:text-[60px]">
              Find your{" "}
              <span className="text-[45px] font-black text-primary-foreground md:text-[60px]">
                dream job
              </span>
            </h2>
            <Suspense>
              <SearchForm />
            </Suspense>
            <p className="mt-4 text-primary-foreground">
              {" "}
              <span className="font-bold text-primary-foreground">
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
