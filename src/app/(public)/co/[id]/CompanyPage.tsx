"use client";

import { Company, UserState } from "@/types";
import { useSession } from "next-auth/react";
import Loading from "@/components/loading/loading";
import { useEffect, useState } from "react";
import { getEmployeeOfCompany } from "@/lib/actions/employer.actions";
import EmployerHeaderSection from "./Components/EmployerHeaderSection";
import AboutCompany from "./Components/AboutCompany";
import CompanyJobs from "./Components/CompanyJobs";
import CompleteProfile from "../../me/[id]/Components/CompleteProfile";
import {
  EmployerSocialMedia,
  PostYourFirstJob,
} from "./Components/employer-RightSection";

const CompanyPage = ({ company }: { company: Company }) => {
  const { data: session, status } = useSession();
  const [employees, setEmployees] = useState<{ id: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const user = session?.user as UserState;
  const [isEmployee, setIsEmployee] = useState(false);

  const initData = async () => {
    const response = await getEmployeeOfCompany(company.id);
    if (response.success && response.data) {
      setEmployees(response.data.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    initData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!user?.id) return;
    if (!employees.length) return;
    setIsEmployee(employees.some((employee) => employee.id === user?.id));
  }, [employees, user?.id]);

  if (status === "loading" || loading) {
    return <Loading />;
  }
  return (
    <div className="relative w-full">
      <div className="flex gap-5">
        {/* Left + Center Sections */}
        <div className="flex-1">
          {/* Header Section */}
          <EmployerHeaderSection isEmployee={isEmployee} data={company} />
          {/* Left Section */}
          <AboutCompany company={company} isEmployee={isEmployee} />
          {/* Center Section + Profile Form */}
          <CompanyJobs isEmployee={isEmployee} company={company} />
        </div>
        {/* Right Sections */}
        <div className="hidden min-w-80 max-w-80 md:block">
          {/* Public Profile Section */}
          {isEmployee && (
            <CompleteProfile percentage={company?.completencePercent} />
          )}
          {isEmployee && <PostYourFirstJob company={company} />}
          <EmployerSocialMedia data={company} isEmployee={isEmployee} />
          {/* Complete Profile Section */}
          {/* Public Profile Section */}
          {/* <PublicProfile /> */}
        </div>
      </div>
    </div>
  );
};
export default CompanyPage;
