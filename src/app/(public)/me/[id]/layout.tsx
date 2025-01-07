import MainHeader from "@/components/Layout/Header/Main-header";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="bg-white px-4 shadow-md">
        <MainHeader />
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
