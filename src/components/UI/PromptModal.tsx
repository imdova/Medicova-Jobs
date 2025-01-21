"use client";
import React from "react";
import { Dialog, DialogContent, DialogActions, Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ModalActionType, ModalState } from "@/types";
import { hideModal } from "@/store/slices/modalSlice";
import { useRouter } from "next/navigation";

interface RootState {
  modal: ModalState;
}

const PromptModal: React.FC = () => {
  const router = useRouter();
  const { isOpen, message, buttons, navigationUrl } = useAppSelector(
    (state: RootState) => state.modal,
  );
  const dispatch = useAppDispatch();

  const handleButtonClick = (actionType: ModalActionType) => {
    switch (actionType) {
      case "STAY":
        dispatch(hideModal());
        break;
      case "LEAVE":
        dispatch(hideModal());
        if (navigationUrl) {
          console.log("🚀 ~ handleButtonClick ~ navigationUrl:", navigationUrl);
          router.push(navigationUrl);
          // window.location.href = navigationUrl;
        }
        break;
      // Handle other action types as needed
      default:
        dispatch(hideModal());
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => handleButtonClick("STAY")}
      className="rounded-lg shadow-xl"
    >
      <DialogContent className="p-6">
        <p className="text-lg text-gray-800">{message}</p>
      </DialogContent>
      <DialogActions className="bg-gray-50 p-4">
        {buttons.map((button, index) => (
          <Button
            key={index}
            onClick={() => handleButtonClick(button.actionType)}
            variant={button.variant === "primary" ? "contained" : "outlined"}
            className={` ${
              button.variant === "primary"
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "border-gray-300 text-gray-700 hover:bg-gray-50"
            } ml-3 rounded-md px-4 py-2`}
          >
            {button.label}
          </Button>
        ))}
      </DialogActions>
    </Dialog>
  );
};

export default PromptModal;
