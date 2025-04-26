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
import { useState } from "react";
import DataTable from "@/components/UI/data-table";
import { Company, FieldConfig, Sector } from "@/types";
import Avatar from "@/components/UI/Avatar";
import Link from "next/link";
import { formatDate, formatName } from "@/util";
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
import { API_UPDATE_SEEKER } from "@/api/seeker";

const tabs = [
  "New Employers",
  "Top Employers",
  "Active Employers",
  "Inactive Employers",
];

const initialFilter = {
  country: "",
  sector: "",
  companyType: "",
  status: "",
  date: "",
};
interface EmployerFilter {
  country: string;
  sector: string;
  companyType: string;
  status: string;
  date: string;
}

const UsersTable: React.FC<{
  users: PaginatedResponse<UserProfile> | null;
  updateUsers?: React.Dispatch<
    React.SetStateAction<PaginatedResponse<UserProfile> | null>
  >;
}> = ({ users: usersData, updateUsers }) => {
  const { countries } = useLocationData();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const openFilter = () => setIsFilterOpen(true);
  const closeFilter = () => setIsFilterOpen(false);

  const { isLoading, error, update } = useUpdateApi<UserProfile>();

  const { data: users, total } = usersData || { data: [], total: 0 };
  const [selected, setSelected] = useState<(number | string)[]>([]);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [query, setQuery] = useState("");

  const [data, setData] = useState({} as EmployerFilter);

  const { data: sectors } = useFetch<PaginatedResponse<Sector>>(
    API_GET_COMPANY_SECTORS,
  );
  const { data: types } = useFetch<PaginatedResponse<Sector>>(
    data?.sector ? API_GET_COMPANY_TYPES_BY_SECTOR + data?.sector : null,
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

  const updateCompany = async (body: UserProfile) => {
    const newUserData = await update(API_UPDATE_SEEKER, { body }, TAGS.profile);
    const newCompanies = updateItemInArray(users, newUserData);
    updateUsers?.({ data: newCompanies, total });
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
      options: sectors?.data.map((sector) => ({
        value: sector.id,
        label: sector.name,
      })),
      gridProps: { xs: 6 },
    },
    {
      name: "companyType",
      type: "select",
      textFieldProps: {
        placeholder: "Company Type",
      },
      dependsOn: "sector",
      options: types?.data.map((type) => ({
        value: type.id,
        label: type.name,
      })),
      gridProps: { xs: 6 },
    },

    {
      name: "status",
      type: "select",
      textFieldProps: {
        placeholder: "Status",
      },
      options: ["active", "inActive"].map((status) => ({
        value: status,
        label: status,
      })),
    },
    {
      name: "date",
      type: "date",
      textFieldProps: {
        placeholder: "date",
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
              <span className="ml-1 text-xs text-secondary">(4,050)</span>
            </h5>
            <div className="body-container overflow-x-auto">
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
      <div className="body-container flex flex-wrap gap-2 overflow-hidden overflow-x-auto rounded-base border border-gray-200 bg-white p-3 shadow-soft md:flex-nowrap">
        {fields.map((field) => (
          <div className="flex-1" key={field.name}>
            <FormField field={field} data={data} setData={setData} />
          </div>
        ))}

        <IconButton
          onClick={openFilter}
          className="h-[42px] w-[42px] rounded-base border border-solid border-zinc-400 p-2 text-primary hover:border-primary"
        >
          <Filter className="h-4 w-4" />
        </IconButton>
        <FilterDrawer
          isOpen={isFilterOpen}
          onClose={closeFilter}
          sections={employerFilters}
        />
      </div>
      <div className="body-container overflow-x-auto">
        <DataTable
          data={users}
          total={total}
          selected={selected}
          setSelected={setSelected}
          searchQuery={query}
          cellClassName="p-2 text-sm"
          headerClassName="text-sm"
          columns={[
            {
              key: "firstName",
              header: "Name",
              sortable: true,
              render: (item) => (
                <div className="flex items-center gap-2">
                  <Avatar src={item.avatar} />
                  <div>
                    <h6 className="line-clamp-1 text-sm">
                      {formatName(item, true)}
                    </h6>
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
              header: "plan",
              render: (item) => (
                <SelectField
                  field={{
                    name: "plan",
                    type: "select",
                    textFieldProps: {
                      className: "bg-transparent ",
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
                    onChange: (e) => console.log(e.target.value),
                  }}
                />
              ),
            },
            // {
            //   key: "status",
            //   header: "Status",
            //   render: (item) => (
            //     <CheckboxField
            //       field={{
            //         name: "status",
            //         type: "checkbox",
            //       }}
            //       controllerField={{
            //         value: item.status === CompanyStatus.ACTIVE,
            //         onChange: (e) =>
            //           updateCompany({
            //             ...item,
            //             status: e.target.checked
            //               ? CompanyStatus.ACTIVE
            //               : CompanyStatus.INACTIVE,
            //           }),
            //       }}
            //     />
            //   ),
            // },
            // {
            //   header: "Action",
            //   render: handleStatus,
            // },
          ]}
        />
      </div>
    </div>
  );
};

export default UsersTable;

// const handleStatus = (user: UserProfile) => {
//   const stateStyles: Record<NonNullable<UserProfile["isPublic"]>, string> = {
//     active:
//       "bg-green-50 text-green-700 ring-green-600/20 border-green-500 bg-inputDark text-green-500",
//     inactive:
//       "bg-red-50 text-red-700 ring-red-600/10 border-red-500 bg-inputDark text-red-500",
//   };

//   return company.status ? (
//     <span
//       className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${stateStyles[company.status]}`}
//     >
//       {company.status}
//     </span>
//   ) : (
//     <span
//       className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${stateStyles.inactive}`}
//     >
//       inactive
//     </span>
//   );
// };
