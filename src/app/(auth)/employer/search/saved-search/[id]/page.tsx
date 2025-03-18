import Image from "next/image";
import CustomPagination from "@/components/UI/CustomPagination";
import Filter from "@/components/Layout/filter/filter";
import { filterSections } from "@/constants";
import { notFound } from "next/navigation";
import {
  getFolderById,
  getPaginatedCandidatesByFolderId,
} from "@/lib/actions/employer.actions";
import FolderDetails from "./folder-details";

const page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const result = await getFolderById(id);
  if (!result.success || !result.data) return notFound;
  const folder = result.data;
  const candidateResult = await getPaginatedCandidatesByFolderId(id);
  const { data: candidates, total } = candidateResult.data || {
    data: [],
    total: 0,
  };
  return (
    <div className="flex min-h-screen w-full px-2">
      {/* Left Column: Filter Section */}
      <Filter sections={filterSections} searchKeys={["Residency (Location)"]} />
      {/* Right Column: Results Section */}
      <div className="w-full p-2 md:p-4 lg:w-[80%]">
        <div className="mb-5 flex w-full gap-3 pl-[32px]">
          <Image
            src={"/images/folder.svg"}
            alt="save"
            className="object-contain"
            width={24}
            height={24}
          />
          <h2 className="text-xl font-semibold text-main">{folder.name}</h2>
        </div>
        <FolderDetails candidates={candidates} />
        {/* Pagination */}
        {candidates.length < total && <CustomPagination totalItems={total} />}
      </div>
    </div>
  );
};

export default page;
