import React from "react";
import { Button } from "@mui/material";
import { DevIconGoogle } from "@/components/icons/icons";
import { signIn } from "next-auth/react";
import { RoleState } from "@/types/next-auth";

const GoogleButton = ({
  children,
  userType,
}: {
  children: React.ReactNode;
  userType?: RoleState;
}) => {
  return (
    <Button
      className="h-[50px] w-full"
      variant="outlined"
      disabled={true}
      onClick={() =>
        signIn(
          "google",
          {
            callbackUrl: "/",
            state: JSON.stringify({ customKey: userType }),
          },
          userType ? { type: userType } : {},
        )
      }
    >
      <DevIconGoogle className="m-2 h-6 w-6 opacity-40" />
      {children}
    </Button>
  );
};

export default GoogleButton;
