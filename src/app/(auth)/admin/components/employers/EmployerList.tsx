"use client";

import useFetch from "@/hooks/useFetch";
import OverviewEmployersTable from "./OverviewEmployersTable";
import { Company } from "@/types";
import { API_GET_COMPANIES } from "@/api/employer";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { toQueryString } from "@/util/general";

const EmployerList: React.FC = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const {
    data: companies,
    loading,
    setData,
  } = useFetch<PaginatedResponse<Company>>(
    API_GET_COMPANIES + toQueryString({ page }),
    {
      fetchOnce: false,
      fetchOnUrlChange: true,
    },
  );
  return (
    <div className="box-content !p-0">
      <OverviewEmployersTable />
    </div>
  );
};
const EmployerListPanel: React.FC = () => {
  return (
    <Suspense>
      <EmployerList />
    </Suspense>
  );
};

export default EmployerListPanel;
