import { TextFieldComponent } from "@/components/form/FormModal/FormField/TextFieldComponent";
import { passwordRules } from "@/constants";
import useIsLeaving from "@/hooks/useIsLeaving";
import useUpdateApi from "@/hooks/useUpdateApi";
import { UserState } from "@/types";
import { Button, CircularProgress } from "@mui/material";
import { useSession } from "next-auth/react";
import { Controller, useForm } from "react-hook-form";

type ResetPasswordFormData = {
  oldPassword: string;
  newPassword: string;
};

const UpdatePassword: React.FC<{ user: UserState }> = ({ user }) => {
  const { update: updateSession } = useSession();
  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: { oldPassword: "", newPassword: "" },
  });

  const { isLeaving, setLeavingManually, handleUserDecision } = useIsLeaving({
    preventDefault: isDirty,
  });

  const { isLoading, error, update } =
    useUpdateApi<ResetPasswordFormData>(handleSuccess);

  const handleUpdate = async (formData: ResetPasswordFormData) => {
    console.log("🚀 ~ handleUpdate ~ formData:", formData);
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

  async function handleSuccess(data: ResetPasswordFormData) {
    // await updateSession({
    //   companyName: updatedCompany.name,
    //   companyEmail: updatedCompany.email,
    // });
    // window.location.reload();
  }
  return (
    <form
      onSubmit={handleSubmit(handleUpdate)}
      className="mb-2 rounded-base border border-gray-100 bg-white p-4 shadow-soft"
    >
      <div className="p-4">
        <div className="flex flex-wrap items-start justify-start gap-6">
          {/* Left Section */}
          <div className="flex-1">
            <h6 className="mb-1 text-lg font-bold text-main">New Password</h6>
            <p className="mb-2 text-secondary">
              Manage your password to make sure it is safe
            </p>
          </div>

          {/* Right Section */}
          <div className="min-[250px] flex flex-1 flex-col gap-3">
            <Controller
              control={control}
              name="oldPassword"
              render={({ field: controllerField, fieldState: { error } }) => (
                <TextFieldComponent
                  field={{
                    name: "oldPassword",
                    label: "Old Password",
                    type: "password",
                  }}
                  controllerField={controllerField}
                  error={error}
                />
              )}
              rules={passwordRules}
            />
            <Controller
              control={control}
              name="newPassword"
              render={({ field: controllerField, fieldState: { error } }) => (
                <TextFieldComponent
                  field={{
                    name: "newPassword",
                    label: "New Password",
                    type: "password",
                  }}
                  controllerField={controllerField}
                  error={error}
                />
              )}
              rules={passwordRules}
            />
            <Button
              variant="contained"
              type="submit"
              disabled={isLoading || !isDirty || !isValid}
              startIcon={isLoading ? <CircularProgress size={20} /> : null}
              sx={{
                width: "155px",
                height: "46px",
                color: "#fff",
                textTransform: "capitalize",
                fontWeight: "600",
              }}
            >
              {isLoading ? "Loading..." : "Change Password"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};
export default UpdatePassword;
