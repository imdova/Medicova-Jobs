import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import { Download, ExpandMore, Search } from "@mui/icons-material";
import { useState, useEffect, MouseEvent, SyntheticEvent } from "react";
import DataTable from "@/components/UI/data-table";
import { Company, FieldConfig, Result, Sector } from "@/types";
import Avatar from "@/components/UI/Avatar";
import Link from "next/link";
import { formatDate } from "@/util";
import useFetch from "@/hooks/useFetch";
import {
  API_GET_COMPANY_SECTORS,
  API_GET_COMPANY_TYPES_BY_SECTOR,
} from "@/api/admin";
import { useLocationData } from "@/hooks/useLocationData";
import { CheckboxField } from "@/components/form/FormModal/FormField/CheckboxField";
import { TAGS } from "@/api";
import { API_UPDATE_COMPANY } from "@/api/employer";
import useUpdateApi from "@/hooks/useUpdateApi";
import { CompanyStatus } from "@/constants/enums/company-status.enum";
import { Filter } from "lucide-react";
import { SelectField } from "@/components/form/FormModal/FormField/SelectField";
import { FormField } from "@/components/form/FormModal/FormField/FormField";
import { employerFilters } from "@/constants";
import FilterDrawer from "@/components/UI/FilterDrawer";
import { updateItemInArray } from "@/util/general";
import { searchCompanies } from "@/lib/actions/employer.actions";

const tabs = [
  "New Employers",
  "Top Employers",
  "Active Employers",
  "Inactive Employers",
] as const;

interface EmployerFilter {
  country: string;
  sector: string;
  companyType: string;
  status: string;
  date: string;
}

interface ApiFilters {
  page: number;
  limit: number;
  q: string;
  countryCode: string;
  companyTypeId: string;
  status: string;
  dateFrom: string;
  dateTo: string;
}

const OverviewEmployersTable: React.FC<{
  companies: PaginatedResponse<Company> | null;
  updateCompanyData?: React.Dispatch<
    React.SetStateAction<PaginatedResponse<Company> | null>
  >;
}> = ({ companies: companiesData, updateCompanyData }) => {
  const { countries } = useLocationData();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { update } = useUpdateApi<Company>();
  const { data: companies = [], total = 0 } = companiesData || {};
  const [selected, setSelected] = useState<(number | string)[]>([]);
  const [activeTab, setActiveTab] = useState<string>(tabs[0]);

  // State for API filters
  const [apiFilters, setApiFilters] = useState<ApiFilters>({
    page: 1,
    limit: 10,
    q: "",
    countryCode: "",
    companyTypeId: "",
    status: "",
    dateFrom: "",
    dateTo: "",
  });

  // Local state for filter form
  const [filterForm, setFilterForm] = useState<EmployerFilter>({
    country: "",
    sector: "",
    companyType: "",
    status: "",
    date: "",
  });

  const { data: sectors } = useFetch<PaginatedResponse<Sector>>(
    API_GET_COMPANY_SECTORS,
  );
  const { data: types } = useFetch<PaginatedResponse<Sector>>(
    filterForm?.sector
      ? `${API_GET_COMPANY_TYPES_BY_SECTOR}${filterForm.sector}`
      : null,
    { fetchOnce: false, fetchOnUrlChange: true },
  );

  const [exportAnchorEl, setExportAnchorEl] = useState<HTMLElement | null>(
    null,
  );
  const exportOpen = Boolean(exportAnchorEl);

  // Handle tab change to filter by status
  const handleTabChange = (e: SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);

    // Map tab names to status filters
    const statusMap: Record<string, string> = {
      "Active Employers": "active",
      "Inactive Employers": "inactive",
      // Add other tabs if needed
    };

    const status = statusMap[newValue] || "";
    setApiFilters((prev) => ({
      ...prev,
      status,
      page: 1, // Reset to first page when changing tabs
    }));
  };

  // Fetch companies when filters change
  useEffect(() => {
    const fetchCompanies = async () => {
      const result: Result<PaginatedResponse<Company>> =
        await searchCompanies(apiFilters);
      if (result.success && result.data) {
        updateCompanyData?.(result.data);
      }
    };
    fetchCompanies();
  }, [apiFilters]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiFilters((prev) => ({ ...prev, q: e.target.value, page: 1 }));
  };

  // Update date filters when date changes in form
  const handleFilterFormChange = (newFormData: EmployerFilter) => {
    setFilterForm(newFormData);

    // Convert date string to proper format if needed
    const dateFrom = newFormData.date
      ? new Date(newFormData.date).toISOString()
      : "";
    const dateTo = newFormData.date
      ? new Date(
          new Date(newFormData.date).setHours(23, 59, 59, 999),
        ).toISOString()
      : "";

    setApiFilters((prev) => ({
      ...prev,
      page: 1,
      countryCode: newFormData.country,
      companyTypeId: newFormData.companyType,
      status: newFormData.status?.toLowerCase(),
      dateFrom,
      dateTo,
    }));
  };

  const exportHandleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setExportAnchorEl(event.currentTarget);
  };

  const exportHandleClose = () => {
    setExportAnchorEl(null);
  };

  const updateCompany = async (body: Company) => {
    const newCompanyData = await update(
      API_UPDATE_COMPANY,
      { body },
      TAGS.company,
    );
    if (newCompanyData) {
      const newCompanies = updateItemInArray(companies, newCompanyData);
      updateCompanyData?.({ data: newCompanies, total });
    }
  };

  const fields: FieldConfig<EmployerFilter>[] = [
    {
      name: "country",
      type: "search-select",
      textFieldProps: {
        placeholder: "country",
      },
      options: countries.map((country) => ({
        value: country.isoCode,
        label: country.name,
      })),
    },
    {
      name: "sector",
      type: "select",
      textFieldProps: {
        placeholder: "Sector",
      },
      resetFields: ["companyType"],
      options:
        sectors?.data.map((sector: Sector) => ({
          value: sector.id,
          label: sector.name,
        })) || [],
      gridProps: { xs: 6 },
    },
    {
      name: "companyType",
      type: "select",
      textFieldProps: {
        placeholder: "Company Type",
      },
      dependsOn: "sector",
      options:
        types?.data.map((type: Sector) => ({
          value: type.id,
          label: type.name,
        })) || [],
      gridProps: { xs: 6 },
    },
    {
      name: "status",
      type: "select",
      textFieldProps: {
        placeholder: "Status",
      },
      options: ["active", "inactive"].map((status) => ({
        value: status,
        label: status,
      })),
    },
    {
      name: "date",
      type: "date",
      textFieldProps: {
        placeholder: "Registration Date",
      },
      onChange: (value: string) => {
        handleFilterFormChange({
          ...filterForm,
          date: value,
        });
      },
    },
  ];

  return (
    <div className="space-y-1">
      <div className="overflow-hidden rounded-base border border-gray-200 bg-white shadow-soft">
        <div className="flex flex-col justify-between md:flex-row md:items-end">
          <div>
            <h5 className="p-4 pb-1 text-xl font-semibold text-main">
              All Employers
              <span className="ml-1 text-xs text-secondary">({total})</span>
            </h5>
            <div className="body-container overflow-x-auto">
              <Tabs
                value={activeTab}
                onChange={handleTabChange} // Use our custom handler
                aria-label="basic tabs example"
                variant="scrollable"
                scrollButtons={false}
                className="text-base"
              >
                {tabs.map((tab) => (
                  <Tab
                    key={tab}
                    className="text-nowrap text-xs"
                    label={tab}
                    value={tab}
                  />
                ))}
              </Tabs>
            </div>
          </div>
          <div className="m-2 flex flex-wrap items-end gap-2">
            <TextField
              variant="outlined"
              placeholder="Search For Employer"
              value={apiFilters.q}
              InputProps={{
                startAdornment: <Search />,
              }}
              onChange={handleSearch}
            />

            <div>
              <Button
                onClick={exportHandleClick}
                variant="outlined"
                aria-controls={exportOpen ? "export-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={exportOpen ? "true" : undefined}
                className="space-x-2"
              >
                <Download className="inline-block h-5 w-5" />
                <p className="inline-block text-sm">Export</p>
                <ExpandMore className="inline-block h-5 w-5" />
              </Button>
              <Menu
                id="export-menu"
                anchorEl={exportAnchorEl}
                open={exportOpen}
                onClose={exportHandleClose}
                className="mt-2"
              >
                <MenuItem className="hover:bg-gray-200">PDF</MenuItem>
                <MenuItem className="hover:bg-gray-200">Excel (CSV)</MenuItem>
              </Menu>
            </div>
          </div>
        </div>
      </div>
      <div className="body-container flex flex-wrap gap-2 overflow-hidden overflow-x-auto rounded-base border border-gray-200 bg-white p-3 shadow-soft md:flex-nowrap">
        {fields.map((field) => (
          <div className="flex-1" key={field.name}>
            <FormField
              field={field}
              data={filterForm}
              setData={handleFilterFormChange}
            />
          </div>
        ))}

        <IconButton
          onClick={() => setIsFilterOpen(true)}
          className="h-[42px] w-[42px] rounded-base border border-solid border-zinc-400 p-2 text-primary hover:border-primary"
        >
          <Filter className="h-4 w-4" />
        </IconButton>
        <FilterDrawer
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          sections={employerFilters}
        />
      </div>
      <div className="body-container overflow-x-auto">
        <DataTable
          data={companies}
          total={total}
          selected={selected}
          setSelected={setSelected}
          searchQuery={apiFilters.q}
          fixedNumberPerPage={apiFilters.limit}
          cellClassName="p-2 text-sm"
          headerClassName="text-sm"
          columns={[
            {
              key: "name",
              header: "Name",
              sortable: true,
              render: (item: Company) => (
                <div className="flex items-center gap-2">
                  <Avatar src={item.avatar} />
                  <div>
                    <Link
                      className="transition hover:text-primary"
                      href={`/admin/employers/${item.id}`}
                    >
                      <h6 className="line-clamp-1 text-sm">{item.name}</h6>
                    </Link>
                    <Link
                      href={`mailto:${item.email}`}
                      className="line-clamp-1 break-all text-xs underline hover:no-underline"
                    >
                      {item.email}
                    </Link>
                  </div>
                </div>
              ),
            },
            {
              key: "created_at",
              header: "Reg Date",
              sortable: true,
              render: (item: Company) => formatDate(item.created_at),
            },
            {
              key: "phone",
              header: "Phone",
              sortable: true,
              render: (item: Company) => item.phone,
            },
            {
              key: "country.name",
              header: "Country",
              sortable: true,
              render: (item: Company) => item.country?.name,
            },
            {
              key: "companyTypeName",
              header: "Type",
              render: (item: Company) => (
                <span className="text-sm">
                  {
                    types?.data?.find(
                      (type: Sector) => type.id === item.companyTypeName,
                    )?.name
                  }
                </span>
              ),
            },
            {
              key: "companySectorName",
              header: "Sector",
              render: (item: Company) => (
                <span className="text-sm">
                  {
                    sectors?.data?.find(
                      (sector: Sector) => sector.id === item.companySectorId,
                    )?.name
                  }
                </span>
              ),
            },
            {
              header: "plan",
              render: (item: Company) => (
                <SelectField
                  field={{
                    name: "plan",
                    type: "select",
                    textFieldProps: {
                      className: "bg-transparent",
                      sx: {
                        "& .MuiOutlinedInput-notchedOutline": {
                          padding: 0,
                          border: "none",
                        },
                      },
                    },
                    options: ["silver", "gold", "diamond"].map((x) => ({
                      value: x,
                      label: x,
                    })),
                  }}
                  controllerField={{
                    value: "silver",
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                      console.log(e.target.value),
                  }}
                />
              ),
            },
            {
              key: "openJobs",
              header: "Jobs",
              render: () => <span className="text-sm">25</span>,
            },
            {
              key: "status",
              header: "Status",
              render: (item: Company) => (
                <CheckboxField
                  field={{
                    name: "status",
                    type: "checkbox",
                  }}
                  controllerField={{
                    value: item.status === CompanyStatus.ACTIVE,
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                      updateCompany({
                        ...item,
                        status: e.target.checked
                          ? CompanyStatus.ACTIVE
                          : CompanyStatus.INACTIVE,
                      }),
                  }}
                />
              ),
            },
            {
              header: "Action",
              render: (item: Company) => handleStatus(item),
            },
          ]}
        />
      </div>
    </div>
  );
};

const handleStatus = (company: Company) => {
  const stateStyles: Record<string, string> = {
    active:
      "bg-green-50 text-green-700 ring-green-600/20 border-green-500 bg-inputDark text-green-500",
    inactive:
      "bg-red-50 text-red-700 ring-red-600/10 border-red-500 bg-inputDark text-red-500",
  };

  const status = company.status || "inactive";

  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${stateStyles[status]}`}
    >
      {status}
    </span>
  );
};

export default OverviewEmployersTable;
