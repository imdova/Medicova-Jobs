"use client"
import { useState } from "react"
import { Add } from "@mui/icons-material"
import { IconButton, Tooltip } from "@mui/material"
import PostJobModal from "./post-job-modal"
import { Company } from "@/types"

const AddNewJobButton: React.FC<{ company: Company }> = ({ company }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const onOpen = () => setIsModalOpen(true);
    const onClose = () => setIsModalOpen(false);

    return (
        <>
            <PostJobModal key="body-post-job" company={company} isOpen={isModalOpen} onClose={onClose} />
            <Tooltip title="Post New Job">
                <IconButton
                    onClick={onOpen}
                    className="rounded border border-solid border-gray-300 p-2"
                >
                    <Add />
                </IconButton>
            </Tooltip>
        </>
    )
}

export default AddNewJobButton