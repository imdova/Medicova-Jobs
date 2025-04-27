import useIsLeaving from "@/hooks/useIsLeaving";
import useUpdateApi from "@/hooks/useUpdateApi";
import { Button, CircularProgress, Divider, TextField } from "@mui/material";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { Controller, useForm } from "react-hook-form";

const UpdateEmail: React.FC<{ user: User }> = ({ user }) => {
  const { update: updateSession } = useSession();
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: { email: user.email },
  });

  const { isLeaving, setLeavingManually, handleUserDecision } = useIsLeaving({
    preventDefault: isDirty,
  });

  const { isLoading, error, update } = useUpdateApi<User>(handleSuccess);

  const handleUpdate = async (formData: Partial<User>) => {
    // await update(
    //   API_UPDATE_COMPANY,
    //   {
    //     body: formData,
    //   },
    //   TAGS.company,
    // );
    // // reset the form
    // reset(formData);
  };

  async function handleSuccess(updatedCompany: User) {
    // await updateSession({
    //   companyName: updatedCompany.name,
    //   companyEmail: updatedCompany.email,
    // });
    // window.location.reload();
  }
  return (
    <form
      onSubmit={handleSubmit(handleUpdate)}
      className="mb-2 rounded-base border border-gray-200 bg-white p-4 shadow-soft"
    >
      <div className="p-4">
        <h6 className="mb-1 text-xl font-bold text-main">Basic Information</h6>
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
            <Controller
              name="email"
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
  );
};
export default UpdateEmail;
