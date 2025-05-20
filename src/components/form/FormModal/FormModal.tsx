"use client";
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
  onDelete,
  fields = [],
  title,
  description,
  initialValues = {},
  children,
  loading,
  deleteLoading,
  error,
  submitButtonText,
  deleteButtonText,
  cancelButtonText,
  removeField,
  mode,
  dialog,
}) => {
  const { hiddenFields, handleCheckboxChange } = useFieldVisibility(
    fields,
    initialValues,
    open,
  );
  const { isLeaving, setLeavingManually, handleUserDecision } = useIsLeaving({
    preventDefault: open,
  });

  const formMethods = useFormState(open, fields, initialValues, mode);
  const {
    reset,
    setValue,
    formState: { isDirty },
  } = formMethods;

  const resetValues = (fieldNames: (string | number)[]) => {
    fieldNames.forEach((name) => {
      const field = fields.find((f) => f.name === name);
      if (field) {
        const defaultValue = field.type === "checkbox" ? false : "";
        setValue(String(name), defaultValue, { shouldDirty: true });
      }
    });
  };

  const handleClose = () =>
    isDirty ? setLeavingManually(true) : handleCancel();
  const handleCancel = () => {
    reset(getDefaultValues(fields, initialValues));
    onClose();
  };

  const Modal = dialog ? dialog : Dialog;
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
      <Modal
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        sx={{
          "& .MuiDialog-paper": { borderRadius: "10px" },
          "& .MuiPaper-root": {
            overflowX: "hidden",
            margin: 0,
            width: "calc(100% - 32px)",
          },
        }}
      >
        <ModalHeader
          title={title}
          description={description}
          error={error}
          handleCancel={handleCancel}
        />
        <DialogContent className="m-0 p-0 max-h-[calc(100dvh-200px)] h-full ">
          <FormContent
            fields={fields}
            onSubmit={onSubmit}
            formMethods={formMethods}
            hiddenFields={hiddenFields}
            onCheckboxChange={handleCheckboxChange}
            loading={loading}
            deleteLoading={deleteLoading}
            onDelete={onDelete}
            resetValues={resetValues}
            onCancel={handleCancel}
            submitButtonText={submitButtonText}
            deleteButtonText={deleteButtonText}
            cancelButtonText={cancelButtonText}
            removeField={removeField}
          >
            {children}
          </FormContent>
        </DialogContent>
      </Modal>
    </>
  );
};

export default FormModal;
