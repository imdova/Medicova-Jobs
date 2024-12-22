import React from "react";
import Header from "@/components/Layout/Header/Header";
import SideBar from "@/components/Layout/SideBar/SideBar";
import {
  employerSideBarLinks,
  jobSeekerSideBarLinks,
} from "@/constants/side-bar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {/* Header */}
      <Header />
      <div style={{ display: "flex" }}>
        {/* Sidebar */}
        <SideBar links={employerSideBarLinks} />
        {/* Main Content */}
        <main className="ml-0 flex-1 md:ml-14 lg:ml-0">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
