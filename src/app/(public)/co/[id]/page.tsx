import { getCompanyByUserName } from "@/lib/actions/employer.actions";
import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/config";
import EmployerHeaderSection from "./Components/EmployerHeaderSection";
import AboutCompany from "./Components/AboutCompany";
import CompanyJobs from "./Components/CompanyJobs";
import CompanyPublicLink from "./Components/company-publicLink";
import { Suspense } from "react";
import PostYourFirstJob from "./Components/postFirstJob";
import EmployerSocialMedia from "./Components/EmployerSocialMedia";
import EmployerComplete from "./Components/EmployerComplete";

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const data = await getServerSession(authOptions);
  const { success, data: company } = await getCompanyByUserName(id);
  if (!success || !company) return notFound();
  const user = data?.user;
  const isEmployee = company.id === user?.companyId;
  return (
    <div className="w-full px-4 md:px-5">
      <div className="flex gap-5">
        {/* Left + Center Sections */}
        <div className="flex-1 space-y-2">
          {/* Header Section */}
          <EmployerHeaderSection isEmployee={isEmployee} company={company} />
          {/* Left Section */}
          <AboutCompany company={company} isEmployee={isEmployee} />
          {/* Center Section + Profile Form */}
          <Suspense>
            <CompanyJobs isEmployee={isEmployee} company={company} />
          </Suspense>
        </div>
        {/* Right Sections */}
        <div className="hidden min-w-80 max-w-80 space-y-2 md:block">
          {/* Public Profile Section */}
          {isEmployee && (
            <EmployerComplete percentage={company?.completencePercent} />
          )}
          {isEmployee && <CompanyPublicLink company={company} />}
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

export default Page;
