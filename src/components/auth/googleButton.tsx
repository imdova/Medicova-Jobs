import React from "react";
import { Button } from "@mui/material";
import { DevIconGoogle } from "@/components/icons/icons";
import { RoleState } from "@/types/next-auth";
import { API_GOOGLE_AUTH } from "@/api/users";

const GoogleButton = ({
  children,
  userType,
}: {
  children: React.ReactNode;
  userType?: RoleState;
}) => {
  return (
    <Button
      className="h-[42px] w-full"
      variant="outlined"
      LinkComponent={"a"}
      href={API_GOOGLE_AUTH + userType}
    >
      <DevIconGoogle className="m-2 h-6 w-6" />
      {children}
    </Button>
  );
};

export default GoogleButton;
