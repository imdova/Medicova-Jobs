import {
  Button,
  ButtonGroup,
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
import { Company, FieldConfig, Sector } from "@/types";
import Avatar from "@/components/UI/Avatar";
import Link from "next/link";
import { formatDate } from "@/util";
import useFetch from "@/hooks/useFetch";
import { API_GET_COMPANY_SECTORS, API_GET_COMPANY_TYPES } from "@/api/admin";
import SearchableSelect from "@/components/UI/SearchableSelect";
import Flag from "@/components/UI/flagitem";
import { useLocationData } from "@/hooks/useLocationData";
import DatePickerField from "@/components/form/FormModal/FormField/DatePickerField";

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

  const { data: companies, total } = companiesData || { data: [], total: 0 };
  const [selected, setSelected] = useState<(number | string)[]>([]);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [query, setQuery] = useState("");

  const { data: sectors } = useFetch<PaginatedResponse<Sector>>(
    API_GET_COMPANY_SECTORS,
  );
  const { data: types } = useFetch<PaginatedResponse<Sector>>(
    API_GET_COMPANY_TYPES,
  );

  const [exportAnchorEl, setExportAnchorEl] = useState(null);
  const exportOpen = Boolean(exportAnchorEl);
  const exportHandleClick = (event: any) => {
    setExportAnchorEl(event.currentTarget);
  };
  const exportHandleClose = () => {
    setExportAnchorEl(null);
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
            <div className="max-w-[calc(100vw-40px)]">
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
          <div className="m-3 flex gap-2">
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
              >
                <Download className="mr-2 inline-block h-6 w-6" />
                <p className="inline-block w-16">Export</p>
                <ExpandMore className="ml-2 inline-block h-6 w-6" />
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
        <div className="flex max-w-full gap-2 overflow-hidden rounded-base border border-gray-200 bg-white p-3 shadow-soft">
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
          <Select
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
          <Select
            // value={country}
            // onChange={(e) => steCountry(e.target.value)}
            variant="outlined"
            className="flex-1"
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
          <div className="w-32">
            <DatePickerField
              field={{
                name: "date",
                type: "date",
                textFieldProps:{
                  placeholder:"Date"
                }
              }}
            />
          </div>

          <Button variant="outlined">
            <Tune className="mr-2 inline-block h-6 w-6" />
            <p className="inline-block w-16">Filter</p>
          </Button>
        </div>
      )}
      <div className="max-w-[calc(100vw-1rem)]">
        <DataTable
          data={companies}
          total={total}
          selected={selected}
          setSelected={setSelected}
          searchQuery={query}
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
                      className="line-clamp-1 break-all text-sm underline hover:no-underline"
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
                <span>
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
                <span>
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
              render: () => <span>Premium</span>,
            },
            {
              key: "openJobs",
              header: "Jobs",
              render: () => <span>25</span>,
            },
            {
              key: "status",
              header: "Status",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default OverviewEmployersTable;
