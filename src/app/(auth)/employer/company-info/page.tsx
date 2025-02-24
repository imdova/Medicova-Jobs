import CompanyInfoForm from "@/components/pages/companyInfo/companyForm";
import { getCompanyByUserName } from "@/lib/actions/employer.actions";
import { authOptions } from "@/lib/auth/config";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";


const page = async () => {
  const data = await getServerSession(authOptions);
  const user = data?.user
  if (!user?.companyUserName) return notFound()
  const { success, data: company } = await getCompanyByUserName(user?.companyUserName);
  if (!success || !company) return notFound()

  return (<CompanyInfoForm company={company} />
  );
};
export default page;
