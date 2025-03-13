import Filter from "@/components/Layout/filter/filter";
import CvResults from "./cv-results";
import { getSeekers } from "@/lib/actions/applications.actions";
import { searchFilters } from "@/constants";
import CustomPagination from "@/components/UI/CustomPagination";

const page = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const { q: query } = searchParams as {
    [key: string]: string;
  };

  const result = await getSeekers();
  const { data: seekers, total } = result.data || { data: [], total: 0 };
  return (
    <div className="flex min-h-screen w-full px-2">
      {/* Left Column: Filter Section */}
      <Filter
        sections={searchFilters}
        searchKeys={["Residency (Location)", "nationality"]}
      />
      {/* Right Column: Results Section */}
      <div className="w-full p-2 md:p-4 lg:w-[80%]">
        <CvResults seekers={seekers} total={total} />
        {seekers.length < total && <CustomPagination totalItems={total} />}
      </div>
    </div>
  );
};

export default page;
