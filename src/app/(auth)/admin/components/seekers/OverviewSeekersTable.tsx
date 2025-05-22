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
import { useState, useEffect, SyntheticEvent } from "react";
import DataTable from "@/components/UI/data-table";
import { FieldConfig, JobCategory, Result, SpecialtyItem } from "@/types";
import Avatar from "@/components/UI/Avatar";
import Link from "next/link";
import { formatDate, formatName } from "@/util";
import useFetch from "@/hooks/useFetch";
import { useLocationData } from "@/hooks/useLocationData";
import { FormField } from "@/components/form/FormModal/FormField/FormField";
import { API_GET_SEEKERS, API_UPDATE_SEEKER } from "@/api/seeker";
import useUpdateApi from "@/hooks/useUpdateApi";
import { TAGS } from "@/api";
import { API_GET_CATEGORIES, API_GET_SPECIALITIES } from "@/api/admin";
import { Eye, Filter, Edit, Trash, MessageSquare, Mail } from "lucide-react";
import { updateItemInArray } from "@/util/general";
import { SeekerSearchFilter } from "@/types/jobs";
import { searchSeekers } from "@/lib/actions/applications.actions";
import FilterDrawer from "@/components/UI/FilterDrawer";
import { searchFilters } from "@/constants";
import { useSearchParams } from "next/navigation";
import { EducationLevel } from "@/constants/enums/education-level.enum";

const tabs = [
  "All Seekers",
  "New Seekers",
  "Active Seekers",
  "Inactive Seekers",
] as const;

type TabValue = (typeof tabs)[number];

interface ApiFilters extends SeekerSearchFilter {
  page: number;
  limit: number;
  q: string;
  active?: boolean;
}

const SeekersTable: React.FC = () => {
  const { data: seekersData, setData } =
    useFetch<PaginatedResponse<UserProfile>>(API_GET_SEEKERS);
  const { countries, states } = useLocationData();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { isLoading, error, update } = useUpdateApi<UserProfile>();
  const { data: seekers = [], total = 0 } = seekersData || {};
  const [selected, setSelected] = useState<(number | string)[]>([]);
  const [activeTab, setActiveTab] = useState<TabValue>("All Seekers");
  const [query, setQuery] = useState("");
  const searchParams = useSearchParams();

  const { data: categories } =
    useFetch<PaginatedResponse<JobCategory>>(API_GET_CATEGORIES);
  const { data: specialities } =
    useFetch<PaginatedResponse<SpecialtyItem>>(API_GET_SPECIALITIES);

  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  // State for API filters
  const [apiFilters, setApiFilters] = useState<ApiFilters>({
    page: page,
    limit: limit,
    q: "",
    countryCode: [],
    educationLevel: [],
    specialityIds: [],
    categoryIds: [],
  });

  // Local state for filter form
  const [filterForm, setFilterForm] = useState<SeekerSearchFilter>({
    countryCode: [],
    educationLevel: [],
    specialityIds: [],
    categoryIds: [],
  });

  const [exportAnchorEl, setExportAnchorEl] = useState<HTMLElement | null>(
    null,
  );
  const exportOpen = Boolean(exportAnchorEl);

  // Handle tab changes
  const handleTabChange = (e: SyntheticEvent, newValue: TabValue) => {
    setActiveTab(newValue);

    const tabFilters: Partial<ApiFilters> = (() => {
      switch (newValue) {
        case "Active Seekers":
          return { active: true };
        case "Inactive Seekers":
          return { active: false };
        case "New Seekers":
          return { isNew: true };
        default: // "All Seekers"
          return {};
      }
    })();

    // setApiFilters((prev) => ({
    //   ...prev,
    //   ...tabFilters,
    //   page: 1, // Reset to first page
    // }));
  };

  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setApiFilters((prev) => ({
      ...prev,
      q: e.target.value,
      page: 1,
    }));
  };

  // Handle form filter changes
  const handleFilterChange = (newFormData: SeekerSearchFilter) => {
    setFilterForm(newFormData);
    setApiFilters((prev) => ({
      ...prev,
      page: 1,
      countryCode: newFormData.countryCode || [],
      nationality: newFormData.nationality || [],
      educationLevel: newFormData.educationLevel || [],
      specialityIds: newFormData.specialityIds || [],
      categoryIds: newFormData.categoryIds || [],
    }));
  };

  // Fetch seekers when filters change
  useEffect(() => {
    const fetchSeekers = async () => {
      const result: Result<PaginatedResponse<UserProfile>> =
        await searchSeekers(apiFilters);
      if (result.success && result.data) {
        setData?.(result.data);
      }
    };
    fetchSeekers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiFilters, page, limit]);

  const updateSeeker = async (body: UserProfile) => {
    const newSeekerData = await update(
      API_UPDATE_SEEKER,
      { body },
      TAGS.profile,
    );
    if (newSeekerData) {
      const newSeekers = updateItemInArray(seekers, newSeekerData);
      setData?.({ data: newSeekers, total });
    }
  };

  const fields: FieldConfig<SeekerSearchFilter>[] = [
    {
      name: "countryCode",
      type: "select",
      textFieldProps: {
        placeholder: "Country",
      },
      options: countries.map((country) => ({
        value: country.isoCode,
        label: country.name,
      })),
    },
    {
      name: "educationLevel",
      type: "select",
      textFieldProps: {
        placeholder: "Education Level",
      },
      options: EducationLevel
        ? Object.values(EducationLevel).map((level) => ({
            value: level,
            label: level,
          }))
        : [],
    },
    {
      name: "specialityIds",
      type: "select",
      textFieldProps: {
        placeholder: "Specialties",
      },
      options:
        specialities?.data.map((spec) => ({
          value: spec.id,
          label: spec.name,
        })) || [],
    },
    {
      name: "categoryIds",
      type: "select",
      textFieldProps: {
        placeholder: "Categories",
      },
      options:
        categories?.data.map((cat) => ({
          value: cat.id,
          label: cat.name,
        })) || [],
    },
  ];

  return (
    <div className="grid grid-cols-1 space-y-1">
      <div className="overflow-hidden rounded-base border border-gray-200 bg-white shadow-soft">
        <div className="flex flex-col justify-between md:flex-row md:items-end">
          <div className="w-full">
            <div className="flex flex-col justify-between gap-3 md:flex-row">
              <h5 className="w-full p-4 pb-1 text-xl font-semibold text-main">
                All Seekers
                <span className="ml-1 text-xs text-secondary">({total})</span>
              </h5>
              <div className="flex w-full flex-col flex-wrap items-end gap-2 p-2 md:flex-row">
                <TextField
                  className="w-full flex-1"
                  variant="outlined"
                  placeholder="Search Seekers"
                  value={query}
                  InputProps={{
                    startAdornment: <Search />,
                  }}
                  onChange={handleSearch}
                />

                <div className="w-full md:w-fit">
                  <Button
                    // onClick={exportHandleClick}
                    variant="outlined"
                    aria-controls={exportOpen ? "export-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={exportOpen ? "true" : undefined}
                    className="w-full space-x-2 p-3 md:min-w-[120px]"
                  >
                    <Download className="inline-block h-5 w-5" />
                    <p className="inline-block text-sm">Export</p>
                    <ExpandMore className="inline-block h-5 w-5" />
                  </Button>
                  <Menu
                    id="export-menu"
                    anchorEl={exportAnchorEl}
                    open={exportOpen}
                    // onClose={exportHandleClose}
                    className="mt-2"
                  >
                    <MenuItem className="hover:bg-gray-200">PDF</MenuItem>
                    <MenuItem className="hover:bg-gray-200">
                      Excel (CSV)
                    </MenuItem>
                  </Menu>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1">
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                aria-label="Seeker tabs"
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
        </div>
      </div>
      <div className="body-container flex flex-wrap gap-2 overflow-hidden overflow-x-auto rounded-base border border-gray-200 bg-white p-3 shadow-soft md:flex-nowrap">
        {fields.map((field) => (
          <div className="flex-1" key={field.name}>
            <FormField
              field={field}
              data={filterForm}
              setData={handleFilterChange}
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
          sections={searchFilters}
        />
      </div>
      <div className="body-container overflow-x-auto">
        <DataTable
          data={seekers}
          total={total}
          selected={selected}
          setSelected={setSelected}
          searchQuery={apiFilters.q}
          cellClassName="p-2 text-sm"
          headerClassName="py-2 text-sm"
          options={[
            {
              label: "View",
              icon: <Eye className="h-4 w-4" />,
              action: () => console.log("Viewing", ""),
            },
            {
              label: "Edit",
              icon: <Edit className="h-4 w-4" />,
              action: () => console.log("Editing", ""),
            },
            {
              label: "Delete",
              icon: <Trash className="h-4 w-4 text-red-500" />,
              action: () => console.log("Deleting", ""),
            },
            {
              label: "Send Message",
              icon: <MessageSquare className="h-4 w-4" />,
              action: () => console.log("Sending Message", ""),
            },
            {
              label: "Send Email",
              icon: <Mail className="h-4 w-4" />,
              action: () => console.log("Sending Email", ""),
            },
          ]}
          columns={[
            {
              key: "firstName",
              header: "Name",
              sortable: true,
              render: (item) => (
                <div className="flex items-center gap-2">
                  <Avatar src={item.avatar} />
                  <div>
                    <Link
                      href={`/admin/seekers/${item.userName}`}
                      className="line-clamp-1 text-sm"
                    >
                      {formatName(item, true)}
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
              header: "Applied Day",
              sortable: true,
              render: (item) => formatDate(item.created_at),
            },
            {
              key: "phone",
              header: "Phone",
              sortable: true,
            },
            {
              header: "Location",
              render: (item) =>
                [item.city, item.state?.name, item.country?.name]
                  .filter(Boolean)
                  .join(", "),
            },
            {
              key: "category",
              header: "Category",
              sortable: true,
            },
            {
              key: "speciality",
              header: "Specialty",
              sortable: true,
            },
            {
              key: "careerLevel",
              header: "Career Level",
              sortable: true,
            },
            // {
            //   header: "Education",
            //   render: (item) => <p>
            //     {item.title}
            //   </p> // Replace with actual education data if different
            // },
            {
              header: "Age",
              render: (item) => {
                if (!item.birthDate) return "-";
                const birthYear = new Date(item.birthDate).getFullYear();
                const currentYear = new Date().getFullYear();
                return currentYear - birthYear;
              },
            },
            // {
            //   header: "Experience",
            //   render: (item) =>
            //     item.total_years_experience != null
            //       ? `${item.total_years_experience} yrs`
            //       : "-",
            // },
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

export default SeekersTable;
