import HeaderSection from "./Components/HeaderSection";
import AboutSeeker from "./Components/AboutSeeker";
import ExperienceSection from "./Components/ExperienceSection";
import EducationsSection from "./Components/EducationsSection";
import CoursesSection from "./Components/CoursesSection";
import SkillsSection from "./Components/SkillsSection";
import ActivitiesAchievementsSection from "./Components/ActivitiesAchievementsSection";
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
import { Suspense } from "react";
import ExperienceSkeleton from "@/components/loading/skeleton-experince";
import SeekerComplete from "./Components/seekerComplete";
import ProfileNavigation from "./Components/ProfileNavigation";
import { ProfileInfoForm } from "./Components/ProfileInfoForm";
import CareerPreferenceTab from "./Components/CareerPreferenceTab";

const ProfilePage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { id } = await params;
  const searchParamsResults = await searchParams;
  const data = await getServerSession(authOptions);
  const { success, data: user } = await getUser(id);
  if (!success || !user) return notFound();
  const sessionUser = data?.user;
  const isMe = searchParamsResults?.public
    ? false
    : sessionUser?.id === user.id;
  const tab = isMe
    ? (searchParamsResults?.tab as ProfileTabs) || "personal-info"
    : "professional";
  let isLocked = !isMe;
  if (!isMe && sessionUser?.type === "employer" && sessionUser?.companyId) {
    const { data } = await checkIsUnlocked(user.id, sessionUser?.companyId);
    isLocked = !data?.isUnlocked;
  }
  if (!isMe && !user.isPublic) {
    return notFound();
  }

  return (
    <div className="w-full px-4 md:px-5">
      <div className="flex gap-5">
        {/* Left + Center Sections */}
        <div className="flex-1 space-y-2">
          {/* Header Section */}
          <HeaderSection user={user} isMe={isMe} />
          {/* About Section */}
          {isMe && <ProfileNavigation tab={tab} />}
          {tab === "professional" && (
            <ProfessionalInfo user={user} isMe={isMe} />
          )}
          {isMe && tab === "personal-info" && <ProfileInfoForm user={user} />}
          {isMe && tab === "career-preference" && (
            <CareerPreferenceTab user={user} />
          )}
        </div>
        {/* Right Sections */}
        <div className="hidden max-w-80 min-w-80 space-y-2 md:block">
          {/* Public user Section */}
          {isMe && (
            <>
              <SeekerComplete user={user} />
              {/* Public user Section */}
              <PublicProfile user={user} />
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
          <SocialMediaSection
            isMe={isMe}
            user={user}
            isLocked={isLocked}
            type="seeker"
          />
          {/* Language Section */}
          <LanguageSection isMe={isMe} user={user} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

const ProfessionalInfo: React.FC<{
  user: UserProfile;
  isMe: boolean;
}> = ({ user, isMe }) => (
  <>
    <AboutSeeker user={user} isMe={isMe} />
    <Suspense fallback={<ExperienceSkeleton />}>
      <ExperienceSection user={user} isMe={isMe} />
    </Suspense>
    <Suspense fallback={null}>
      <EducationsSection user={user} isMe={isMe} />
    </Suspense>
    <Suspense fallback={null}>
      <CoursesSection user={user} isMe={isMe} />
    </Suspense>
    <Suspense fallback={null}>
      <SkillsSection user={user} isMe={isMe} />
    </Suspense>
    <ActivitiesAchievementsSection user={user} isMe={isMe} />
  </>
);
