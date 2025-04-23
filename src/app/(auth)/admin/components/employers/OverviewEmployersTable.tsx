import {
  Button,
  ButtonGroup,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import {
  Download,
  ExpandMore,
  LocationOn,
  Search,
  Tune,
} from "@mui/icons-material";
import { useState } from "react";
import DataTable from "@/components/UI/data-table";
import { Company, Sector } from "@/types";
import Avatar from "@/components/UI/Avatar";
import Link from "next/link";
import { formatDate } from "@/util";
import useFetch from "@/hooks/useFetch";
import {
  API_GET_COMPANY_SECTORS,
  API_GET_COMPANY_TYPES,
  API_GET_COMPANY_TYPES_BY_SECTOR,
} from "@/api/admin";
import SearchableSelect from "@/components/UI/SearchableSelect";
import Flag from "@/components/UI/flagitem";
import { useLocationData } from "@/hooks/useLocationData";
import DatePickerField from "@/components/form/FormModal/FormField/DatePickerField";
import { CheckboxField } from "@/components/form/FormModal/FormField/CheckboxField";
import { TAGS } from "@/api";
import { API_UPDATE_COMPANY } from "@/api/employer";
import useUpdateApi from "@/hooks/useUpdateApi";
import { CompanyStatus } from "@/constants/enums/company-status.enum";
import { Filter } from "lucide-react";
import { SelectField } from "@/components/form/FormModal/FormField/SelectField";
import { FormField } from "@/components/form/FormModal/FormField/FormField";

const tabs = [
  "New Employers",
  "Top Employers",
  "Active Employers",
  "Inactive Employers",
];

const OverviewEmployersTable: React.FC<{
  companies: PaginatedResponse<Company> | null;
}> = ({ companies: companiesData }) => {
  const { countries } = useLocationData();
  const { isLoading, error, update } = useUpdateApi<Company>();

  const { data: companies, total } = companiesData || { data: [], total: 0 };
  const [selected, setSelected] = useState<(number | string)[]>([]);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [query, setQuery] = useState("");
  const [sector, setSector] = useState("");

  const [data, setData] = useState({});

  console.log(data);

  const { data: sectors } = useFetch<PaginatedResponse<Sector>>(
    API_GET_COMPANY_SECTORS,
  );
  const { data: types } = useFetch<PaginatedResponse<Sector>>(
    sector ? API_GET_COMPANY_TYPES_BY_SECTOR + sector : null,
    {
      fetchOnce: false,
      fetchOnUrlChange: true,
    },
  );

  const [exportAnchorEl, setExportAnchorEl] = useState(null);
  const exportOpen = Boolean(exportAnchorEl);
  const exportHandleClick = (event: any) => {
    setExportAnchorEl(event.currentTarget);
  };
  const exportHandleClose = () => {
    setExportAnchorEl(null);
  };
  // TODO: Fix
  const updateCompany = async (body: Company) => {
    await update(API_UPDATE_COMPANY, { method: "POST", body }, TAGS.company);
  };

  return (
    <div className="space-y-1">
      <div className="overflow-hidden rounded-base border border-gray-200 bg-white shadow-soft">
        <div className="flex flex-col items-end justify-between md:flex-row">
          <div>
            <h5 className="p-4 pb-1 text-xl font-semibold text-main">
              All Employers
              <span className="ml-1 text-xs text-secondary">(4,050)</span>
            </h5>
            <div className="max-w-full">
              <Tabs
                value={activeTab}
                onChange={(e, v) => setActiveTab(v)}
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
              value={query}
              InputProps={{
                startAdornment: <Search />,
              }}
              onChange={(e) => setQuery(e.target.value)}
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
      {selected.length > 0 && (
        <div className="body-container flex gap-2 overflow-hidden overflow-x-auto rounded-base border border-gray-200 bg-white p-3 shadow-soft">
          <SearchableSelect
            options={countries.map((x) => ({
              label: x.name,
              value: x.isoCode,
            }))}
            // value={country}
            // onChange={(e) => steCountry(e.target.value)}
            className="flex-1"
            variant="outlined"
            displayEmpty
            renderValue={(selected: string) => {
              if (!selected) {
                return <em className="text-gray-400">Select Country</em>;
              }
              const item = countries.find((x) => x.isoCode == selected);
              return (
                item && (
                  <span>
                    <Flag
                      code={item.isoCode.toLocaleLowerCase()}
                      name={item.name}
                      className="mr-2 inline"
                    />
                    {item.name}
                  </span>
                )
              );
            }}
            sx={{
              backgroundColor: "white",
              borderRadius: "8px",
            }}
          />
          <Select
            value={sector}
            onChange={(e) => setSector(e.target.value)}
            className="flex-1"
            variant="outlined"
            displayEmpty
            renderValue={(selected: string) => {
              if (!selected) {
                return <em className="text-gray-400">Select Sector</em>;
              }
              const item = sectors?.data.find((x) => x.id == selected);
              return item && <span>{item.name}</span>;
            }}
            sx={{
              backgroundColor: "white",
              borderRadius: "8px",
            }}
          >
            {sectors?.data.map((sector) => (
              <MenuItem
                key={sector.id}
                className="text-xs md:text-sm"
                value={"Sector"}
              >
                {sector.name}
              </MenuItem>
            ))}
          </Select>

          <div className="flex-1">
            <SelectField
              field={{
                name: "type",
                type: "select",
                textFieldProps: {
                  placeholder: "Select Company Type",
                },
                dependsOn: "sector",
                options: types?.data.map((type) => ({
                  label: type.name,
                  value: type.id,
                })),
              }}
              controllerField={{ onChange: (e) => console.log(e.target.value) }}
              formValues={{ sector }}
              dependsOnField={{ name: "sector" }}
            />
          </div>
          <div className="flex-1">
            <FormField
              field={{
                name: "status",
                type: "select",
                options: ["active", "inActive"].map((type) => ({
                  label: type,
                  value: type,
                })),
              }}
              data={data}
              setData={setData}
            />
          </div>

          <div className="w-52">
            <DatePickerField
              field={{
                name: "date",
                type: "date",
                textFieldProps: {
                  placeholder: "Date",
                },
              }}
            />
          </div>

          <IconButton className="h-[42px] w-[42px] rounded-base border border-solid border-zinc-400 p-2 text-primary hover:border-primary">
            <Filter className="h-4 w-4" />
          </IconButton>
        </div>
      )}
      <div className="body-container overflow-x-auto">
        <DataTable
          data={companies}
          total={total}
          selected={selected}
          setSelected={setSelected}
          searchQuery={query}
          cellClassName="p-2 text-sm"
          headerClassName="text-sm"
          columns={[
            {
              key: "name",
              header: "Name",
              sortable: true,
              render: (item) => (
                <div className="flex items-center gap-2">
                  <Avatar src={item.avatar} />
                  <div>
                    <h6 className="line-clamp-1 text-sm">{item.name}</h6>
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
              render: (item) => formatDate(item.created_at),
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
            },
            {
              key: "companyTypeName",
              header: "Type",
              render: (item) => (
                <span className="text-sm">
                  {
                    types?.data?.find(
                      (type) => type.id === item.companyTypeName,
                    )?.name
                  }
                </span>
              ),
            },
            {
              key: "companySectorName",
              header: "Sector",
              render: (item) => (
                <span className="text-sm">
                  {
                    sectors?.data?.find(
                      (sector) => sector.id === item.companySectorId,
                    )?.name
                  }
                </span>
              ),
            },
            {
              header: "plan",
              render: () => <span className="text-sm">Premium</span>,
            },
            {
              key: "openJobs",
              header: "Jobs",
              render: () => <span className="text-sm">25</span>,
            },
            {
              key: "status",
              header: "Status",
              render: (item) => (
                <CheckboxField
                  field={{
                    name: "status",
                    type: "checkbox",
                  }}
                  controllerField={{
                    value: item.status === CompanyStatus.ACTIVE,
                    onChange: (e) =>
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
              render: handleStatus,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default OverviewEmployersTable;

const handleStatus = (company: Company) => {
  const stateStyles: Record<NonNullable<Company["status"]>, string> = {
    active:
      "bg-green-50 text-green-700 ring-green-600/20 border-green-500 bg-inputDark text-green-500",
    inactive:
      "bg-red-50 text-red-700 ring-red-600/10 border-red-500 bg-inputDark text-red-500",
  };

  return company.status ? (
    <span
      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${stateStyles[company.status]}`}
    >
      {company.status}
    </span>
  ) : (
    <span
      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${stateStyles.inactive}`}
    >
      inactive
    </span>
  );
};
