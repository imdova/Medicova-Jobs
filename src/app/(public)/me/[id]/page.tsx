"use client";
import HeaderSection from "./Components/HeaderSection";
import AboutSeeker from "./Components/AboutSeeker";
import ExperienceSection from "./Components/ExperienceSection";
import EducationsSection from "./Components/EducationsSection";
import CoursesSection from "./Components/CoursesSection";
import SkillsSection from "./Components/SkillsSection";
import ActivitiesAchievementsSection from "./Components/ActivitiesAchievementsSection";
import CompleteProfile from "./Components/CompleteProfile";
import PublicProfile from "./Components/PublicProfile";
import Resume from "./Components/Resume";
import ContactInfoSection from "./Components/ContactInfoSection";
import SocialMediaSection from "./Components/SocialMediaSection";
import LanguageSection from "./Components/LanguageSection";
import { useSession } from "next-auth/react";
import { UserState } from "@/types";
import RightSection from "@/app/(auth)/employer/profile/Components/employer-RightSection";
import AboutCompany from "@/app/(auth)/employer/profile/Components/AboutCompany";
import JobCard from "@/app/(auth)/employer/profile/Components/JobCard";
import EmployerHeaderSection from "@/app/(auth)/employer/profile/Components/EmployerHeaderSection";

const ProfilePage = ({ params: { id } }: { params: { id: string } }) => {
  // const user = getUser(id);
  const { data: session, status } = useSession();
  const user = session?.user as UserState;
  const isMe = true;

  if (status === "loading") {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p> Loading...</p>
      </div>
    );
  }

  return user?.role === "seeker" ? (
    <SeekerPage isMe={isMe} />
  ) : user?.role === "employer" ? (
    <EmployerPage isMe={isMe} />
  ) : null;
};

export default ProfilePage;

const SeekerPage = ({ isMe }: { isMe: boolean }) => {
  return (
    <div className="w-full">
      <div className="flex gap-5">
        {/* Left + Center Sections */}
        <div>
          {/* Header Section */}
          <HeaderSection />
          {/* About Section */}
          <AboutSeeker />
          {/* Experience Section */}
          <ExperienceSection />
          {/* Education Section */}
          <EducationsSection />
          {/* Courses Section */}
          <CoursesSection />
          {/* Skills Section */}
          <SkillsSection />
          {/* Activities / Achievements Section */}
          <ActivitiesAchievementsSection />
        </div>
        {/* Right Sections */}
        <div className="hidden min-w-80 md:block">
          {/* Public Profile Section */}
          <CompleteProfile />
          {/* Public Profile Section */}
          <PublicProfile />
          {/* Resume Section */}
          <Resume />
          {/* Contact Info Section */}
          <ContactInfoSection />
          {/* Socialmedia Section */}
          <SocialMediaSection />
          {/* Language Section */}
          <LanguageSection />
        </div>
      </div>
    </div>
  );
};

const EmployerPage = ({ isMe }: { isMe: boolean }) => {
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
