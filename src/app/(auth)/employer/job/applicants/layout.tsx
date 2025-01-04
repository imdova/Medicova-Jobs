import MainHeader from "@/components/Layout/Header/Main-header";
import VerticalTabs from "@/components/Layout/SideBar/vertical-tabs";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="bg-[url('/images/search-background.jpg')] bg-cover bg-center">
        <div className="bg-gradient-to-b from-light-primary-transparent to-primary-transparent px-4 shadow-md">
          <MainHeader headerType="employer" />
        </div>
      </div>

      <main>{children}</main>
    </div>
  );
};

export default Layout;
