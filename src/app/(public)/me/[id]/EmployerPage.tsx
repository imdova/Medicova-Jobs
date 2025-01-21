"use client";
import CompleteProfile from "./Components/CompleteProfile";
import {
  EmployerSocialMedia,
  PostYourFirstJob,
} from "@/app/(auth)/employer/profile/Components/employer-RightSection";
import AboutCompany from "@/app/(auth)/employer/profile/Components/AboutCompany";
import EmployerHeaderSection from "@/app/(auth)/employer/profile/Components/EmployerHeaderSection";
import { Company, UserState } from "@/types";
import CompanyJobs from "@/app/(auth)/employer/profile/Components/CompanyJobs";
import { getCompanyById } from "@/lib/actions/employer.actions";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const EmployerPage = ({ user, isMe }: { user: UserState; isMe: boolean }) => {
  const [company, setCompany] = useState<Company | null>(null);

  const initCompany = async (id: string) => {
    const result = await getCompanyById(id);
    if (result.success && result.data) {
      setCompany(result.data);
    } else {
      redirect("/employer/company-info");
    }
  };

  useEffect(() => {
    if (user?.companyId && !company) {
      initCompany(user?.companyId);
    } else if (!user?.companyId) {
      redirect("/employer/company-info");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    company && (
      <div className="relative w-full">
        <div className="flex gap-5">
          {/* Left + Center Sections */}
          <div className="flex-1">
            {/* Header Section */}
            <EmployerHeaderSection isMe={isMe} data={company} />
            {/* Left Section */}
            <AboutCompany data={company.about} isMe={isMe} />
            {/* Center Section + Profile Form */}
            <CompanyJobs isMe={isMe} company={company} />
          </div>
          {/* Right Sections */}
          <div className="hidden min-w-80 max-w-80 md:block">
            {/* Public Profile Section */}
            {isMe && (
              <CompleteProfile percentage={company?.completencePercent} />
            )}
            {isMe && <PostYourFirstJob />}
            <EmployerSocialMedia data={company.socialLinks} />
            {/* Complete Profile Section */}
            {/* Public Profile Section */}
            {/* <PublicProfile /> */}
          </div>
        </div>
      </div>
    )
  );
};
export default EmployerPage;
