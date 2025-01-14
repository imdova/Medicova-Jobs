import React, { useState } from "react";
import MinJobCard from "@/components/UI/job-card-min";
import { Button, IconButton, Tooltip } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Job } from "@/types";
import EmptyCard from "@/components/UI/emptyCard";

const INITIAL_VISIBLE_ITEMS = 4;
const CompanyJobs: React.FC<{
  data: Job[];
  isMe: boolean;
}> = ({ data, isMe }) => {
  const [visibleItems, setVisibleItems] = useState(INITIAL_VISIBLE_ITEMS);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    if (isExpanded) {
      setVisibleItems(INITIAL_VISIBLE_ITEMS);
    } else {
      setVisibleItems(data.length);
    }
    setIsExpanded(!isExpanded);
  };
  const remainingItems = data.length - visibleItems;

  if (!isMe && data.length === 0) {
    return null;
  }
  return (
    <div className="mt-5">
      {/* Title */}
      <div className="flex items-center justify-between rounded-base border border-gray-100 bg-white p-3 shadow-lg md:p-5">
        <h3 className="text-2xl font-bold text-main">Latest jobs:</h3>
        {isMe && (
          <Tooltip title="Post New Job">
            <IconButton className="rounded border border-solid border-gray-300 p-2">
              <Add />
            </IconButton>
          </Tooltip>
        )}
      </div>
      {/* Loop through MinJobCard 8 times */}
      {data.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 gap-2 md:grid-cols-2">
          {/* card  */}
          {data.slice(0, visibleItems).map((job, i) => (
            <MinJobCard key={i} job={job} />
          ))}
        </div>
      ) : isMe ? (
        <EmptyCard
          src={"/images/activities.png"}
          description={"Your Experiences will appear here."}
          buttonText="Add Experience"
          onClick={() => {}}
        />
      ) : null}
      {data.length > INITIAL_VISIBLE_ITEMS && (
        <div className="mt-5 flex items-center justify-center rounded-base border border-gray-100 bg-white p-3 shadow-lg">
          <Button className="mt-2 p-0" variant="text" onClick={handleToggle}>
            {isExpanded ? `Show less Jobs` : `Show ${remainingItems} more Jobs`}
          </Button>
        </div>
      )}
    </div>
  );
};

export default CompanyJobs;
