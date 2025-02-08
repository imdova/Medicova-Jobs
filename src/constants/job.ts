import { EducationLevel } from "./enums/education-level.enum";
import { Gender } from "./enums/gender.enum";
import { StartDateType } from "./enums/start-type.enum";
import { JobWorkPlace } from "./enums/work-place.enum";
import { SalaryCurrency } from "./enums/currency.enum";

export const jobWorkPlaceOptions = [
  { id: JobWorkPlace.ONSITE, label: "Onsite" },
  { id: JobWorkPlace.REMOTE, label: "Remote" },
  { id: JobWorkPlace.HYBRID, label: "Hybrid" },
];
export const genderOptions = [
  { id: Gender.ANY, label: "Male & Female" },
  { id: Gender.FEMALE, label: "Female" },
  { id: Gender.MALE, label: "Male" },
];
export const educationOptions = [
  { id: EducationLevel.HIGH_SCHOOL, label: "High School" },
  { id: EducationLevel.BACHELORS, label: "bachelors" },
  { id: EducationLevel.MASTERS, label: "Master's" },
  { id: EducationLevel.PHD, label: "PHD" },
];

export const currencyOptions = [
  { id: SalaryCurrency.USD, label: "USD", icon: "$" },
  { id: SalaryCurrency.EUR, label: "EUR", icon: "€" },
  { id: SalaryCurrency.GBP, label: "GBP", icon: "£" },
  { id: SalaryCurrency.AED, label: "AED", icon: "AED" },
];

export const startDateTypeOptions = [
  { id: StartDateType.IMMEDIATE, label: "Urgently hiring" },
  { id: StartDateType.NEGOTIABLE, label: "Flexible start date" },
];
