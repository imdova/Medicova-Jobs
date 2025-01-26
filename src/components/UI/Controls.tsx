import {
  Button,
  Divider,
  IconButton,
  LinearProgress,
  Menu,
  MenuItem,
  Switch,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PauseIcon from "@mui/icons-material/Pause";
import React, { useState } from "react";
import ShareMenu from "@/components/UI/ShareMenu";
import Link from "next/link";
import { deleteJob } from "@/lib/actions/job.actions";
import { JobData } from "@/types";
import { fetchJobs } from "@/store/slices/jobSlice";
import { useAppDispatch } from "@/store/hooks";
import { ContentCopy } from "@mui/icons-material";

const Controls: React.FC = () => {
  return (
    <div className="flex w-full flex-col text-center md:w-auto">
      <div className="flex items-center justify-center gap-1">
        <ShareMenu link="https://medicova.com" />
        <Switch color="primary" defaultChecked />
        {/* <DropdownMenu /> */}
      </div>
      <LinearProgress
        variant="determinate"
        value={30}
        className="my-2 h-2"
        color="primary"
      />
      <p className="font-semibold">10 applicants</p>
      <Button variant="contained" className="text-nowrap px-10">
        View applicants
      </Button>
    </div>
  );
};

export const DropdownMenu = ({ job }: { job: JobData }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useAppDispatch();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = async () => {
    setDeleteLoading(true);
    if (job.id) {
      const result = await deleteJob(job.id);
      if (result.success) {
        if (job.companyId || job.company?.id) {
          dispatch(fetchJobs(job.companyId || job.company?.id || ""));
        }
      }
    }
    setDeleteLoading(false);
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <IconButton
        size="medium"
        onClick={handleClick}
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <MoreVertIcon className="h-7 w-7" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        className="mt-2"
      >
        <MenuItem>
          <Link
            className="flex w-60 items-center gap-2"
            href={`/employer/job/posted/${job.id}`}
            onClick={handleClose}
          >
            <EditIcon color="primary" fontSize="small" />
            <span>Edit </span>
          </Link>
        </MenuItem>
        <Divider className="!m-0" />
        <MenuItem>
          <Link
            className="flex w-60 items-center gap-2"
            href={`/employer/job/posted/${job.id}`}
            onClick={handleClose}
          >
            <ContentCopy color="primary" fontSize="small" />
            <span>Duplicate</span>
          </Link>
        </MenuItem>
        <Divider className="!m-0" />
        <Divider className="!m-0" />
        <MenuItem onClick={handleClose} className="flex items-center gap-2">
          <PauseIcon color="warning" fontSize="small" />
          <span>Close Job</span>
        </MenuItem>
        <Divider className="!m-0" />
        <MenuItem onClick={handleDelete} className="flex items-center gap-2">
          <DeleteIcon color="error" fontSize="small" />
          <span>{deleteLoading ? "Removing..." : "Remove"}</span>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default Controls;
