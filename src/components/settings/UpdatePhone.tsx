import useUpdateApi from "@/hooks/useUpdateApi";
import { Button, CircularProgress } from "@mui/material";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { Controller, useForm } from "react-hook-form";
import PhoneNumberInput from "../UI/phoneNumber";
import { isValidPhoneNumber } from "@/util/forms";
import { API_PHONE_CHANGE, API_REQUEST_PHONE_CHANGE } from "@/api/seeker";
import { TAGS } from "@/api";
import { useState } from "react";
import FormModal from "../form/FormModal/FormModal";
import { FieldConfig } from "@/types";

const UpdatePhone: React.FC<{ user: User }> = ({ user }) => {
  const { update: updateSession } = useSession();

  const [isOpen, setIsOpen] = useState(false);
  const openOtp = () => setIsOpen(true);
  const closeOtp = () => setIsOpen(false);

  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: { phone: user.phone },
  });

  const { isLoading, error, update } = useUpdateApi<User>();
  const { isLoading: isLoadingOtp, error: errorOtp, update: updateOtp } = useUpdateApi<User>();

  const handleUpdate = async (body: Partial<User>) => {
    body.id = user.id;
    await update(
      API_REQUEST_PHONE_CHANGE,
      {
        method: "POST",
        body,
      },
      TAGS.profile,
    );
    openOtp();
  };

  const otpFields: FieldConfig[] = [
    {
      name: "otp",
      label: "OTP",
      type: "otp",
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
    body.id = user.id;
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
    };
    await updateSession(newData);
    reset({ phone: updatedUser.phone });
  };

  return (
    <>
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
        <div className="flex justify-center px-4 pb-4">
          <p className="inline text-sm text-secondary">
            If you did not receive the code, please click on the button below to
          </p>
          <button className="ml-1 inline cursor-pointer text-sm font-bold text-main hover:underline">
            {" "}
            Resend Code
          </button>
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
