"use client";
import { useState } from "react";
import {
    Button,
    IconButton,
    ButtonProps as MuiButtonProps,
    IconButtonProps,
    Tooltip
} from "@mui/material";
import PostJobModal from "./post-job-modal";
import { Company } from "@/types";

// Define btnVariant types
type Variant = "button" | "icon";

// Combine props with btnVariant-specific exclusions
interface BaseProps {
    company: Company;
    children: React.ReactNode;
    btnVariant?: Variant;
    title?: string;
    disabled?: boolean;
}

interface ButtonSpecificProps extends Omit<MuiButtonProps, "onClick"> {
    btnVariant?: "button";
}

interface IconSpecificProps extends Omit<IconButtonProps, "onClick"> {
    btnVariant?: "icon";
}

type AddNewJobButtonProps = BaseProps & (ButtonSpecificProps | IconSpecificProps);

const AddNewJobButton: React.FC<AddNewJobButtonProps> = ({
    children,
    company,
    btnVariant = "icon", // default to icon
    ...props
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const onOpen = () => setIsModalOpen(true);
    const onClose = () => setIsModalOpen(false);



    // Render the appropriate component based on btnVariant
    const renderButton = () => {
        if (btnVariant === "button") {
            return (
                <Button
                    {...(props as MuiButtonProps)}
                    onClick={onOpen}
                >
                    {children}
                </Button>
            );
        }

        return (
            <IconButton
                {...(props as IconButtonProps)}
                onClick={onOpen}
            >
                {children}
            </IconButton>
        );
    };

    return (
        <>
            <PostJobModal
                key={"body-post-job"}
                company={company}
                isOpen={isModalOpen}
                onClose={onClose}
            />
            <Tooltip title={props.title}>
                {/* Wrap in span to prevent Tooltip disabled button issue */}
                <span>{renderButton()}</span>
            </Tooltip>
        </>
    );
};

export default AddNewJobButton;