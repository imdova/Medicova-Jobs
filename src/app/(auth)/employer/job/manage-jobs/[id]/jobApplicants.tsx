"use client";
import {
  Tabs,
  Tab,
  Select,
  MenuItem,
  Menu,
  Divider,
  InputLabel,
  FormControl,
} from "@mui/material";
import React, { useState } from "react";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import StarIcon from "@mui/icons-material/Star";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SelectAllIcon from "@mui/icons-material/SelectAll";
import DeselectIcon from "@mui/icons-material/Deselect";
import { Delete, Mail } from "@mui/icons-material";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import { Doctor } from "@/types";
import ApplicantCard from "@/components/UI/ApplicantCard";
import { useSession } from "next-auth/react";
import { filterApplicants } from "@/util/user/applicants";

const tabs: { key: TapType; title: string; icon: React.ReactNode }[] = [
  { key: "all", title: "All Applicants", icon: null },
  {
    key: "locked",
    title: "Locked",
    icon: <LockIcon className="mr-2 h-4 w-4 text-red-500" />,
  },
  {
    key: "unlocked",
    title: "Unlocked",
    icon: <LockOpenIcon className="mr-2 h-4 w-4 text-green-500" />,
  },
  {
    key: "shortListed",
    title: "Shortlisted",
    icon: <StarIcon className="mr-2 h-4 w-4 text-yellow-500" />,
  },
];

const JobApplicantsResult: React.FC<{
  applications: ApplicationsType[];
}> = ({ applications }) => {
  const { data: session } = useSession();
  const user = session?.user;
  const companyId = user?.companyId || "";

  const [selectedTab, setSelectedTab] = useState<TapType>("all");

  const [selected, setSelected] = useState<string[]>([]);
  const isAllSelect = selected.length === applications.length;
  const toggleSelectAll = () => {
    if (isAllSelect) {
      setSelected([]);
    } else {
      setSelected(applications.map((x) => x.id || ""));
    }
  };

  // actions
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // export
  const [exportAnchorEl, setExportAnchorEl] = useState(null);
  const exportOpen = Boolean(exportAnchorEl);
  const exportHandleClick = (event: any) => {
    setExportAnchorEl(event.currentTarget);
  };
  const exportHandleClose = () => {
    setExportAnchorEl(null);
  };

  return (
    <div className="w-full p-2 md:p-4 lg:w-[80%]">
      <div className="w-full pl-[39px]">
        <h2 className="mb-5 text-3xl font-bold text-main">{"job.title"}</h2>
      </div>

      <div className="flex justify-between pl-[39px]">
        <div className="max-w-[calc(100vw-64px)]">
          <Tabs
            value={selectedTab}
            onChange={(e, newValue) => setSelectedTab(newValue)}
            // variant="scrollable"
            // scrollButtons="auto"
            aria-label="responsive tabs example"
          >
            {tabs.map((tab) => (
              <Tab
                key={tab.key}
                value={tab.key}
                label={
                  <span className="flex items-center normal-case">
                    {tab.icon}
                    {tab.title} (
                    {filterApplicants(applications, tab.key).length})
                  </span>
                }
              />
            ))}
          </Tabs>
        </div>
        <FormControl className="hidden min-w-32 md:block">
          <InputLabel id="sort-by-select-label">Sort by</InputLabel>
          <Select
            className="flex h-12"
            value=""
            label="Sort by"
            labelId="sort-by-select-label"
            id="sort-by-select-label"
            onChange={(e) => console.log(e.target.value)}
          >
            <MenuItem value="time-desc">Newest</MenuItem>
            <MenuItem value="time-asc">Oldest</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="mb-4 mt-2 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <button
            onClick={toggleSelectAll}
            className="h-[32px] w-[32px] bg-primary-100"
          >
            {isAllSelect ? (
              <DeselectIcon className="m-auto h-6 w-6" />
            ) : (
              <SelectAllIcon className="m-auto h-6 w-6" />
            )}
          </button>
          {selected.length > 0 && (
            <div>
              <button
                onClick={handleClick}
                aria-controls={open ? "Action-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                className="h-fit rounded-md bg-primary-100 p-2 px-4 duration-300 hover:bg-primary hover:text-primary-foreground"
              >
                <p className="inline-block">Action</p>
                <ExpandMoreIcon className="ml-2 inline-block h-6 w-6" />
              </button>
              <Menu
                id="Action-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                className="mt-2"
              >
                <MenuItem
                  onClick={handleClose}
                  className="flex items-center gap-2 hover:bg-gray-200"
                >
                  <Mail color="primary" className="h-5 w-5" />
                  Invite to Apply
                </MenuItem>
                <Divider className="!m-0" />
                <MenuItem
                  onClick={() => {
                    handleClose();
                    // addToAvailable();
                  }}
                  className="flex items-center gap-2 hover:bg-gray-200"
                >
                  <LockOpenIcon color="primary" className="h-5 w-5" />
                  Unlock Profile
                </MenuItem>
                <Divider className="!m-0" />
                <MenuItem
                  onClick={() => {
                    handleClose();
                    // addToShortListed();
                  }}
                  className="flex items-center gap-2 hover:bg-gray-200"
                >
                  <StarIcon color="primary" className="h-5 w-5" />
                  Add to Shortlist
                </MenuItem>
                <Divider className="!m-0" />
                <MenuItem
                  onClick={() => {
                    handleClose();
                    // removeFromShortListed();
                  }}
                  className="flex items-center gap-2 hover:bg-gray-200"
                >
                  <StarBorderOutlinedIcon color="warning" className="h-5 w-5" />
                  remove from Shortlist
                </MenuItem>
                {/* <Divider className="!m-0" /> */}
                {/* <MenuItem
                  onClick={handleClose}
                  className="flex items-center gap-2 hover:bg-gray-200"
                >
                  <Delete className="h-5 w-5" color="error" />
                  Delete
                </MenuItem> */}
              </Menu>
            </div>
          )}
        </div>
        <div>
          <button
            onClick={exportHandleClick}
            aria-controls={exportOpen ? "export-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={exportOpen ? "true" : undefined}
            className="h-fit rounded-md bg-primary-100 p-2 px-4 duration-300 hover:bg-primary hover:text-primary-foreground"
          >
            <p className="inline-block w-16">Export</p>
            <ExpandMoreIcon className="ml-2 inline-block h-6 w-6" />
          </button>
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
      {/* Applicant Cards */}
      {filterApplicants(applications, selectedTab).map((application) => (
        <ApplicantCard
          key={application.id}
          application={application}
          setSelected={setSelected}
          companyId={companyId}
          selected={selected}
        />
      ))}
    </div>
  );
};

export default JobApplicantsResult;

const filterDoctors = (
  doctors: Doctor[],
  activeTab: TapType,
  availableApplicants: string[],
  shortListed: string[],
) => {
  switch (activeTab) {
    case "all":
      return doctors;
    case "locked":
      return doctors.filter((obj) => !availableApplicants.includes(obj.id));
    case "unlocked":
      return doctors.filter((obj) => availableApplicants.includes(obj.id));
    case "shortListed":
      return doctors.filter((obj) => shortListed.includes(obj.id));
    default:
      return doctors;
  }
};
