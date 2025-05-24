import { TAGS } from "@/api";
import { API_REQUEST_CHANGE_EMAIL } from "@/api/users";
import { VerifyType } from "@/constants/enums/verify-types.enums";
import useUpdateApi from "@/hooks/useUpdateApi";
import { setCookies } from "@/lib/cookies";
import { NotificationType, Verify } from "@/types";
import {
  Alert,
  Button,
  CircularProgress,
  Divider,
  Snackbar,
  TextField,
} from "@mui/material";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import VerifyToken from "../UI/verifyToken";
import FormModal from "../form/FormModal/FormModal";

const UpdateEmail: React.FC<{ user?: User }> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const openVerify = () => setIsOpen(true);
  const closeVerify = () => setIsOpen(false);

  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: { newMail: user?.email || "" },
  });

  const { isLoading, error, update } = useUpdateApi<User>();

  const handleUpdate = async (data: { newMail: string | null }) => {
    if (!user?.id) return;
    await update(
      API_REQUEST_CHANGE_EMAIL,
      {
        method: "POST",
        body: { ...data, id: user?.id },
      },
      TAGS.profile,
    );
    if (data.newMail) {
      const verify: Verify = {
        newMail: data.newMail,
        type: VerifyType.EMAIL_VERIFY,
        url: "/job-seeker/settings",
      };
      await setCookies("verify", JSON.stringify(verify));
      openVerify();
    }
  };

  return (
    <>
      <FormModal
        open={isOpen}
        onClose={closeVerify}
        onSubmit={closeVerify}
        submitButtonText={"Ok"}
        cancelButtonText={"Close"}
      >
        <div className="flex w-full items-center justify-center">
          <VerifyToken
            title="Verification sent"
            description="We have sent a verification link to your email. Please check your email and click on the link to verify your email."
            className="space-y-3 border-none px-4 pb-6 pt-0 shadow-none"
          />
        </div>
      </FormModal>

      <form
        onSubmit={handleSubmit(handleUpdate)}
        className="mb-2 rounded-base border border-gray-200 bg-white p-4 shadow-soft"
      >
        <div className="p-4">
          <h6 className="mb-1 text-xl font-bold text-main">
            Basic Information
          </h6>
          <p className="mb-2 text-secondary">
            This is login information that you can update anytime.
          </p>
        </div>
        <Divider sx={{ my: 2, width: "90%", mx: "auto" }} />{" "}
        {/* Centered Divider */}
        <div className="p-4">
          <div className="flex flex-wrap items-start justify-start gap-6">
            {/* Left Section */}
            <div className="flex-1">
              <h6 className="mb-1 text-lg font-bold text-main">Update Email</h6>
              <p className="mb-2 text-secondary">
                Update your email address to make sure it is safe
              </p>
            </div>

            {/* Right Section */}
            <div className="min-[250px] flex flex-1 flex-col">
              {error && (
                <Alert severity="error" className="my-1 !w-full">
                  <p className="text-sm">{error?.message}</p>
                </Alert>
              )}
              <Controller
                name="newMail"
                control={control}
                rules={{
                  required: "Your Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Enter a valid email address",
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    className="w-full"
                    type="email"
                    placeholder="Enter your email address"
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />

              <div className="mt-3 flex items-center gap-2">
                <Button
                  variant="contained"
                  type="submit"
                  disabled={isLoading || !isDirty || !isValid}
                  startIcon={isLoading ? <CircularProgress size={20} /> : null}
                  sx={{
                    width: "155px",
                    height: "46px",
                    textTransform: "capitalize",
                    fontWeight: "600",
                  }}
                >
                  {isLoading ? "Updating..." : "Update Email"}
                </Button>
                {isDirty && (
                  <Button
                    onClick={() => reset()}
                    variant="text"
                    size="large"
                    className="ml-2"
                  >
                    Reset
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
export default UpdateEmail;
