"use client";
import { IconButton, Divider, Button, Snackbar, Alert } from "@mui/material";
import { Edit, Email, KeyOutlined, PhoneIphone } from "@mui/icons-material";
import useUpdateApi from "@/hooks/useUpdateApi";
import { UNLOCKED_SEEKERS } from "@/api/employer";
import { TAGS } from "@/api";
import { FieldConfig } from "@/types";
import { useState } from "react";
import FormModal from "@/components/form/FormModal/FormModal";
import { API_UPDATE_SEEKER } from "@/api/seeker";

type Contact = {
  email: string;
  phone: string;
};

const ContactInfoSection: React.FC<{
  user: UserProfile;
  isMe: boolean;
  companyId?: string | null;
  isLocked: boolean;
}> = ({ user, isMe, companyId, isLocked }) => {
  const {
    isLoading: isUnlocking,
    error: unlockError,
    reset: resetUnlock,
    update: unlock,
  } = useUpdateApi();
  const { isLoading, error, update, reset } =
    useUpdateApi<UserProfile>(onClose);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onOpen = () => setIsModalOpen(true);
  function onClose() {
    setIsModalOpen(false);
    reset();
  }

  const unlockHandler = () => {
    if (companyId) {
      unlock(
        UNLOCKED_SEEKERS,
        { method: "POST", body: { companyId, seekerId: user.id } },
        TAGS.applicants,
      );
    }
  };

  const handleUpdate = (data: Contact) => {
    const id = user.id;
    update(API_UPDATE_SEEKER, { body: { id, ...data } }, TAGS.profile);
  };

  const fields: FieldConfig<Contact>[] = [
    {
      name: "email",
      type: "email",
      label: "Email*",
      textFieldProps: { placeholder: "Enter Email" },
      required: true,
    },
    {
      name: "phone",
      type: "phone",
      label: "Phone*",
      textFieldProps: { placeholder: "Enter Phone Number" },
      required: true,
    },
  ];

  return (
    <div className="rounded-base border border-gray-200 bg-white p-4 shadow-soft md:p-5">
      {isMe && (
        <FormModal
          open={isModalOpen}
          error={error?.message}
          loading={isLoading}
          onClose={onClose}
          onSubmit={handleUpdate}
          fields={fields}
          title="Update Contact"
          description="Help Recruiters reach You well"
          initialValues={{ email: user.email, phone: user.phone }}
        />
      )}

      <div className="flex items-center justify-between">
        <h3 className="mb-2 text-xl font-semibold text-main">Contact Info</h3>
        {isMe && (
          <IconButton
            onClick={onOpen}
            className="rounded border border-solid border-gray-200 p-2"
          >
            <Edit />
          </IconButton>
        )}
      </div>

      {/* Email Section */}
      {isLocked ? (
        companyId ? (
          <div>
            <p className="my-2 text-secondary">
              Unlock me to see my contact information{" "}
            </p>
            <Button
              startIcon={<KeyOutlined />}
              variant="outlined"
              className="text-nowrap"
              onClick={unlockHandler}
            >
              {isUnlocking ? "..loading" : "Unlock Now"}
            </Button>
          </div>
        ) : (
          <div>
            <p className="text-secondary">
              The Data Of this user Is Privater
            </p>
          </div>
        )
      ) : (
        <div>
          {user.email && (
            <p className="my-2 text-secondary">
              <Email className="mr-2 inline-block" color="primary" />
              <span className="font-semibold text-main">Email :</span>{" "}
              {user.email}
            </p>
          )}
          {/* Phone Section */}
          {user.phone && (
            <>
              <Divider sx={{ marginY: 1 }} />
              <p className="my-2 text-secondary">
                <PhoneIphone className="mr-2 inline-block" color="primary" />
                <span className="font-semibold text-main">Phone :</span>
                {user.phone}
              </p>
            </>
          )}
        </div>
      )}
      <Snackbar
        open={!!error || !!unlockError}
        autoHideDuration={6000}
        onClose={() => {
          reset();
          resetUnlock();
        }}
      >
        <Alert
          onClose={() => {
            reset();
            resetUnlock();
          }}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {unlockError?.message || error?.message}
        </Alert>
      </Snackbar>
    </div>
  );
};
export default ContactInfoSection;
