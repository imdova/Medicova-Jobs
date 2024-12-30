import React from "react";
import { Grid, Card } from "@mui/material";
import MinJobCard from "@/components/UI/job-card-min";

const JobCard: React.FC = () => {
  return (
    <Grid item xs={12}>
      <Card className="p-4">
        {/* Title */}
        <h3 className="mb-3 text-2xl font-semibold text-main">Latest jobs:</h3>
        {/* Loop through MinJobCard 8 times */}
        <Grid container spacing={2}>
          {Array.from({ length: 8 }).map((_, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <MinJobCard />
            </Grid>
          ))}
        </Grid>
      </Card>
    </Grid>
  );
};

export default JobCard;
