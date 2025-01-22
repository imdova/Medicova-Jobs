import { EducationLevel } from "./enums/education-level.enum";
import { Gender } from "./enums/gender.enum";
import { JobWorkPlace } from "./enums/work-place.enum";

export const jobWorkPlaceOptions = [
  { id: JobWorkPlace.ONSITE, label: "Onsite" },
  { id: JobWorkPlace.REMOTE, label: "Remote" },
  { id: JobWorkPlace.HYBRID, label: "Hybrid" },
];
export const genderOptions = [
  { id: Gender.ANY, label: "Any" },
  { id: Gender.FEMALE, label: "Female" },
  { id: Gender.MALE, label: "Male" },
];
export const educationOptions = [
  { id: EducationLevel.HIGH_SCHOOL, label: "High School" },
  { id: EducationLevel.BACHELORS, label: "bachelors" },
  { id: EducationLevel.MASTERS, label: "Master's" },
  { id: EducationLevel.PHD, label: "PHD" },
];