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
import { getUser } from "@/lib/actions/users.actions";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/config";
import { checkIsUnlocked } from "@/lib/actions/employer.actions";

const ProfilePage = async ({ params: { id } }: { params: { id: string } }) => {
  const data = await getServerSession(authOptions);
  const { success, data: profile } = await getUser(id);
  if (!success || !profile) return notFound();
  const user = data?.user;
  const isMe = user?.id === profile.id;
  let isLocked = !isMe;
  if (!isMe && user?.type === "employer" && user?.companyId) {
    const { data } = await checkIsUnlocked(profile.id, user?.companyId);
    isLocked = !data?.isUnlocked;
  }

  return (
    <div className="w-full px-4 md:px-2">
      <div className="flex gap-5">
        {/* Left + Center Sections */}
        <div className="flex-1 space-y-2 md:space-y-5">
          {/* Header Section */}
          <HeaderSection user={profile} isMe={isMe} />
          {/* About Section */}
          <AboutSeeker user={profile} isMe={isMe} />
          {/* Experience Section */}
          <ExperienceSection user={profile} isMe={isMe} />
          {/* Education Section */}
          <EducationsSection user={profile} isMe={isMe} />
          {/* Courses Section */}
          <CoursesSection user={profile} isMe={isMe} />
          {/* Skills Section */}
          <SkillsSection user={profile} isMe={isMe} />
          {/* Activities / Achievements Section */}
          <ActivitiesAchievementsSection user={profile} isMe={isMe} />
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
          <Resume isMe={isMe} user={profile} isLocked={isLocked} />
          {/* Contact Info Section */}
          <ContactInfoSection isMe={isMe} profile={profile} companyId={user?.companyId} isLocked={isLocked} />
          {/* Socialmedia Section */}
          <SocialMediaSection isMe={isMe} user={profile} isLocked={isLocked} />
          {/* Language Section */}
          <LanguageSection isMe={isMe} user={profile} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
