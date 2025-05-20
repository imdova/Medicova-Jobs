"use client";
import { useSession } from "next-auth/react";
import HeaderSectionForm from "./HeaderSectionForm";
import { API_UPDATE_SEEKER } from "@/api/seeker";
import { Alert, Button, CircularProgress, Snackbar } from "@mui/material";
import useUpdateApi from "@/hooks/useUpdateApi";
import useIsLeaving from "@/hooks/useIsLeaving";
import { useForm } from "react-hook-form";
import LeaveConfirmationModal from "@/components/UI/LeaveConfirmationModal";
import { TAGS } from "@/api";
import React from "react";
import ProfileForm from "./ProfileForm";
import { NotificationType } from "@/types";

const getDefaultUserData = (user: UserProfile) => {
  const defaultValues = {
    avatar: user?.avatar || "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phone: user?.phone || null,
    whatsapp: user?.whatsapp || null,
    birthDate: user?.birthDate || null,
    gender: user?.gender || null,
    nationality: user?.nationality || null,
    maritalStatus: user?.maritalStatus || null,
    hasDrivingLicence: user?.hasDrivingLicence || false,
    country: user?.country || {
      code: "",
      name: "",
    },
    state: user?.state || {
      code: "",
      name: "",
    },
    city: user.city,
    categoryId: user?.categoryId,
    specialityId: user?.specialityId,
    careerLevelId: user?.careerLevelId,
  } as Partial<UserProfile>;
  return defaultValues;
};

interface ProfileInfoFormProps {
  user: UserProfile;
}
export const ProfileInfoForm: React.FC<ProfileInfoFormProps> = ({ user }) => {
  const [notification, setNotification] =
    React.useState<NotificationType | null>(null);

  const {
    isLoading,
    error,
    update,
    reset: resetApi,
  } = useUpdateApi<UserProfile>();
  const { update: updateSession } = useSession();

  const formMethods = useForm({
    mode: "onChange",
    defaultValues: getDefaultUserData(user),
  });

  const {
    handleSubmit,
    formState: { isDirty, isValid },
    reset,
  } = formMethods;

  const { isLeaving, setLeavingManually, handleUserDecision } = useIsLeaving({
    preventDefault: isDirty,
  });

  const handleUpdate = async (formData: Partial<UserProfile>) => {
    const body: Partial<UserProfile> = {
      id: user?.id,
      ...formData,
      country: formData.country?.code ? formData.country : null,
      state: formData.state?.code ? formData.state : null,
    };
    const newProfile = await update(API_UPDATE_SEEKER, { body }, TAGS.profile);
    setNotification({
      message: "Profile updated successfully",
      severity: "success",
    });
    reset(getDefaultUserData(newProfile));
    updateSession({
      photo: newProfile.avatar,
      firstName: newProfile.firstName,
      lastName: newProfile.lastName,
      phone: newProfile.phone,
    });
  };

  return (
    <>
      <LeaveConfirmationModal
        isOpen={isLeaving}
        onLeave={() => {
          handleUserDecision(true);
          // handleCancel();
        }}
        onStay={() => {
          setLeavingManually(false);
          handleUserDecision(false);
        }}
      />
      <form onSubmit={handleSubmit(handleUpdate)} className="space-y-2">
        <HeaderSectionForm formMethods={formMethods} />
        <ProfileForm formMethods={formMethods} />
        {(isDirty || isLoading) && (
          <div className="sticky bottom-2 z-30 flex justify-end rounded-base border border-gray-200 bg-white p-3 shadow-soft md:static md:justify-start md:p-5">
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              size="large"
              startIcon={isLoading ? <CircularProgress size={20} /> : null}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
            <Button
              onClick={() => reset()}
              variant="text"
              size="large"
              className="ml-2"
            >
              Reset
            </Button>
          </div>
        )}
      </form>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => resetApi()}
      >
        <Alert
          onClose={() => resetApi()}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {error?.message}
        </Alert>
      </Snackbar>
      <Snackbar
        open={!!notification}
        autoHideDuration={3000}
        onClose={() => setNotification(null)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setNotification(null)}
          severity={notification?.severity}
          sx={{ width: "100%" }}
        >
          {notification?.message}
        </Alert>
      </Snackbar>
    </>
  );
};
