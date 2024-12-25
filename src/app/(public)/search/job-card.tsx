"use client";
import { Avatar, IconButton } from "@mui/material";
import { Doctor } from "@/types";
import {
  Bookmark,
  BookmarkBorder,
  BookmarkOutlined,
  LocationOnOutlined,
  MedicalServicesOutlined,
  PeopleAltOutlined,
  Person2Outlined,
  SchoolOutlined,
  WorkspacePremiumOutlined,
} from "@mui/icons-material";
import { formatName } from "@/util";
import Flag from "@/components/UI/flagitem";
import ShareMenu from "@/components/UI/ShareMenu";

interface CandidateCardProps {
  doctor: Doctor;
  savedList: string[];
  setSavedList: React.Dispatch<React.SetStateAction<string[]>>;
}

const JobCard: React.FC<CandidateCardProps> = ({
  doctor,
  savedList,
  setSavedList,
}) => {
  const isSaved = savedList.includes(doctor.id);
  const toggleSave = () => setSavedList((pv) => toggleId(pv, doctor.id));

  return (
    <div className="relative flex w-full flex-col rounded-[10px] border border-gray-100 bg-white p-2 shadow-lg md:p-5">
      <div className="flex w-full flex-wrap justify-between gap-5 sm:flex-nowrap">
        <div className="flex justify-center gap-5 md:flex-nowrap md:justify-normal">
          <div>
            <Avatar
              src={"/images/logo.png"}
              alt={formatName(doctor.name)}
              sx={{ width: 76, height: 76 }}
            />
            <p className="mt-4 text-center text-sm text-[#2BA149]">
              6 Days ago{" "}
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold">Comsultant Cardiology </h4>
            <div>
              <div className="my-3 flex max-w-[450px] flex-wrap gap-2 text-gray-500">
                <div className="flex items-center gap-1">
                  <LocationOnOutlined className="h-4 w-4 text-[#46AC60] md:h-5 md:w-5" />
                  <p className="text-xs md:text-base">Cairo,Egypt</p>
                </div>
                <div className="flex items-center gap-1">
                  <SchoolOutlined className="h-4 w-4 text-[#46AC60] md:h-5 md:w-5" />
                  <p className="text-xs md:text-base">Master’s Degree</p>
                </div>
                <div className="flex items-center gap-1">
                  <MedicalServicesOutlined className="h-4 w-4 text-[#46AC60] md:h-5 md:w-5" />
                  <p className="text-xs md:text-base">Cardio-vascular</p>
                </div>
              </div>
              <div className="my-3 flex max-w-[450px] flex-wrap gap-2 text-gray-500">
                <div className="flex items-center gap-1 text-xs md:text-base">
                  <span className="m-[6px] h-2 w-2 rounded-full bg-gray-500"></span>
                  Male and Female
                </div>
                <div className="flex items-center gap-1 text-xs md:text-base">
                  <span className="m-[6px] h-2 w-2 rounded-full bg-gray-500"></span>
                  Full time | Onsite
                </div>
                <div className="flex items-center gap-1 text-xs md:text-base">
                  <span className="m-[6px] h-2 w-2 rounded-full bg-gray-500"></span>
                  EX (3-5)
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500 md:text-base">
                  <span className="m-[6px] h-2 w-2 rounded-full bg-gray-500"></span>
                  Years Age (35-40)
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500 md:text-base">
                  <span className="m-[6px] h-2 w-2 rounded-full bg-gray-500"></span>
                  Salary (1200 - 1500) SAR
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="rounded-[10px] border border-[#82C341] px-4 py-2 text-xs font-semibold text-gray-500 transition-colors duration-300 hover:bg-[#2BA149] hover:text-white focus:ring-2 focus:ring-white md:text-base">
                Healthcare
              </button>
              <button className="rounded-[10px] border border-[#82C341] px-4 py-2 text-xs font-semibold text-gray-500 transition-colors duration-300 hover:bg-[#2BA149] hover:text-white focus:ring-2 focus:ring-white md:text-base">
                Doctors
              </button>
              <button className="flex items-center gap-2 rounded-[10px] border border-[#82C341] px-4 py-2 text-xs font-semibold text-gray-500 transition-colors duration-300 hover:bg-[#2BA149] hover:text-white focus:ring-2 focus:ring-white md:text-base">
                Egypt
                <Flag code="eg" name="egypt" />
              </button>
            </div>
          </div>
        </div>
        <div className="flex h-full w-full items-end justify-between gap-2 md:w-auto md:flex-col md:gap-[77px]">
          <div className="flex">
            <IconButton onClick={toggleSave} size="medium">
              {isSaved ? (
                <Bookmark color="primary" className="h-8 w-8 text-[#2BA149]" />
              ) : (
                <BookmarkBorder
                  color="primary"
                  className="h-8 w-8 text-[#2BA149]"
                />
              )}
            </IconButton>
            <ShareMenu
              link={"/"}
              color="primary"
              className="h-12 w-12 text-[#2BA149]"
            />
          </div>
          <button className="w-full text-nowrap rounded-[10px] bg-[#2BA149] px-8 py-3 font-semibold text-white transition-colors duration-300 hover:bg-white hover:text-[#2BA149] focus:ring-2 focus:ring-white md:w-auto">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;

function toggleId(ids: string[], id: string): string[] {
  // Check if the ID already exists in the array
  if (ids.includes(id)) {
    // If it exists, remove it
    return ids.filter((existingId) => existingId !== id);
  } else {
    // If it doesn't exist, add it
    return [...ids, id];
  }
}
