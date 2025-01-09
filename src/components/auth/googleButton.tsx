import React from "react";
import { Button } from "@mui/material";
import { DevIconGoogle } from "@/components/icons/icons";
import { signIn } from "next-auth/react";

const GoogleButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <Button
      className="h-[50px] w-full"
      variant="outlined"
      onClick={() => signIn("google", { callbackUrl: "/" })}
    >
      <DevIconGoogle className="m-2 h-6 w-6" />
      {children}
    </Button>
  );
};

export default GoogleButton;
