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
  const { success, data: user } = await getUser(id);
  if (!success || !user) return notFound();
  const sessionUser = data?.user;
  const isMe = sessionUser?.id === user.id;
  let isLocked = !isMe;
  if (!isMe && sessionUser?.type === "employer" && sessionUser?.companyId) {
    const { data } = await checkIsUnlocked(user.id, sessionUser?.companyId);
    isLocked = !data?.isUnlocked;
  }

  return (
    <div className="w-full px-4 md:px-2">
      <div className="flex gap-5">
        {/* Left + Center Sections */}
        <div className="flex-1 space-y-2 md:space-y-2">
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
          {/* Public user Section */}
          {isMe && (
            <>
              <CompleteProfile percentage={20} />
              {/* Public user Section */}
              <PublicProfile />
            </>
          )}
          {/* Resume Section */}
          <Resume isMe={isMe} user={user} isLocked={isLocked} />
          {/* Contact Info Section */}
          <ContactInfoSection
            isMe={isMe}
            user={user}
            companyId={sessionUser?.companyId}
            isLocked={isLocked}
          />
          {/* Socialmedia Section */}
          <SocialMediaSection isMe={isMe} user={user} isLocked={isLocked} />
          {/* Language Section */}
          <LanguageSection isMe={isMe} user={user} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
