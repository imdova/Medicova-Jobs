"use client";
import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Link from "next/link";
import CustomPagination from "@/components/UI/CustomPagination";

const companiesData = [
  {
    id: "#",
    name: "Stripe",
    location: "Cairo, Egypt",
    type: "Hospital",
    employees: "100-150 Employee",
    jobs: "7 Jobs",
    logo: "S",
    description:
      "Stripe is a software platform for starting and running internet businesses.",
  },
  {
    id: "#",
    name: "Alpha",
    location: "Paris, France",
    type: "Pharmacy",
    employees: "100-150 Employee",
    jobs: "2 Jobs",
    logo: "A",
    description: "Alpha is a platform for businesses in the healthcare sector.",
  },
  {
    id: "#",
    name: "Alpha",
    location: "Paris, France",
    type: "Pharmacy",
    employees: "100-150 Employee",
    jobs: "5 Jobs",
    logo: "A",
    description: "Alpha is a platform for businesses in the healthcare sector.",
  },
  {
    id: "#",
    name: "Stripe",
    location: "Cairo, Egypt",
    type: "Hospital",
    employees: "100-150 Employee",
    jobs: "4 Jobs",
    logo: "S",
    description:
      "Stripe is a software platform for starting and running internet businesses.",
  },
  {
    id: "#",
    name: "Coinbase",
    location: "Paris, France",
    type: "Pharmacy",
    employees: "100-150 Employee",
    jobs: "1 Job",
    logo: "C",
    description:
      "Coinbase is a platform for buying, selling, and managing cryptocurrency.",
  },
  {
    id: "#",
    name: "Croser",
    location: "Paris, France",
    type: "Pharmacy",
    employees: "100-150 Employee",
    jobs: "8 Jobs",
    logo: "C",
    description:
      "Croser is a pharmacy offering a wide range of pharmaceutical products.",
  },
];

const BrowseCompaniesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalItems = companiesData.length;

  // Calculate the range of companies to display based on the current page and items per page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCompanies = companiesData.slice(startIndex, endIndex);

  return (
    <Box sx={{ p: 2 }}>
      {/* Search and Filters Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          my: 2,
          p: 2,
          borderRadius: "12px",
          border: "1px solid #ddd",
          backgroundColor: "#fff",
        }}
      >
        {/* Text Input with Icon */}
        <TextField
          fullWidth
          placeholder="Company title or keyword"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            backgroundColor: "white",
            borderRadius: "8px",
          }}
        />

        {/* Select Input with Icon */}
        <TextField
          fullWidth
          select
          variant="outlined"
          defaultValue="Company type"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MedicalServicesIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            backgroundColor: "white",
            borderRadius: "8px",
          }}
        >
          <MenuItem disabled value="Company type">
            Select Company Type
          </MenuItem>
          <MenuItem value="Hospital">Hospital</MenuItem>
          <MenuItem value="Pharmacy">Pharmacy</MenuItem>
          <MenuItem value="Finance">Finance</MenuItem>
          <MenuItem value="Technology">Technology</MenuItem>
        </TextField>

        {/* Text Input for Location with Icon */}
        <TextField
          fullWidth
          placeholder="Italy"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocationOnIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            backgroundColor: "white",
            borderRadius: "8px",
          }}
        />

        {/* Search Button */}
        <Button
          variant="contained"
          sx={{
            textTransform: "none",
            fontWeight: "bold",
            px: 4,
            width: { xs: "100%", md: "50%" },
          }}
        >
          Search
        </Button>
      </Box>

      <p className="mb-3 text-secondary">
        Popular : Twitter, Microsoft, Apple, Facebook
      </p>

      {/* Results Header */}
      <Box>
        {/* Title Section */}
        <h4 className="mb-1 text-[30px] font-bold text-main">All Companies</h4>

        {/* Showing Results and Sort Options */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <p className="text-secondary">
            Showing {companiesData.length} results
          </p>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="body2"
                sx={{ mr: 1, color: "var(--text-main)" }}
              >
                Sort by:
              </Typography>
              <Select size="small" defaultValue="most" sx={{ minWidth: 120 }}>
                <MenuItem value="most">Most relevant</MenuItem>
                <MenuItem value="recent">Most recent</MenuItem>
              </Select>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Companies List */}
      <Grid container spacing={3}>
        {paginatedCompanies.map((company, index) => (
          <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
            <Card
              sx={{
                display: "flex", // Enable flexbox to make sure all cards have the same height
                flexDirection: "column", // Ensure content is stacked vertically
                border: "1px solid var(--primary)",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                height: "100%", // Make card fill available space
              }}
            >
              <CardContent sx={{ flex: 1 }}>
                {/* Header with Square Avatar */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    mb: 2,
                  }}
                >
                  <Avatar
                    variant="square"
                    sx={{
                      bgcolor: "var(--primary)",
                      color: "white",
                      width: 80,
                      height: 80,
                      borderRadius: "4px",
                    }}
                  >
                    {company.logo}
                  </Avatar>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", color: "var(--text-main)" }}
                    >
                      {company.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "var(--text-secondary)" }}
                    >
                      {company.employees}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "var(--primary)",
                        backgroundColor: "var(--primary-100)",
                        padding: "4px",
                        maxWidth: "fit-content",
                      }}
                    >
                      {company.jobs}
                    </Typography>
                  </Box>
                </Box>

                {/* Location and Type in One Row */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    mb: 1,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <LocationOnIcon
                      sx={{ color: "var(--text-secondary)", fontSize: 16 }}
                    />
                    <Typography
                      variant="body2"
                      sx={{ color: "var(--text-secondary)" }}
                    >
                      {company.location}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <MedicalServicesIcon
                      sx={{ color: "var(--text-secondary)", fontSize: 16 }}
                    />
                    <Typography
                      variant="body2"
                      sx={{ color: "var(--text-secondary)" }}
                    >
                      {company.type}
                    </Typography>
                  </Box>
                </Box>

                {/* Description */}
                <Box sx={{ maxWidth: "fit-content", my: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{ color: "var(--text-secondary)" }}
                  >
                    {company.description}
                  </Typography>
                </Box>

                {/* View Full Profile Link */}
                <Box sx={{ textAlign: "right", mt: 2 }}>
                  <Link
                    href={`/job-seeker/browse-companies/${company.id}`}
                    style={{
                      fontWeight: "bold",
                      color: "var(--primary)",
                      textDecoration: "underline",
                    }}
                  >
                    View full profile
                  </Link>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* Pagination */}
      <CustomPagination
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalItems={totalItems}
      />
    </Box>
  );
};

export default BrowseCompaniesPage;
