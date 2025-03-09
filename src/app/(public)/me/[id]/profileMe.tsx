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
import {  UserState } from "@/types";
import { useSession } from "next-auth/react";
import Loading from "@/components/loading/loading";

export default function ProfileMe({
  user,
}: {
  user: UserProfile;
}) {
  const { data: session, status } = useSession();
  const userSession = session?.user as UserState;
  const isMe = userSession?.id === user?.id;
  const isLocked = true;
  if (status === "loading") {
    return <Loading />;
  }

  return (
    <div className="w-full px-4 md:p-0">
      <div className="flex gap-5">
        {/* Left + Center Sections */}
        <div className="flex-1 space-y-2 md:space-y-5">
          {/* Header Section */}
          <HeaderSection user={user} isMe={isMe} />
          {/* About Section */}
          <AboutSeeker user={user} isMe={isMe} />
          {/* Experience Section */}
          <ExperienceSection user={user} isMe={isMe} />
          {/* Education Section */}
          <EducationsSection user={user} isMe={isMe} />
          {/* Courses Section */}
          <CoursesSection user={user} isMe={isMe} />
          {/* Skills Section */}
          <SkillsSection user={user} isMe={isMe} />
          {/* Activities / Achievements Section */}
          <ActivitiesAchievementsSection user={user} isMe={isMe} />
        </div>
        {/* Right Sections */}
        <div className="hidden min-w-80 max-w-80 md:block">
          {/* Public Profile Section */}
          {isMe && (
            <>
              <CompleteProfile percentage={20} />
              {/* Public Profile Section */}
              <PublicProfile />
            </>
          )}
          {/* Resume Section */}
          <Resume isMe={isMe} user={user} isLocked={isLocked} />
          {/* Contact Info Section */}
          <ContactInfoSection isMe={isMe} user={user} isLocked={isLocked} />
          {/* Socialmedia Section */}
          <SocialMediaSection isMe={isMe} user={user} isLocked={isLocked} />
          {/* Language Section */}
          <LanguageSection isMe={isMe} user={user} />
        </div>
      </div>
    </div>
  );
}
