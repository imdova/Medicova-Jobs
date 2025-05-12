"use client";

import useFetch from "@/hooks/useFetch";
import SeekersTable from "../components/seekers/OverviewSeekersTable";
import { API_GET_SEEKERS } from "@/api/seeker";

const SeekerList: React.FC = () => {
  const { data: Seeker, setData } =
    useFetch<PaginatedResponse<UserProfile>>(API_GET_SEEKERS);
  console.log(Seeker);
  return (
    <>
      <div className="box-content !p-0">
        {/* Seekers Table */}
        <SeekersTable seekers={Seeker} updateSeekers={setData} />
      </div>
    </>
  );
};

export default SeekerList;
