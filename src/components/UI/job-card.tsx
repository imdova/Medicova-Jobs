import { Box, Card, Chip, Grid, IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Controls from "@/components/UI/Controls";
import Image from "next/image";
import PaidIcon from "@mui/icons-material/Paid";

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
        className="flex-wrap md:flex-nowrap justify-center md:justify-between"
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
              <Typography
                variant="h6"
                sx={{ color: "#25324B", fontWeight: "600", fontSize: "20px" }}
              >
                {post.name}
              </Typography>
              <IconButton size="small" aria-label="edit">
                <EditIcon sx={{ fontSize: 18, color: "#185D43" }} />
              </IconButton>
            </Box>
            <div className="flex items-center justify-center md:justify-start text-[12px] my-2 text-black/50 flex-wrap max-w-[400px]">
              {post.features.map((feature, index) => (
                <p key={index} className="mr-3 flex items-center gap-1  ">
                  <span className=" w-[5px] h-[5px] bg-yellow-500 rounded-full ring-1 ring-yellow-500"></span>
                  <span className="text-[12px]">{feature}</span>
                </p>
              ))}
              <p className="mr-3 flex items-center gap-1  ">
                <PaidIcon className="text-yellow-500 w-4 h-4" />
                <span className="text-[12px]">{post.budget}</span>
              </p>
            </div>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: { xs: "center", sm: "flex-start" },
                gap: 1,
                mt: 1,
              }}
            >
              <Chip
                sx={{ color: "#185D43" }}
                label={post.category}
                variant="outlined"
              />
              <Chip
                sx={{ color: "#185D43" }}
                label={post.specialty}
                variant="outlined"
              />
              <Chip
                sx={{ color: "#185D43" }}
                avatar={
                  <Image
                    src="/images/flag-egypt.jpg"
                    alt="egypt flag"
                    width={20}
                    height={20}
                    className="mr-2 object-contain"
                  />
                }
                label={post.country}
                variant="outlined"
              />
            </Box>
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
