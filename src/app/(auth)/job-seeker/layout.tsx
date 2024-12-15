import React from "react";
import Header from "@/components/Layout/Header/HeaderSeeker";
import SideBar from "@/components/Layout/SideBar/SideBar";
import {
  jobSeekerSideBarLinks,
} from "@/constants/side-bar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {/* Header */}
      <Header />
      <div style={{ display: "flex" }}>
        {/* Sidebar */}
        <SideBar links={jobSeekerSideBarLinks} />
        {/* Main Content */}
        <main className="flex-1 ml-0 md:ml-14 lg:ml-0 p-2">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
