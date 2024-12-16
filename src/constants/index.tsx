import { Doctor } from "@/types";

export const doctorsBase: Doctor[] = [
  {
    id: "doc-001", // Unique ID
    image: "https://randomuser.me/api/portraits/women/90.jpg",
    name: "Sarah Johnson",
    location: "New York, USA",
    specialty: "Cardiology",
    yearsOfExperience: 15,
    consultant: true,
    field: "Cardiology",
    available: true,
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
    { label: "Bachelor’s Degree", count: 100, value: "bachelor" },
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
