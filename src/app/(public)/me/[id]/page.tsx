import VerticalTabs from "@/components/Layout/SideBar/vertical-tabs";
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

const JobDetailPage = ({ params: { id } }: { params: { id: string } }) => {
  // const job = jobs.find((job) => job.id === id);

  // if (!job) return notFound();
  return (
    <div className="container mx-auto my-8 flex min-h-screen w-full flex-row p-2 lg:max-w-[1300px]">
      {/* Left Column: Filter Section */}
      <div className="hidden w-1/5 rounded-base border border-gray-100 bg-white py-4 shadow-xl lg:block">
        <div className="sticky top-4">
          <VerticalTabs />
        </div>
      </div>
      {/* Right Column: Results Section */}
      <div className="w-full px-2 md:px-6 lg:w-[80%]">
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
    </div>
  );
};

export default JobDetailPage;
