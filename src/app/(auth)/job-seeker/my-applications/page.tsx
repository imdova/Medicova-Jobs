"use client";
import React, { useState } from "react";
import {
  Box, Typography, IconButton, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Chip, Avatar, Paper,
  Button, Menu, MenuItem, InputAdornment, TextField, Tabs,
  Tab, ListItemIcon
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import CustomPagination from "@/components/UI/CustomPagination";

// Types
interface Application {
  id: number;
  companyName: string;
  companyLogo: string;
  role: string;
  dateApplied: string;
  status: "Review" | "Viewed" | "Shortlisted" | "Interviewed" | "Accepted" | "Rejected";
}

interface TabOption {
  label: string;
  count: number;
  value: string;
}

// Constants
const STATUS_COLORS = {
  Review: { text: "#FFB800", bg: "#FFF5DD" },
  Viewed: { text: "#00B8D9", bg: "#E6FCFF" },
  Shortlisted: { text: "#6554C0", bg: "#EAE6FF" },
  Interviewed: { text: "#9747FF", bg: "#F3E8FF" },
  Accepted: { text: "#36B37E", bg: "#E3FCEF" },
  Rejected: { text: "#FF5630", bg: "#FFE9E5" }
};

const applications: Application[] = [
  {
    id: 1,
    companyName: "Nomad",
    companyLogo: "N",
    role: "Medical Assistant",
    dateApplied: "24 July 2021",
    status: "Review"
  },
  {
    id: 2,
    companyName: "Udacity",
    companyLogo: "U",
    role: "Medical Assistant",
    dateApplied: "20 July 2021",
    status: "Viewed"
  },
  {
    id: 3,
    companyName: "Packer",
    companyLogo: "P",
    role: "Medical Assistant",
    dateApplied: "16 July 2021",
    status: "Shortlisted"
  },
  {
    id: 4,
    companyName: "Divvy",
    companyLogo: "D",
    role: "Medical Assistant",
    dateApplied: "14 July 2021",
    status: "Interviewed"
  },
  {
    id: 5,
    companyName: "DigitalOcean",
    companyLogo: "D",
    role: "Medical Assistant",
    dateApplied: "10 July 2021",
    status: "Accepted"
  },
  {
    id: 6,
    companyName: "DigitalOcean",
    companyLogo: "D",
    role: "Medical Assistant",
    dateApplied: "10 July 2021",
    status: "Rejected"
  }
];

const tabOptions: TabOption[] = [
  { label: "All", count: 45, value: "all" },
  { label: "Review", count: 34, value: "review" },
  { label: "Viewed", count: 18, value: "viewed" },
  { label: "Shortlisted", count: 5, value: "shortlisted" },
  { label: "Interviewed", count: 2, value: "interviewed" },
  { label: "Accepted", count: 1, value: "accepted" },
  { label: "Rejected", count: 1, value: "rejected" }
];

const MyApplicationsPage = () => {
  // State
  const [selectedTab, setSelectedTab] = useState("all");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([null, null]);

  // Derived state
  const filteredApplications = applications.filter(
    app => selectedTab === "all" || app.status.toLowerCase() === selectedTab
  );
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPageApplications = filteredApplications.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Handlers
  const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
  };

  const handleDateChange = (newValue: Dayjs | null) => {
    setDateRange(prev => !prev[0] ? [newValue, null] : [prev[0], newValue]);
  };

  // Components
  const HeaderSection = () => (
    <Box sx={{ mb: 4, p: 1 }}>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
        Keep it up, Jake
      </Typography>
      <Box sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 2
      }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <CalendarTodayIcon sx={{ fontSize: 14, color: "text.secondary" }} />
          <Typography variant="body2" color="text.secondary">
            Here is job applications status from
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker value={dateRange[0]} onChange={handleDateChange} />
            {dateRange[0] && dateRange[1] && (
              <Typography variant="body2" color="text.secondary">
                {dateRange[0]?.format("MMM D, YYYY")} - {dateRange[1]?.format("MMM D, YYYY")}
              </Typography>
            )}
          </LocalizationProvider>
        </Box>
      </Box>
    </Box>
  );

  const SearchAndFilterSection = () => (
    <Box sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      mb: 2,
      flexDirection: { xs: "column", sm: "row" },
      gap: 2
    }}>
      <Typography variant="h6">Applications History</Typography>
      <Box sx={{
        display: "flex",
        gap: 2,
        width: { xs: "100%", sm: "auto" }
      }}>
        <TextField
          size="small"
          placeholder="Search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ minWidth: 200 }}
        />
        <Button
          variant="outlined"
          startIcon={<FilterListIcon />}
          onClick={e => setFilterAnchorEl(e.currentTarget)}
        >
          Filter
        </Button>
      </Box>
    </Box>
  );

  const ApplicationsTable = () => (
    <TableContainer component={Paper} elevation={0} sx={{ 
      border: "1px solid #E0E0E0",
      backgroundColor: "#F9F9F9"
    }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Company Name</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Date Applied</TableCell>
            <TableCell>Status</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPageApplications.map(app => (
            <TableRow key={app.id} sx={{
              "&:hover": { backgroundColor: "#ffffff" },
              transition: "background-color 0.2s ease"
            }}>
              <TableCell>{app.id}</TableCell>
              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar sx={{ width: 40, height: 40 }}>{app.companyLogo}</Avatar>
                  {app.companyName}
                </Box>
              </TableCell>
              <TableCell>{app.role}</TableCell>
              <TableCell>{app.dateApplied}</TableCell>
              <TableCell>
                <Chip
                  label={app.status}
                  sx={{
                    color: STATUS_COLORS[app.status].text,
                    bgcolor: STATUS_COLORS[app.status].bg,
                    border: "none",
                    borderRadius: "16px",
                    "& .MuiChip-label": { px: 2 }
                  }}
                />
              </TableCell>
              <TableCell>
                <IconButton onClick={e => setAnchorEl(e.currentTarget)}>
                  <MoreVertIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <HeaderSection />
      
      <Box sx={{ my: 2, backgroundColor: "#F9F9F9", p: 3, borderRadius: 2 }}>
        <SearchAndFilterSection />
        
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              minHeight: "48px",
              "& .MuiTab-root": {
                minHeight: "48px",
                textTransform: "none",
                fontSize: "14px"
              }
            }}
          >
            {tabOptions.map(tab => (
              <Tab
                key={tab.value}
                label={
                  <Box sx={{ display: "flex", gap: 0.5 }}>
                    <span>{tab.label}</span>
                    <span style={{ color: "#666" }}>({tab.count})</span>
                  </Box>
                }
                value={tab.value}
              />
            ))}
          </Tabs>
        </Box>

        <ApplicationsTable />

        <CustomPagination
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalItems={filteredApplications.length}
        />
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => setAnchorEl(null)}>
          <ListItemIcon>
            <KeyboardReturnIcon fontSize="small" />
          </ListItemIcon>
          Withdraw
        </MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>
          <ListItemIcon>
            <DeleteIcon sx={{ color: "#E34817" }} fontSize="small" />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>

      <Menu
        anchorEl={filterAnchorEl}
        open={Boolean(filterAnchorEl)}
        onClose={() => setFilterAnchorEl(null)}
      >
        <MenuItem onClick={() => setFilterAnchorEl(null)}>Date: Newest First</MenuItem>
        <MenuItem onClick={() => setFilterAnchorEl(null)}>Date: Oldest First</MenuItem>
        <MenuItem onClick={() => setFilterAnchorEl(null)}>Status: Active</MenuItem>
        <MenuItem onClick={() => setFilterAnchorEl(null)}>Status: Closed</MenuItem>
      </Menu>
    </Box>
  );
};

export default MyApplicationsPage;