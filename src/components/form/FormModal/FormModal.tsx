'use client';
import React, { useEffect } from "react";
import { Dialog, DialogContent } from "@mui/material";
import useIsLeaving from "@/hooks/useIsLeaving";
import { ModalHeader } from "./ModalHeader";
import { FormContent } from "./FormContent";
import { useFieldVisibility } from "./hooks/useFieldVisibility";
import { getDefaultValues } from "@/util/forms";
import LeaveConfirmationModal from "@/components/UI/LeaveConfirmationModal";
import { useFormState } from "./hooks/useFormState";
import { DynamicModalProps } from "@/types";

const FormModal: React.FC<DynamicModalProps> = ({
    open,
    onClose,
    onSubmit,
    fields,
    title,
    description,
    initialValues = {},
    children,
    loading,
    error,
}) => {
    const { hiddenFields, handleCheckboxChange } = useFieldVisibility(fields, initialValues, open);
    const { isLeaving, setLeavingManually, handleUserDecision } = useIsLeaving({ preventDefault: open });

    const formMethods = useFormState(open, fields, initialValues);
    const { reset, setValue, formState: { isDirty } } = formMethods;

    const resetValues = (fieldNames: (string | number)[]) => {
        fieldNames.forEach(name => {
            const field = fields.find(f => f.name === name);
            if (field) {
                const defaultValue = field.type === "checkbox" ? false : "";
                setValue(String(name), defaultValue);
            }
        });
    };

    const handleClose = () => isDirty ? setLeavingManually(true) : handleCancel()
    const handleCancel = () => {
        reset(getDefaultValues(fields, initialValues));
        onClose();
    };

    return (
        <>
            <LeaveConfirmationModal
                isOpen={isLeaving}
                onLeave={() => {
                    handleUserDecision(true);
                    handleCancel();
                }}
                onStay={() => {
                    setLeavingManually(false);
                    handleUserDecision(false);
                }}
            />
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="sm"
                fullWidth
                sx={{ "& .MuiDialog-paper": { borderRadius: "10px" } }}
            >
                <ModalHeader title={title} description={description} error={error} />
                <DialogContent className="p-0">
                    <FormContent
                        fields={fields}
                        onSubmit={onSubmit}
                        formMethods={formMethods}
                        hiddenFields={hiddenFields}
                        onCheckboxChange={handleCheckboxChange}
                        loading={loading}
                        resetValues={resetValues}
                        onCancel={handleCancel}
                    >
                        {children}
                    </FormContent>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default FormModal;