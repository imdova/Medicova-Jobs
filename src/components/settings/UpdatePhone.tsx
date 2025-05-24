"use client";
import useUpdateApi from "@/hooks/useUpdateApi";
import { Alert, Button, CircularProgress, Snackbar } from "@mui/material";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { Controller, useForm } from "react-hook-form";
import PhoneNumberInput from "../UI/phoneNumber";
import { isValidPhoneNumber } from "@/util/forms";
import { API_PHONE_CHANGE, API_REQUEST_PHONE_CHANGE } from "@/api/seeker";
import { TAGS } from "@/api";
import { useState, useEffect } from "react";
import FormModal from "../form/FormModal/FormModal";
import { FieldConfig, NotificationType } from "@/types";

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const UpdatePhone: React.FC<{ user?: User }> = ({ user }) => {
  const { update: updateSession } = useSession();

  const [isOpen, setIsOpen] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const openOtp = () => setIsOpen(true);
  const closeOtp = () => setIsOpen(false);

  const [notification, setNotification] = useState<NotificationType | null>(
    null,
  );

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: { phone: user?.phone || "" },
  });

  const { isLoading, error, update } = useUpdateApi<User>();
  const {
    isLoading: isLoadingOtp,
    error: errorOtp,
    update: updateOtp,
  } = useUpdateApi<User>();

  const handleUpdate = async (body: Partial<User>) => {
    body.id = user?.id;
    if (!user?.id) return;
    await update(
      API_REQUEST_PHONE_CHANGE,
      {
        method: "POST",
        body,
      },
      TAGS.profile,
    );
    setCountdown(90);
    openOtp();
  };

  const otpFields: FieldConfig[] = [
    {
      name: "otp",
      label: "OTP",
      type: "otp",
      textFieldProps: {
        className: "pt-10",
      },
      rules: {
        required: "OTP is required",
        validate: (value) => {
          if (value.length !== 6) {
            return "OTP must be 6 digits";
          }
          return true;
        },
      },
    },
  ];

  const handleOtpSubmit = async (body: { otp: string; id: string | null }) => {
    if (!user?.id) return;
    body.id = user?.id
    const updatedUser = await updateOtp(
      API_PHONE_CHANGE,
      {
        method: "POST",
        body,
      },
      TAGS.profile,
    );
    closeOtp();
    const newData: Partial<User> = {
      phone: updatedUser.phone,
      email: updatedUser.email,
    };
    await updateSession(newData);
    setNotification({
      message: "Phone number updated successfully",
      severity: "success",
    });
    reset({ phone: updatedUser.phone || "" });
  };

  const handleResend = async () => {
    if (countdown > 0) return;
    if (!user?.phone) return;
    await handleUpdate({ phone: user.phone });
    setCountdown(90);
  };

  return (
    <>
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
      <FormModal
        open={isOpen}
        onClose={closeOtp}
        loading={isLoadingOtp}
        error={errorOtp?.message}
        onSubmit={handleOtpSubmit}
        fields={otpFields}
        title={"Update Phone Number"}
        description={
          "We have sent a verification code to your phone number. Please enter the code below to verify your phone number."
        }
        initialValues={{}}
      >
        <div className="mb-10 px-4 pb-4">
          <p className="mx-auto w-1/2 text-center text-sm text-secondary">
            If you did not receive the code, please click on the button below to
            <button
              onClick={handleResend}
              disabled={countdown > 0}
              className={`ml-1 inline text-nowrap text-sm font-bold enabled:cursor-pointer ${countdown > 0 ? "text-gray-400" : "text-main hover:underline"
                }`}
            >
              {" "}
              {countdown > 0
                ? `Resend Code (${formatTime(countdown)})`
                : "Resend Code"}
            </button>
          </p>
        </div>
      </FormModal>

      <form
        onSubmit={handleSubmit(handleUpdate)}
        className="mb-2 rounded-base border border-gray-200 bg-white p-4 shadow-soft"
      >
        <div className="p-4">
          <div className="flex flex-wrap items-start justify-start gap-6">
            {/* Left Section */}
            <div className="flex-1">
              <h6 className="mb-1 text-lg font-bold text-main">
                Update Phone Number
              </h6>
              <p className="mb-2 text-secondary">
                Update your phone number to make sure it is safe
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
                name="phone"
                control={control}
                rules={{
                  validate: (value) =>
                    isValidPhoneNumber(value || "") ||
                    "Please enter a valid phone number",
                }}
                render={({ field, fieldState: { error } }) => (
                  <PhoneNumberInput
                    {...field}
                    className="w-full"
                    type="tel"
                    placeholder="Enter your phone number"
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
                    width: "200px",
                    height: "46px",
                    textTransform: "capitalize",
                    fontWeight: "600",
                  }}
                >
                  {isLoading ? "Updating..." : "Update Phone Number"}
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
export default UpdatePhone;
