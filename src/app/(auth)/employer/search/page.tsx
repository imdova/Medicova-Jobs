import Filter from "@/components/Layout/filter/filter";
import CvResults from "./cv-results";
import { getSeekers } from "@/lib/actions/applications.actions";
import { searchFilters } from "@/constants";

const page = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const { q: query } = searchParams as {
    [key: string]: string;
  };

  const result = await getSeekers();
  const { data: candidates, total } = result.data || { data: [], total: 0 };
  return (
    <div className="container mx-auto my-8 flex min-h-screen w-full flex-row gap-5 p-2 lg:max-w-[1170px]">
      <Filter
        sections={searchFilters}
        searchKeys={["Residency (Location)", "nationality"]}
      />
      <CvResults candidates={candidates} />
    </div>
  );
};

export default page;
