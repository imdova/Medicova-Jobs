import Filter from "@/components/Layout/filter/filter";
import CvResults from "./cv-results";
import { getSeekers } from "@/lib/actions/applications.actions";
import { searchFilters } from "@/constants";
import CustomPagination from "@/components/UI/CustomPagination";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/config";
import { getUnlockedSeeker } from "@/lib/actions/employer.actions";

const page = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const { q: query } = searchParams as {
    [key: string]: string;
  };
  const data = await getServerSession(authOptions);
  const user = data?.user;

  const result = await getSeekers();
  const unLockedSeekersResult = await getUnlockedSeeker(user?.companyId || "");
  const { data: unLockedSeekers } = unLockedSeekersResult || { data: [] };
  const { data: seekers, total } = result.data || { data: [], total: 0 };
  seekers.forEach((seeker) => {
    const isUnlocked = unLockedSeekers?.data?.find(
      (item) => item.seekerId === seeker.id,
    );
    seeker.isLocked = !isUnlocked;
  });
  return (
    <div className="flex min-h-screen w-full ">
      {/* Left Column: Filter Section */}
      <Filter
        sections={searchFilters}
        searchKeys={["Residency (Location)", "nationality"]}
      />
      {/* Right Column: Results Section */}
      <div className="w-full px-4 lg:w-[80%]">
        <CvResults seekers={seekers} total={total} />
        {seekers.length < total && <CustomPagination totalItems={total} />}
      </div>
    </div>
  );
};

export default page;
