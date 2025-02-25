import { getCompanyByUserName } from "@/lib/actions/employer.actions";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/config";
import EmployerHeaderSection from "./Components/EmployerHeaderSection";
import AboutCompany from "./Components/AboutCompany";
import CompanyJobs from "./Components/CompanyJobs";
import CompleteProfile from "../../me/[id]/Components/CompleteProfile";
import { EmployerSocialMedia, PostYourFirstJob } from "./Components/employer-RightSection";
import CompanyPublicLink from "./Components/company-publicLink";

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const data = await getServerSession(authOptions);
  const { success, data: company } = await getCompanyByUserName(id);
  if (!success || !company) return redirect("/employer/company-info");
  const user = data?.user
  const isEmployee = company.id === user?.companyId
  return <div className="relative w-full">
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
        {isEmployee && <CompanyPublicLink company={company} />}
        {isEmployee && <PostYourFirstJob company={company} />}
        <EmployerSocialMedia data={company} isEmployee={isEmployee} />
        {/* Complete Profile Section */}
        {/* Public Profile Section */}
        {/* <PublicProfile /> */}
      </div>
    </div>
  </div>;
};

export default Page;
