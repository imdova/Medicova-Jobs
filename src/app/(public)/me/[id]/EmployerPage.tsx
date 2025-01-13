import CompleteProfile from "./Components/CompleteProfile";
import RightSection from "@/app/(auth)/employer/profile/Components/employer-RightSection";
import AboutCompany from "@/app/(auth)/employer/profile/Components/AboutCompany";
import JobCard from "@/app/(auth)/employer/profile/Components/JobCard";
import EmployerHeaderSection from "@/app/(auth)/employer/profile/Components/EmployerHeaderSection";
import { UserState } from "@/types";

const EmployerPage = ({ user, isMe }: { user: UserState, isMe: boolean }) => {
    return (
      <div className="w-full">
        <div className="flex gap-5">
          {/* Left + Center Sections */}
          <div>
            {/* Header Section */}
            <EmployerHeaderSection />
            {/* Left Section */}
            <AboutCompany />
            {/* Center Section + Profile Form */}
            <JobCard />
          </div>
          {/* Right Sections */}
          <div className="hidden max-w-80 md:block">
            {/* Public Profile Section */}
            <CompleteProfile />
            <RightSection />
            {/* Complete Profile Section */}
            {/* Public Profile Section */}
            {/* <PublicProfile /> */}
          </div>
        </div>
      </div>
    );
  };
export default EmployerPage; 