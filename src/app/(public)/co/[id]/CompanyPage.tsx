"use client";

import { Company, UserState } from "@/types";
import { useSession } from "next-auth/react";
import Loading from "@/components/loading/loading";
import EmployerHeaderSection from "./Components/EmployerHeaderSection";
import AboutCompany from "./Components/AboutCompany";
import CompanyJobs from "./Components/CompanyJobs";
import CompleteProfile from "../../me/[id]/Components/CompleteProfile";
import {
  EmployerSocialMedia,
  PostYourFirstJob,
} from "./Components/employer-RightSection";

const CompanyPage = ({ company }: { company: Company }) => {
  const { data: session, status } = useSession();
  const user = session?.user as UserState;
  const isEmployee = company.id === user?.companyId

  if (status === "loading") {
    return <Loading />;
  }
  return (
    <div className="relative w-full">
      <div className="flex gap-5">
        {/* Left + Center Sections */}
        <div className="flex-1">
          {/* Header Section */}
          <EmployerHeaderSection isEmployee={isEmployee} data={company} />
          {/* Left Section */}
          <AboutCompany company={company} isEmployee={isEmployee} />
          {/* Center Section + Profile Form */}
          <CompanyJobs isEmployee={isEmployee} company={company} />
        </div>
        {/* Right Sections */}
        <div className="hidden min-w-80 max-w-80 md:block">
          {/* Public Profile Section */}
          {isEmployee && (
            <CompleteProfile percentage={company?.completencePercent} />
          )}
          {isEmployee && <PostYourFirstJob company={company} />}
          <EmployerSocialMedia data={company} isEmployee={isEmployee} />
          {/* Complete Profile Section */}
          {/* Public Profile Section */}
          {/* <PublicProfile /> */}
        </div>
      </div>
    </div>
  );
};
export default CompanyPage;
