"use client";
import { useSession } from "next-auth/react";
import HeaderSection from "./Components/HeaderSection";
import ProfileForm from "./Components/ProfileForm";
import useFetch from "@/hooks/useFetch";
import { API_GET_SEEKER_BY_ID, API_UPDATE_SEEKER } from "@/api/seeker";
import { notFound } from "next/navigation";
import { Alert, Button, CircularProgress, Snackbar } from "@mui/material";
import useUpdateApi from "@/hooks/useUpdateApi";
import useIsLeaving from "@/hooks/useIsLeaving";
import { useForm } from "react-hook-form";
import LeaveConfirmationModal from "@/components/UI/LeaveConfirmationModal";
import { TAGS } from "@/api";

const ProfileInfoForm: React.FC<{ user: UserProfile }> = ({ user }) => {
  const {
    isLoading,
    error,
    update,
    reset: resetApi,
  } = useUpdateApi<UserProfile>();
  const { update: updateSession } = useSession();

  const defaultValues = {
    ...user,
    avatar: user?.avatar || "",
    firstName: user?.firstName,
    lastName: user?.lastName,
    phone: user?.phone,
    whatsapp: user?.whatsapp,
    gender: user?.gender || "",
    nationality: user?.nationality || "",
    maritalStatus: user?.maritalStatus || "",
    hasDrivingLicence: user?.hasDrivingLicence || false,
    willingToTravel: user?.willingToTravel || false,
    country: user?.country || {
      code: "",
      name: "",
    },
    state: user?.state || {
      code: "",
      name: "",
    },
    city: user.city || "",
    categoryId: user?.categoryId || "",
    specialityId: user?.specialityId || "",
    careerLevelId: user?.careerLevelId || "",
  } as Partial<UserProfile>;

  const formMethods = useForm({
    mode: "onChange",
    defaultValues: defaultValues,
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
    };
    const newProfile = await update(API_UPDATE_SEEKER, { body }, TAGS.profile);
    await updateSession({
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
        <HeaderSection formMethods={formMethods} />
        <ProfileForm formMethods={formMethods} />
        {(isDirty || isLoading) && (
          <div className="sticky bottom-2 z-30 flex justify-end rounded-base border border-gray-200 bg-white p-3 shadow-soft md:static md:justify-start md:p-5">
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading || !isValid}
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
    </>
  );
};

const ProfileInfoPage = () => {
  const { data: session, status } = useSession();
  const sessionUser = session?.user;
  const { data: user, loading } = useFetch<UserProfile>(
    sessionUser?.id ? API_GET_SEEKER_BY_ID + sessionUser.id : null,
    {
      defaultLoading: true,
    },
  );

  if (status === "loading" || loading)
    return (
      <div className="flex h-full min-h-[70vh] items-center justify-center">
        <CircularProgress />
        <h6 className="ml-4">Loading...</h6>
      </div>
    );
  if (!user) return notFound();

  return <ProfileInfoForm user={user} />;
};

export default ProfileInfoPage;
