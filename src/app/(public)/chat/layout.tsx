import MainHeader from "@/components/Layout/Header/Main-header";
import VerticalTabs from "@/components/Layout/SideBar/vertical-tabs";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="bg-[url('/images/search-background.jpg')] bg-cover bg-center">
        <div className="bg-gradient-to-b from-light-primary-transparent to-primary-transparent px-4 shadow-md">
          <MainHeader />
        </div>
      </div>
      <div className="container mx-auto my-8 flex min-h-screen w-full flex-row p-2 lg:max-w-[1300px]">
        <div className="hidden w-1/5 rounded-base border border-gray-100 bg-white py-4 shadow-xl lg:block">
          <div className="sticky top-4">
            <VerticalTabs />
          </div>
        </div>
        <main className="w-full px-2 md:px-6 lg:w-[80%]">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
