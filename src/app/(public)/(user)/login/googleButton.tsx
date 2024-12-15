import React from "react";
import { Button } from "@mui/material";
import { DevIconGoogle } from "@/components/icons/icons";
import { signIn } from "next-auth/react";

const GoogleButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <Button
      className="w-full"
      variant="outlined"
      onClick={() => signIn("google", { callbackUrl: "/employer/profile" })}
    >
      <DevIconGoogle className="w-6 h-6 m-2" />
      {children}
    </Button>
  );
};

export default GoogleButton;
