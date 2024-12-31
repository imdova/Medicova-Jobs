import { CompanyItem, Doctor, Folder, Job, Specialty } from "@/types";

export const doctorsBase: Doctor[] = [
  {
    id: "doc-001", // Unique ID
    image: "https://randomuser.me/api/portraits/women/90.jpg",
    name: "Catherine Thompson",
    location: "New York, USA",
    specialty: "Cardiology",
    yearsOfExperience: 15,
    consultant: true,
    field: "Cardiology",
    available: false,
    contactInfo: {
      whatsapp: "+1 555-123-4567",
      phoneNumber: "+1 555-987-6543",
      email: "sarah.johnson@example.com",
    },
    experience: [
      {
        name: "Senior Cardiologist",
        country: {
          name: "USA",
          code: "us",
        },
        startDate: "2010",
        endDate: "Present",
      },
      {
        name: "Cardiology Resident",
        country: {
          name: "USA",
          code: "us",
        },
        startDate: "2007",
        endDate: "2010",
      },
    ],
    education: [
      {
        name: "Harvard Medical School",
        country: {
          name: "USA",
          code: "us",
        },
        specialty: "Cardiology",
        degree: "Doctor of Medicine (MD)",
        startDate: "2000",
        endDate: "2006",
      },
    ],
  },
  {
    id: "doc-002", // Unique ID
    image: "https://randomuser.me/api/portraits/men/6.jpg",
    name: "Michael Brown",
    location: "London, UK",
    specialty: "Cardiology",
    yearsOfExperience: 20,
    available: false,
    consultant: true,
    field: "Cardiology",
    contactInfo: {
      whatsapp: "+44 7700-123456",
      phoneNumber: "+44 7700-987654",
      email: "michael.brown@example.com",
    },
    experience: [
      {
        name: "Head of Cardiology",
        country: {
          name: "UK",
          code: "gb",
        },
        startDate: "2010",
        endDate: "Present",
      },
      {
        name: "Cardiology Fellow",
        country: {
          name: "UK",
          code: "gb",
        },
        startDate: "2005",
        endDate: "2010",
      },
    ],
    education: [
      {
        name: "University of Oxford",
        country: {
          name: "UK",
          code: "gb",
        },
        specialty: "Cardiology",
        degree: "Doctor of Medicine (MD)",
        startDate: "1995",
        endDate: "2003",
      },
    ],
  },
  {
    id: "doc-003", // Unique ID
    image: "https://randomuser.me/api/portraits/women/79.jpg",
    name: "Aisha Khan",
    location: "Dubai, UAE",
    specialty: "Cardiology",
    yearsOfExperience: 10,
    available: false,
    consultant: true,
    field: "Cardiology",
    contactInfo: {
      whatsapp: "+971 50-123-4567",
      phoneNumber: "+971 50-987-6543",
      email: "aisha.khan@example.com",
    },
    experience: [
      {
        name: "Consultant Cardiologist",
        country: {
          name: "UAE",
          code: "ae",
        },
        startDate: "2015",
        endDate: "Present",
      },
    ],
    education: [
      {
        name: "Dubai Medical College",
        country: {
          name: "UAE",
          code: "ae",
        },
        specialty: "Cardiology",
        degree: "Doctor of Medicine (MD)",
        startDate: "2005",
        endDate: "2012",
      },
    ],
  },
  {
    id: "doc-004", // Unique ID
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    name: "Ramesh Patel",
    location: "Mumbai, India",
    specialty: "Cardiology",
    yearsOfExperience: 12,
    consultant: true,
    available: false,
    field: "Cardiology",
    contactInfo: {
      whatsapp: "+91 98765-43210",
      phoneNumber: "+91 98765-12345",
      email: "ramesh.patel@example.com",
    },
    experience: [
      {
        name: "Senior Consultant",
        country: {
          name: "India",
          code: "in",
        },
        startDate: "2011",
        endDate: "Present",
      },
    ],
    education: [
      {
        name: "All India Institute of Medical Sciences",
        country: {
          name: "India",
          code: "in",
        },
        specialty: "Cardiology",
        degree: "Doctor of Medicine (MD)",
        startDate: "2003",
        endDate: "2010",
      },
    ],
  },
  {
    id: "doc-005", // Unique ID
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    name: "Emma Wilson",
    location: "Sydney, Australia",
    specialty: "Cardiology",
    yearsOfExperience: 18,
    consultant: true,
    available: false,
    field: "Cardiology",
    contactInfo: {
      whatsapp: "+61 400-123-456",
      phoneNumber: "+61 400-654-321",
      email: "emma.wilson@example.com",
    },
    experience: [
      {
        name: "Consultant Cardiologist",
        country: {
          name: "Australia",
          code: "au",
        },
        startDate: "2005",
        endDate: "Present",
      },
    ],
    education: [
      {
        name: "University of Sydney",
        country: {
          name: "Australia",
          code: "au",
        },
        specialty: "Cardiology",
        degree: "Doctor of Medicine (MD)",
        startDate: "1995",
        endDate: "2001",
      },
    ],
  },
  // Add 5 more doctors here in a similar structure
];

export const filterSections = {
  "Residency (Location)": [
    { label: "Egypt", count: 3, value: "egypt" },
    { label: "Qatar", count: 2, value: "Qatar" },
  ],
  "Education Level": [
    { label: "Technical Institute", count: 50, value: "institute" },
    { label: "Bachelor's Degree", count: 100, value: "bachelor" },
    { label: "Doctorate Degree", count: 70, value: "doctorate" },
    { label: "Fellowship", count: 30, value: "fellowship" },
  ],
  "Years Of Experience": [
    { label: "1-3", count: 50, value: "1-3" },
    { label: "3-5", count: 40, value: "3-5" },
    { label: "5-10", count: 30, value: "5-10" },
    { label: "+10", count: 30, value: "10+" },
  ],
};
export const searchFilters = {
  "Residency (Location)": [
    { label: "Egypt", count: 3, value: "egypt" },
    { label: "Qatar", count: 2, value: "Qatar" },
  ],
  city: [
    { label: "cairo", count: 3, value: "cairo" },
    { label: "riyadh", count: 2, value: "riyadh" },
  ],
  nationality: [
    { label: "egyptian", count: 3, value: "egyptian" },
    { label: "saudi arabian", count: 2, value: "saudi arabian" },
  ],
  industry: [
    { label: "Physicians", count: 10, value: "Physicians" },
    { label: "Dentists", count: 100, value: "Dentists" },
    { label: "Physiotherapists", count: 50, value: "Physiotherapists" },
    { label: "Pharmacists", count: 30, value: "Pharmacists" },
    { label: "Nurses", count: 10, value: "Nurses" },
  ],
  category: [
    { label: "Doctor", count: 100, value: "doctor" },
    { label: "Nurse", count: 50, value: "nurse" },
    { label: "Pharmaceutical", count: 30, value: "pharmaceutical" },
    { label: "physical therapy", count: 10, value: "physical therapy" },
    { label: "Specialized", count: 10, value: "specialized" },
  ],
  "Education Level": [
    { label: "Institute", count: 50, value: "institute" },
    { label: "Bachelor's Degree", count: 100, value: "bachelor" },
    { label: "Master's Degree", count: 100, value: "master" },
    { label: "Doctorate Degree", count: 70, value: "doctorate" },
    { label: "Fellowship", count: 30, value: "fellowship" },
  ],
  "Years Of Experience": [
    { label: "1-3", count: 50, value: "1-3" },
    { label: "3-5", count: 40, value: "3-5" },
    { label: "5-10", count: 30, value: "5-10" },
    { label: "+10", count: 30, value: "10+" },
  ],
  gender: [
    { label: "Male", count: 200, value: "male" },
    { label: "Female", count: 100, value: "female" },
  ],
  age: [
    { label: "18-25", count: 40, value: "18-25" },
    { label: "26-35", count: 50, value: "26-35" },
    { label: "36-45", count: 30, value: "36-45" },
    { label: "46-60", count: 20, value: "46-60" },
    { label: "60+", count: 10, value: "60+" },
  ],
};

export const folders: Folder[] = [
  {
    id: 1,
    name: "Cardiology Specialists",
    candidates: 25,
    lastModified: new Date("2024-12-23"),
  },
  {
    id: 2,
    name: "Pediatricians",
    candidates: 15,
    lastModified: new Date("2024-12-20"),
  },
  {
    id: 3,
    name: "General Practitioners",
    candidates: 30,
    lastModified: new Date("2024-12-18"),
  },
  {
    id: 4,
    name: "Nursing Staff",
    candidates: 12,
    lastModified: new Date("2024-12-17"),
  },
  {
    id: 5,
    name: "Radiologists",
    candidates: 20,
    lastModified: new Date("2024-12-14"),
  },
  {
    id: 6,
    name: "Surgeons",
    candidates: 18,
    lastModified: new Date("2024-12-11"),
  },
  {
    id: 7,
    name: "Pharmacists",
    candidates: 22,
    lastModified: new Date("2024-12-07"),
  },
  {
    id: 8,
    name: "Physiotherapists",
    candidates: 10,
    lastModified: new Date("2024-12-06"),
  },
  {
    id: 9,
    name: "Dentists",
    candidates: 8,
    lastModified: new Date("2024-12-05"),
  },
  {
    id: 10,
    name: "Psychiatrists",
    candidates: 15,
    lastModified: new Date("2024-12-04"),
  },
];

export const searchJopFilters = {
  Industry: [
    { label: "Pharmacist", count: 3, value: "pharmacist" },
    { label: "HealthCare", count: 5, value: "healthcare" },
    { label: "Administrator", count: 2, value: "administrator" },
  ],
  "Main Specialty": [
    { label: "Physicians", count: 3, value: "physicians" },
    { label: "Dentists", count: 5, value: "dentists" },
    { label: "Physiotherapists", count: 2, value: "physiotherapists" },
    { label: "Pharmacists", count: 24, value: "pharmacists" },
    { label: "Nurses", count: 3, value: "nurses" },
  ],
  "Work Time": [
    { label: "Full-time", count: 3, value: "full_time" },
    { label: "Part-Time", count: 5, value: "part_time" },
  ],
  "Work Place": [
    { label: "Remote", count: 2, value: "remote" },
    { label: "On site", count: 24, value: "on_site" },
    { label: "Hybrid", count: 3, value: "hybrid" },
  ],
  Categories: [
    { label: "Medical", count: 24, value: "medical" },
    { label: "Physician/Doctor", count: 3, value: "physician_doctor" },
    { label: "Medical Sonographer", count: 3, value: "medical_sonographer" },
    { label: "Pharmacist", count: 3, value: "pharmacist" },
    { label: "Clinical Healthcare", count: 6, value: "clinical_healthcare" },
    {
      label: "Radiologic Technologist",
      count: 4,
      value: "radiologic_technologist",
    },
    { label: "Nutritionist", count: 4, value: "nutritionist" },
    { label: "Technology", count: 5, value: "technology" },
  ],
  "Job Level": [
    { label: "General", count: 57, value: "general" },
    { label: "Specialist", count: 3, value: "specialist" },
    { label: "Consultant", count: 5, value: "consultant" },
    { label: "Director", count: 12, value: "director" },
    { label: "CEO", count: 8, value: "ceo" },
  ],
  "Salary Range": [
    { label: "$700 - $1000", count: 4, value: "700_1000" },
    { label: "$100 - $1500", count: 6, value: "100_1500" },
    { label: "$1500 - $2000", count: 10, value: "1500_2000" },
    { label: "$3000 or above", count: 4, value: "3000_above" },
  ],
};

export const jobs: Job[] = [
  {
    id: "1",
    title: "Senior Cardiologist Consultant",
    location: "Cairo, Egypt",
    education: "Master’s Degree in Medicine",
    specialty: "Cardiology & Vascular Health",
    features: [
      "Male and Female",
      "Full time | Onsite",
      "EX (5+ years)",
      "Age (35-45)",
      "Salary (1300 - 1500 SAR)",
      "Immediate Joining",
    ],
    timeStamps: new Date("2024-12-26T00:00:00Z"),
    description:
      "Seeking a senior cardiologist consultant to provide expert care in diagnosing and treating cardiovascular diseases, focusing on heart and vascular health.",
    requirements: [
      "At least 5 years of experience in cardiology",
      "Master’s degree in Medicine or equivalent",
      "Proven expertise in cardiovascular health management",
      "Ability to work in a high-pressure environment",
      "Strong communication and interpersonal skills",
    ],
    additionalDetails:
      "This role offers an excellent salary package and benefits, including health insurance and flexible work hours.",
    skills: [
      "Cardiology",
      "Cardiovascular Diseases",
      "Patient Care",
      "Diagnostic Imaging",
      "Emergency Care",
      "Heart Surgery",
    ],
    relatedSearch: [
      "Cardiologist Jobs",
      "Heart Specialist Jobs",
      "Vascular Health Careers",
      "Medical Consultant Jobs",
      "Senior Cardiologist Positions",
    ],
    company: {
      name: "HealthCare Excellence",
      industry: "Healthcare",
      website: "www.healthcareexcellence.com",
      contact: "contact@healthcareexcellence.com",
    },
  },
  {
    id: "2",
    title: "Consultant Cardiologist (Specialist)",
    location: "Alexandria, Egypt",
    education: "MD in Cardiology",
    specialty: "Cardiovascular Diseases",
    features: [
      "Male and Female",
      "Full time | Onsite",
      "EX (3-7 years)",
      "Age (30-40)",
      "Salary (1200 - 1350 SAR)",
      "Flexible Start Date",
    ],
    timeStamps: new Date("2024-12-20T00:00:00Z"),
    description:
      "We are looking for a specialist cardiologist to join our team, providing comprehensive care for patients with heart conditions, including diagnosis and treatment planning.",
    requirements: [
      "At least 3 years of experience in cardiology",
      "MD in Cardiology or related field",
      "Strong background in diagnosing cardiovascular diseases",
      "Ability to work effectively in a team-oriented environment",
      "Proficiency in medical technologies and diagnostic tools",
    ],
    additionalDetails:
      "The role includes working in a state-of-the-art facility with a supportive team, offering opportunities for professional development.",
    skills: [
      "Cardiology",
      "Heart Disease Treatment",
      "Patient Diagnosis",
      "Vascular Disease Management",
      "Medical Consultation",
    ],
    relatedSearch: [
      "Cardiologist Jobs in Alexandria",
      "Medical Consultant Positions",
      "Vascular Specialist Careers",
      "Full-time Cardiologist Jobs",
    ],
    company: {
      name: "MedCare Health Systems",
      industry: "Healthcare",
      website: "www.medcarehealth.com",
      contact: "hr@medcarehealth.com",
    },
  },
  {
    id: "3",
    title: "Cardiologist Consultant (Experienced)",
    location: "Cairo, Egypt",
    education: "Master’s Degree in Cardiology",
    specialty: "Cardio-vascular Health",
    features: [
      "Male and Female",
      "Full time | Onsite",
      "EX (3-5 years)",
      "Age (35-40)",
      "Salary (1250 - 1400 SAR)",
      "Monday to Friday",
    ],
    timeStamps: new Date("2024-12-16T00:00:00Z"),
    description:
      "Join our team as a cardiology consultant where you will be responsible for managing and treating patients with heart and vascular issues, providing expert guidance and care.",
    requirements: [
      "Experience in cardiology for at least 3-5 years",
      "Master’s degree in Cardiology",
      "Strong skills in patient care and diagnosis",
      "Ability to lead and collaborate with a medical team",
      "Excellent communication skills",
    ],
    additionalDetails:
      "We offer competitive salary packages, professional growth, and a dynamic work environment focused on delivering top-tier patient care.",
    skills: [
      "Cardiovascular Health",
      "Patient Management",
      "Electrocardiography",
      "Heart Disease Treatment",
      "Cardiac Care",
    ],
    relatedSearch: [
      "Consultant Cardiologist Cairo",
      "Heart Disease Specialist Jobs",
      "Cardiology Consultant Roles",
      "Cardiovascular Jobs Cairo",
    ],
    company: {
      name: "CardioCare Specialists",
      industry: "Healthcare",
      website: "www.cardiocarespecialists.com",
      contact: "hr@cardiocarespecialists.com",
    },
  },
  {
    id: "4",
    title: "Lead Cardiologist - Full Time",
    location: "Giza, Egypt",
    education: "PhD in Cardiovascular Medicine",
    specialty: "Heart and Vascular Care",
    features: [
      "Male and Female",
      "Full time | Onsite",
      "EX (4-6 years)",
      "Age (40-45)",
      "Salary (1400 - 1500 SAR)",
      "Weekend Off",
    ],
    timeStamps: new Date("2024-11-23T00:00:00Z"),
    description:
      "A lead cardiologist is needed to oversee cardiovascular care, provide leadership to the medical team, and ensure excellent patient outcomes in the treatment of heart diseases.",
    requirements: [
      "At least 4-6 years of cardiology experience",
      "PhD in Cardiovascular Medicine",
      "Leadership experience in a medical setting",
      "Expertise in both diagnostic and therapeutic cardiovascular treatments",
      "Ability to work with cross-functional healthcare teams",
    ],
    additionalDetails:
      "This position offers an attractive salary, benefits package, and a work-life balance with weekends off.",
    skills: [
      "Cardiology",
      "Leadership",
      "Cardiac Surgery",
      "Patient Care",
      "Vascular Treatment",
      "Heart Disease Prevention",
    ],
    relatedSearch: [
      "Lead Cardiologist Jobs",
      "Cardiology Leadership Roles",
      "Full-Time Heart Specialist Jobs",
      "Senior Cardiologist Giza",
    ],
    company: {
      name: "VascularCare Hospitals",
      industry: "Healthcare",
      website: "www.vascularcarehospitals.com",
      contact: "info@vascularcarehospitals.com",
    },
  },
  {
    id: "5",
    title: "Junior Cardiologist",
    location: "Dubai, UAE",
    education: "Bachelor’s Degree in Medicine",
    specialty: "Cardiology",
    features: [
      "Male and Female",
      "Full time | Onsite",
      "EX (1-3 years)",
      "Age (25-35)",
      "Salary (1000 - 1200 SAR)",
      "Immediate Joining",
    ],
    timeStamps: new Date("2024-11-22T00:00:00Z"),
    description:
      "We are seeking a junior cardiologist to join our team, providing support in diagnosing and treating cardiovascular diseases under the supervision of senior consultants.",
    requirements: [
      "1-3 years of experience in cardiology",
      "Bachelor’s degree in Medicine",
      "Basic knowledge of cardiovascular health",
      "Willingness to learn and adapt",
      "Good communication skills",
    ],
    additionalDetails:
      "This role offers a great opportunity for growth and learning in a supportive environment with competitive salary and benefits.",
    skills: [
      "Cardiology",
      "Patient Care",
      "Diagnostic Skills",
      "Team Collaboration",
      "Basic Surgical Skills",
    ],
    relatedSearch: [
      "Junior Cardiologist Jobs",
      "Entry-Level Cardiology Positions",
      "Cardiology Jobs Dubai",
      "Healthcare Jobs UAE",
    ],
    company: {
      name: "HeartCare Clinic",
      industry: "Healthcare",
      website: "www.heartcareclinic.com",
      contact: "careers@heartcareclinic.com",
    },
  },
  {
    id: "6",
    title: "Cardiology Fellow",
    location: "Riyadh, Saudi Arabia",
    education: "MD in Cardiology",
    specialty: "Cardiovascular Medicine",
    features: [
      "Male and Female",
      "Full time | Onsite",
      "EX (2-4 years)",
      "Age (28-38)",
      "Salary (1100 - 1300 SAR)",
      "Flexible Start Date",
    ],
    timeStamps: new Date("2024-10-21T00:00:00Z"),
    description:
      "Looking for a cardiology fellow to join our esteemed medical team, focusing on advanced cardiovascular treatments and patient care.",
    requirements: [
      "2-4 years of experience in cardiology",
      "MD in Cardiology",
      "Strong background in cardiovascular treatments",
      "Ability to work in a fast-paced environment",
      "Excellent teamwork and communication skills",
    ],
    additionalDetails:
      "The position offers a competitive salary, professional development opportunities, and a collaborative work environment.",
    skills: [
      "Cardiovascular Medicine",
      "Patient Diagnosis",
      "Advanced Cardiac Care",
      "Medical Research",
      "Team Collaboration",
    ],
    relatedSearch: [
      "Cardiology Fellow Jobs",
      "Cardiovascular Medicine Positions",
      "Healthcare Jobs Riyadh",
      "Medical Fellowships Saudi Arabia",
    ],
    company: {
      name: "Riyadh Heart Institute",
      industry: "Healthcare",
      website: "www.riyadhheartinstitute.com",
      contact: "jobs@riyadhheartinstitute.com",
    },
  },
  {
    id: "7",
    title: "Cardiothoracic Surgeon",
    location: "Cairo, Egypt",
    education: "Master’s Degree in Cardiothoracic Surgery",
    specialty: "Cardiothoracic Surgery",
    features: [
      "Male and Female",
      "Full time | Onsite",
      "EX (5+ years)",
      "Age (35-45)",
      "Salary (1400 - 1600 SAR)",
      "Immediate Joining",
    ],
    timeStamps: new Date("2024-09-22T00:00:00Z"),
    description:
      "We are seeking a cardiothoracic surgeon to join our medical team, providing expert care in cardiothoracic surgical operations, including heart transplants and other cardiovascular procedures.",
    requirements: [
      "At least 5 years of experience in cardiothoracic surgery",
      "Master’s degree in Cardiothoracic Surgery",
      "Strong background in cardiothoracic surgical techniques",
      "Ability to work in a high-pressure environment",
      "Excellent teamwork and communication skills",
    ],
    additionalDetails:
      "This position offers a competitive salary, professional development opportunities, and a collaborative work environment.",
    skills: [
      "Cardiothoracic Surgery",
      "Heart Transplant",
      "Cardiovascular Surgical Techniques",
      "Patient Care",
      "Team Collaboration",
    ],
    relatedSearch: [
      "Cardiothoracic Surgeon Jobs",
      "Heart Transplant Surgeon Roles",
      "Cardiothoracic Surgery Jobs Cairo",
      "Full-time Cardiothoracic Surgeon Jobs",
    ],
    company: {
      name: "Cairo Heart Institute",
      industry: "Healthcare",
      website: "www.cairoheartinstitute.com",
      contact: "info@cairoheartinstitute.com",
    },
  },
  {
    id: "8",
    title: "Vascular Surgeon",
    location: "Jeddah, Saudi Arabia",
    education: "Master’s Degree in Vascular Surgery",
    specialty: "Vascular Surgery",
    features: [
      "Male and Female",
      "Full time | Onsite",
      "EX (5+ years)",
      "Age (35-45)",
      "Salary (1300 - 1500 SAR)",
      "Flexible Start Date",
    ],
    timeStamps: new Date("2024-08-22T00:00:00Z"),
    description:
      "We are looking for a vascular surgeon to join our team, providing expert care in vascular surgical operations, including vascular reconstruction and endovascular procedures.",
    requirements: [
      "At least 5 years of experience in vascular surgery",
      "Master’s degree in Vascular Surgery",
      "Strong background in vascular surgical techniques",
      "Ability to work in a high-pressure environment",
      "Excellent teamwork and communication skills",
    ],
    additionalDetails:
      "The position offers a competitive salary, professional development opportunities, and a collaborative work environment.",
    skills: [
      "Vascular Surgery",
      "Vascular Reconstruction",
      "Endovascular Procedures",
      "Patient Care",
      "Team Collaboration",
    ],
    relatedSearch: [
      "Vascular Surgeon Jobs",
      "Vascular Surgery Roles",
      "Vascular Surgery Jobs Jeddah",
      "Full-time Vascular Surgeon Jobs",
    ],
    company: {
      name: "Jeddah Vascular Institute",
      industry: "Healthcare",
      website: "www.jeddahvascularinstitute.com",
      contact: "careers@jeddahvascularinstitute.com",
    },
  },
  {
    id: "9",
    title: "Interventional Cardiologist",
    location: "Abu Dhabi, UAE",
    education: "Master’s Degree in Interventional Cardiology",
    specialty: "Interventional Cardiology",
    features: [
      "Male and Female",
      "Full time | Onsite",
      "EX (5+ years)",
      "Age (35-45)",
      "Salary (1400 - 1600 SAR)",
      "Immediate Joining",
    ],
    timeStamps: new Date("2024-07-22T00:00:00Z"),
    description:
      "We are seeking an interventional cardiologist to join our medical team, providing expert care in interventional cardiology procedures, including angioplasty and stenting.",
    requirements: [
      "At least 5 years of experience in interventional cardiology",
      "Master’s degree in Interventional Cardiology",
      "Strong background in interventional cardiology procedures",
      "Ability to work in a high-pressure environment",
      "Excellent teamwork and communication skills",
    ],
    additionalDetails:
      "This position offers a competitive salary, professional development opportunities, and a collaborative work environment.",
    skills: [
      "Interventional Cardiology",
      "Angioplasty",
      "Stenting",
      "Patient Care",
      "Team Collaboration",
    ],
    relatedSearch: [
      "Interventional Cardiologist Jobs",
      "Interventional Cardiology Roles",
      "Interventional Cardiology Jobs Abu Dhabi",
      "Full-time Interventional Cardiologist Jobs",
    ],
    company: {
      name: "Abu Dhabi Heart Institute",
      industry: "Healthcare",
      website: "www.abudhabiheartinstitute.com",
      contact: "info@abudhabiheartinstitute.com",
    },
  },
];

export const specialists: Specialty[] = [
  {
    id: 1,
    image: "/images/Physicians.svg",
    title: "Physicians",
    jobsNumber: 436,
    link: "#",
  },
  {
    id: 2,
    image: "/images/Dentists.svg",
    title: "Dentists",
    jobsNumber: 636,
    link: "#",
  },
  {
    id: 3,
    image: "/images/Physiontherapists.svg",
    title: "Physiontherapists",
    jobsNumber: 436,
    link: "#",
  },
  {
    id: 4,
    image: "/images/Pharmacists.svg",
    title: "Pharmacists",
    jobsNumber: 436,
    link: "#",
  },
  {
    id: 5,
    image: "/images/Nurses.svg",
    title: "Nurses",
    jobsNumber: 436,
    link: "#",
  },
  {
    id: 6,
    image: "/images/Technicians.svg",
    title: "Technicians",
    jobsNumber: 436,
    link: "#",
  },
  {
    id: 7,
    image: "/images/Technicians.svg",
    title: "Technicians",
    jobsNumber: 436,
    link: "#",
  },
  {
    id: 8,
    image: "/images/Technicians.svg",
    title: "Technicians",
    jobsNumber: 436,
    link: "#",
  },
];

export const companies: CompanyItem[] = [
  {
    id: 1,
    image: "/images/Sultan-qaboos-hospital.jpg",
    title: "Sultan Qaboos Hospital",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
    tag: "healthcare",
  },
  {
    id: 2,
    image: "/images/Al-rumailah-hospital.jpg",
    title: "Al rumailah hospital",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
    tag: "healthcare",
  },
  {
    id: 3,
    image: "/images/saudi-german-hospital.jpg",
    title: "Saudi German Hospital",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
    tag: "healthcare",
  },
  {
    id: 4,
    image: "/images/Sultan-qaboos-hospital.jpg",
    title: "Al rumailah hospital",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
    tag: "healthcare",
  },
  {
    id: 5,
    image: "/images/Sultan-qaboos-hospital.jpg",
    title: "Saudi German Hospital",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
    tag: "healthcare",
  },
];
