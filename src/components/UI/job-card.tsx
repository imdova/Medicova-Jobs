import { Box, Card, Chip, Grid, IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Controls from "@/components/UI/Controls";
import Image from "next/image";
import PaidIcon from "@mui/icons-material/Paid";
import Flag from "./flagitem";

const post = {
  image: "https://randomuser.me/api/portraits/men/1.jpg",
  date: "since 6 days",
  name: "Consultant Cardiology",
  features: [
    "Full Time",
    "Onsite",
    "Master’s Degree",
    "Cardio-vascular",
    "Male and Female",
    "Consultant",
    "EX (3-5) Years",
  ],
  budget: "20000 EGP",
  country: "Egypt",
  category: "Cardiology",
  specialty: "doctors",
  applicant: "10",
  maxApplicant: "50",
};

const JobCard = () => {
  return (
    <Grid item xs={12}>
      <Card
        className="flex-wrap justify-center md:flex-nowrap md:justify-between"
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "10px 20px",
        }}
      >
        {/* Main Content Area */}
        <Box
          sx={{
            display: "flex",
            flexWrap: { xs: "wrap", sm: "nowrap" },
            gap: 2,
            alignItems: { xs: "center", sm: "flex-start" },
            justifyContent: { xs: "center", sm: "space-between" },
          }}
        >
          {/* Image Section */}
          <Box sx={{ textAlign: "center" }}>
            <Box
              component="img"
              src="/images/logo.png"
              alt="Consultant"
              sx={{
                width: 100,
                height: 100,
                borderRadius: 2,
                objectFit: "cover",
              }}
            />
            <Typography
              variant="body2"
              sx={{ marginTop: 1, color: "#00000080" }}
            >
              {post.date}
            </Typography>
          </Box>

          {/* Info Section */}
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: { xs: "center", sm: "flex-start" },
                gap: 1,
              }}
            >
              <h6 className="text-main text-[20px] font-semibold">
                {post.name}
              </h6>

              <IconButton size="small" aria-label="edit">
                <EditIcon className="text-light-primary h-5 w-5" />
              </IconButton>
            </Box>
            <div className="text-secondary my-2 flex max-w-[400px] flex-wrap items-center justify-center text-[12px] md:justify-start">
              {post.features.map((feature, index) => (
                <p key={index} className="mr-3 flex items-center gap-1">
                  <span className="bg-secondary ring-secondary h-[5px] w-[5px] rounded-full ring-1"></span>
                  <span className="text-[12px]">{feature}</span>
                </p>
              ))}
              <p className="mr-3 flex items-center gap-1">
                <PaidIcon className="text-secondary h-4 w-4" />
                <span className="text-[12px]">{post.budget}</span>
              </p>
            </div>

            <div className="flex gap-3">
              <button className="hover:bg-primary border-light-primary text-main hover:text-primary-foreground rounded-[10px] border px-4 py-2 text-xs font-semibold transition-colors duration-300 focus:ring-2 focus:ring-white md:text-base">
                Healthcare
              </button>
              <button className="hover:bg-primary border-light-primary text-main hover:text-primary-foreground rounded-[10px] border px-4 py-2 text-xs font-semibold transition-colors duration-300 focus:ring-2 focus:ring-white md:text-base">
                Doctors
              </button>
              <button className="hover:bg-primary border-light-primary text-main hover:text-primary-foreground flex items-center gap-2 rounded-[10px] border px-4 py-2 text-xs font-semibold transition-colors duration-300 focus:ring-2 focus:ring-white md:text-base">
                Egypt
                <Flag code="eg" name="egypt" />
              </button>
            </div>
          </Box>
        </Box>
        {/* Actions Section */}

        {/* Switch and Icon Buttons Row */}

        <Controls />
      </Card>
    </Grid>
  );
};

export default JobCard;
