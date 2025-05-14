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
import { useState, MouseEvent } from "react";
import DataTable from "@/components/UI/data-table";
import { Company, FieldConfig, SearchCompanyFilter, Sector } from "@/types";
import Avatar from "@/components/UI/Avatar";
import Link from "next/link";
import { formatDate } from "@/util";
import useFetch from "@/hooks/useFetch";

import { useLocationData } from "@/hooks/useLocationData";
import { CheckboxField } from "@/components/form/FormModal/FormField/CheckboxField";
import { TAGS } from "@/api";
import { API_SEARCH_COMPANIES, API_UPDATE_COMPANY } from "@/api/employer";
import useUpdateApi from "@/hooks/useUpdateApi";
import { CompanyStatus } from "@/constants/enums/company-status.enum";
import { Filter } from "lucide-react";
import { SelectField } from "@/components/form/FormModal/FormField/SelectField";
import { FormField } from "@/components/form/FormModal/FormField/FormField";
import { employerFilters } from "@/constants";
import FilterDrawer from "@/components/UI/FilterDrawer";
import { toQueryString, updateItemInArray } from "@/util/general";
import { useSearchParams } from "next/navigation";
import { useSectorData } from "@/hooks/useSectorData";

// Defining tab options as a const array for better type safety and maintainability
const tabs = [
  { name: "New Employers", value: "new" },
  { name: "Top Employers", value: "top" },
  { name: "Active Employers", value: "active" },
  { name: "Inactive Employers", value: "inactive" },
] as const;

// FilterType combines SearchCompanyFilter with additional filter options
// This allows us to have a single type for all filter-related state management
type FilterType = SearchCompanyFilter & {
  sector?: string;
  date?: string;
};

const OverviewEmployersTable: React.FC = () => {
  // Extract page and limit from URL query params with fallback values
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  // Initialize base filters that will be used for reset functionality
  const baseFilters: FilterType = {
    page: page,
    limit: limit,
  };

  // State management for filters that will be passed to the search API
  const [filters, setFilters] = useState<FilterType>(baseFilters);

  // Fetch rarely-changing data at component level to avoid unnecessary re-renders
  const { countries } = useLocationData();
  const { types } = useSectorData({ sector: "all" });

  // Convert filters to URL query string for API calls
  const queryParams = toQueryString(filters);

  // Setup API hooks for fetching and updating company data
  const { update } = useUpdateApi<Company>();
  const { data, loading, setData } = useFetch<PaginatedResponse<Company>>(
    API_SEARCH_COMPANIES + queryParams,
    {
      fetchOnUrlChange: true, // Re-fetch when URL changes
      fetchOnce: false, // Allow multiple fetches
    },
  );
  const { data: companies = [], total = 0 } = data || {};

  // UI state management
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selected, setSelected] = useState<(number | string)[]>([]);
  const [activeTab, setActiveTab] = useState<string>(tabs[0].value);

  // Handler for updating company data and refreshing the table
  const updateCompany = async (body: Company) => {
    const newCompany = await update(API_UPDATE_COMPANY, { body }, TAGS.company);
    if (newCompany) {
      const newCompanies = updateItemInArray(companies, newCompany);
      setData?.({ data: newCompanies, total, limit, page });
    }
  };

  // Filter field configurations
  // Note: Sector filter is temporarily commented out to simplify the UX
  const fields: FieldConfig<FilterType>[] = [
    {
      name: "countryCode",
      type: "search-select",
      textFieldProps: {
        placeholder: "country",
      },
      options: countries.map((country) => ({
        value: country.isoCode,
        label: country.name,
      })),
    },
    // Sector filter commented out temporarily
    // Will be re-implemented when we have a clearer UX for sector/type relationship
    // {
    //   name: "sector",
    //   type: "select",
    //   textFieldProps: {
    //     placeholder: "Sector",
    //   },
    //   resetFields: ["companyTypeId"],
    //   options:
    //     sectors?.map((sector: Sector) => ({
    //       value: sector.id,
    //       label: sector.name,
    //     })) || [],
    //   gridProps: { xs: 6 },
    // },
    {
      name: "companyTypeId",
      type: "select",
      textFieldProps: {
        placeholder: "Company Type",
      },
      options:
        types?.map((type: Sector) => ({
          value: type.id,
          label: type.name,
        })) || [],
      gridProps: { xs: 6 },
    },
    {
      name: "date",
      type: "date",
      textFieldProps: {
        placeholder: "Registration Date",
      },
    },
  ];

  // Export functionality state management
  // Grouped together for better organization of related state and handlers
  const [exportAnchorEl, setExportAnchorEl] = useState<HTMLElement | null>(
    null,
  );
  const exportOpen = Boolean(exportAnchorEl);
  const exportHandleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setExportAnchorEl(event.currentTarget);
  };
  const exportHandleClose = () => setExportAnchorEl(null);

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
                onChange={(e, value) => setActiveTab(value)}
                aria-label="basic tabs example"
                variant="scrollable"
                scrollButtons={false}
                className="text-base"
              >
                {tabs.map((tab) => (
                  <Tab
                    key={tab.value}
                    className="text-nowrap text-xs"
                    label={tab.name}
                    value={tab.value}
                  />
                ))}
              </Tabs>
            </div>
          </div>
          <div className="m-2 flex flex-wrap items-end gap-2">
            <TextField
              variant="outlined"
              placeholder="Search For Employer"
              value={filters.q}
              InputProps={{
                startAdornment: <Search />,
              }}
              onChange={(e) => setFilters({ ...filters, q: e.target.value })}
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
            <FormField field={field} data={filters} setData={setFilters} />
          </div>
        ))}

        <Button
          onClick={() => setFilters(baseFilters)}
          variant="outlined"
          className="text-nowrap"
        >
          Reset Filters
        </Button>
        <IconButton
          onClick={() => setIsFilterOpen(true)}
          className="w-12 rounded-base border border-solid border-zinc-400"
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
          searchQuery={filters.q}
          fixedNumberPerPage={filters.limit}
          cellClassName="p-2 text-sm"
          headerClassName="p-2 text-sm"
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
                      href={`/admin/employers/${item.username}`}
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
            },
            {
              key: "companySectorName",
              header: "Sector",
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
                        id: item.id,
                        email: item.email,
                        phone: item.phone,
                        status: e.target.checked
                          ? CompanyStatus.ACTIVE
                          : CompanyStatus.INACTIVE,
                      } as Company),
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
