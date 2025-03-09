import { getUser } from "@/lib/actions/users.actions";
import ProfileMe from "./profileMe";
import { notFound } from "next/navigation";

const demoData: UserProfile = {
  id: "1",
  userName: "john_doe",
  phone: "123-456-7890",
  email: "john.doe@example.com",
  firstName: "John",
  lastName: "Doe",
  avatar: "https://example.com/avatar.jpg",
  birthday: "1990-06-15",
  country: { code: "US", name: "United States" },
  state: { code: "CA", name: "California" },
  city: "Los Angeles",
  isAvailable: true,
  isMarried:false,
  about: "A passionate software developer with expertise in web technologies.",
  title: "Senior Software Engineer",
  languages: ["English", "Spanish"],
  resume: "https://example.com/resume.pdf",
  socialLinks: {
    linkedin: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
    twitter: "https://twitter.com/johndoe",
  },
  whatsapp: "1234567890",
  nationality: "American",
  maritalStatus: "Single",
  hasDrivingLicence: true,
  isPublic: true,
  categoryId: "123",
  category: "Software Development",
  specialityId: "456",
  speciality: "Frontend Development",
  careerLevelId: "789",
  careerLevel: "Senior-Level",
  created_at: "2024-03-08T12:00:00Z",
  updated_at: "2024-03-08T12:30:00Z",
  deleted_at: null,
  _version: 1,
};

const ProfilePage = async ({ params: { id } }: { params: { id: string } }) => {
  const result = await getUser(id);
  if (!result.success || !result.data) return notFound();
  const user = result.data;
  return <ProfileMe user={{ ...demoData, id: user.id }} />;
};

export default ProfilePage;
