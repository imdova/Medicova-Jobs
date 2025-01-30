import { getCompanyById } from "@/lib/actions/employer.actions";
import { notFound, redirect } from "next/navigation";
import CompanyPage from "./CompanyPage";

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const { success, data: company } = await getCompanyById(id);
  if (!success || !company) return redirect("/employer/company-info");
  return <CompanyPage company={company} />;
};

export default Page;
