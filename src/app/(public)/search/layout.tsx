import React, { Suspense } from "react";
import Header from "./header";
import SearchForm from "@/components/UI/search-form";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="bg-[url('/images/search-background.jpg')] bg-cover bg-center">
        <div className="bg-gradient-to-b from-[#82C341E5] to-[#2BA149E5] p-4 shadow-md">
          <Header />
          <div className="container mx-auto p-4 lg:max-w-[1170px]">
            <h2 className="mb-6 text-[45px] font-black leading-none text-white md:text-[60px]">
              <span className="text-[45px] font-black text-[#101828] md:text-[60px]">
                Find your
              </span>{" "}
              dream job
            </h2>
            <Suspense>
              <SearchForm />
            </Suspense>
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
