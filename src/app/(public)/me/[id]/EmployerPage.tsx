import CompleteProfile from "./Components/CompleteProfile";
import {
  EmployerSocialMedia,
  PostYourFirstJob,
} from "@/app/(auth)/employer/profile/Components/employer-RightSection";
import AboutCompany from "@/app/(auth)/employer/profile/Components/AboutCompany";
import EmployerHeaderSection from "@/app/(auth)/employer/profile/Components/EmployerHeaderSection";
import { UserState } from "@/types";
import { HeaderData } from "@/types/employer";
import { jobs } from "@/constants";
import CompanyJobs from "@/app/(auth)/employer/profile/Components/CompanyJobs";

const headerData: HeaderData = {
  title: "Modicova Medical Community",
  subtitle: "Healthcare: Medical Services and Education healthcare",
  address: "Egypt, Cairo",
  type: "Hospital",
  employees: "11-50",
  website: "https://modicova.com",
};
const about = `A healthcare company refers to any business or organization that
provides products or services related to the maintenance, improvement,
or management of health.`;
const EmployerPage = ({ user, isMe }: { user: UserState; isMe: boolean }) => {
  return (
    <div className="relative w-full">
      <div className="flex gap-5">
        {/* Left + Center Sections */}
        <div>
          {/* Header Section */}
          <EmployerHeaderSection isMe={isMe} data={headerData} />
          {/* Left Section */}
          <AboutCompany data={about} isMe={isMe} />
          {/* Center Section + Profile Form */}
          <CompanyJobs isMe={isMe} data={jobs} />
        </div>
        {/* Right Sections */}
        <div className="hidden min-w-80 max-w-80 md:block">
          {/* Public Profile Section */}
          {isMe && <CompleteProfile />}
          {isMe && <PostYourFirstJob />}
          <EmployerSocialMedia />
          {/* Complete Profile Section */}
          {/* Public Profile Section */}
          {/* <PublicProfile /> */}
        </div>
      </div>
    </div>
  );
};
export default EmployerPage;
