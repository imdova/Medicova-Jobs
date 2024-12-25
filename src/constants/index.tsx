import { Doctor, Folder } from "@/types";

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
    { label: "All", count: 5, value: "all" },
    { label: "Egypt", count: 3, value: "egypt" },
    { label: "Qatar", count: 2, value: "Qatar" },
  ],
  "Education Level": [
    { label: "All", count: 250, value: "all" },
    { label: "Technical Institute", count: 50, value: "institute" },
    { label: "Bachelor's Degree", count: 100, value: "bachelor" },
    { label: "Doctorate Degree", count: 70, value: "doctorate" },
    { label: "Fellowship", count: 30, value: "fellowship" },
  ],
  "Years Of Experience": [
    { label: "All", count: 150, value: "all" },
    { label: "1-3", count: 50, value: "1-3" },
    { label: "3-5", count: 40, value: "3-5" },
    { label: "5-10", count: 30, value: "5-10" },
    { label: "+10", count: 30, value: "10+" },
  ],
};
export const searchFilters = {
  "Residency (Location)": [
    { label: "All", count: 5, value: "all" },
    { label: "Egypt", count: 3, value: "egypt" },
    { label: "Qatar", count: 2, value: "Qatar" },
  ],
  city: [
    { label: "All", count: 5, value: "all" },
    { label: "cairo", count: 3, value: "cairo" },
    { label: "riyadh", count: 2, value: "riyadh" },
  ],
  nationality: [
    { label: "All", count: 5, value: "all" },
    { label: "egyptian", count: 3, value: "egyptian" },
    { label: "saudi arabian", count: 2, value: "saudi arabian" },
  ],
  industry: [
    { label: "All", count: 200, value: "all" },
    { label: "Physicians", count: 10, value: "Physicians" },
    { label: "Dentists", count: 100, value: "Dentists" },
    { label: "Physiotherapists", count: 50, value: "Physiotherapists" },
    { label: "Pharmacists", count: 30, value: "Pharmacists" },
    { label: "Nurses", count: 10, value: "Nurses" },
  ],
  category: [
    { label: "All", count: 200, value: "all" },
    { label: "Doctor", count: 100, value: "doctor" },
    { label: "Nurse", count: 50, value: "nurse" },
    { label: "Pharmaceutical", count: 30, value: "pharmaceutical" },
    { label: "physical therapy", count: 10, value: "physical therapy" },
    { label: "Specialized", count: 10, value: "specialized" },
  ],
  "Education Level": [
    { label: "All", count: 250, value: "all" },
    { label: "Institute", count: 50, value: "institute" },
    { label: "Bachelor's Degree", count: 100, value: "bachelor" },
    { label: "Master's Degree", count: 100, value: "master" },
    { label: "Doctorate Degree", count: 70, value: "doctorate" },
    { label: "Fellowship", count: 30, value: "fellowship" },
  ],
  "Years Of Experience": [
    { label: "All", count: 150, value: "all" },
    { label: "1-3", count: 50, value: "1-3" },
    { label: "3-5", count: 40, value: "3-5" },
    { label: "5-10", count: 30, value: "5-10" },
    { label: "+10", count: 30, value: "10+" },
  ],
  gender: [
    { label: "All", count: 300, value: "all" },
    { label: "Male", count: 200, value: "male" },
    { label: "Female", count: 100, value: "female" },
  ],
  age: [
    { label: "All", count: 40, value: "all" },
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
    { label: "All", count: 37, value: "all" },
    { label: "Pharmacist", count: 3, value: "pharmacist" },
    { label: "HealthCare", count: 5, value: "healthcare" },
    { label: "Administrator", count: 2, value: "administrator" },
  ],
  "Main Speciality": [
    { label: "All", count: 37, value: "all" },
    { label: "Physicians", count: 3, value: "physicians" },
    { label: "Dentists", count: 5, value: "dentists" },
    { label: "Physiotherapists", count: 2, value: "physiotherapists" },
    { label: "Pharmacists", count: 24, value: "pharmacists" },
    { label: "Nurses", count: 3, value: "nurses" },
  ],
  "Work Time": [
    { label: "All", count: 37, value: "all" },
    { label: "Full-time", count: 3, value: "full_time" },
    { label: "Part-Time", count: 5, value: "part_time" },
  ],
  "Work Place": [
    { label: "All", count: 29, value: "all" },
    { label: "Remote", count: 2, value: "remote" },
    { label: "On site", count: 24, value: "on_site" },
    { label: "Hybrid", count: 3, value: "hybrid" },
  ],
  Categories: [
    { label: "All", count: 60, value: "all" },
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
    { label: "All", count: 85, value: "all" },
    { label: "General", count: 57, value: "general" },
    { label: "Specialist", count: 3, value: "specialist" },
    { label: "Consultant", count: 5, value: "consultant" },
    { label: "Director", count: 12, value: "director" },
    { label: "CEO", count: 8, value: "ceo" },
  ],
  "Salary Range": [
    { label: "All", count: 24, value: "all" },
    { label: "$700 - $1000", count: 4, value: "700_1000" },
    { label: "$100 - $1500", count: 6, value: "100_1500" },
    { label: "$1500 - $2000", count: 10, value: "1500_2000" },
    { label: "$3000 or above", count: 4, value: "3000_above" },
  ],
};
