import { getCompanyByUserName } from "@/lib/actions/employer.actions";
import { redirect } from "next/navigation";
import CompanyPage from "./CompanyPage";

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const { success, data: company } = await getCompanyByUserName(id);
  if (!success || !company) return redirect("/employer/company-info");
  return <CompanyPage company={company} />;
};

export default Page;
