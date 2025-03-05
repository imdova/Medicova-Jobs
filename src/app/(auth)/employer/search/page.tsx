import CvResults from "./cv-results";
import { getSeekers } from "@/lib/actions/applications.actions";

const ApplicantsPage: React.FC = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const { q: query } = searchParams as {
    [key: string]: string;
  };

  const result = await getSeekers();
  if (!result.success || !result.data) return <h1>No Candidates found</h1>;
  const { data: candidates, total } = result.data;
  return <CvResults candidates={candidates} />;
};

export default ApplicantsPage;
