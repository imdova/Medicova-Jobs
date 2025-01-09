import React from "react";
import { Button } from "@mui/material";
import { signIn } from "next-auth/react";
import { Facebook } from "@mui/icons-material";

const FacebookButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <Button
      className="h-[50px] w-full"
      variant="outlined"
      onClick={() => signIn("facebook", { callbackUrl: "/profile" })}
    >
      <Facebook />
      {children}
    </Button>
  );
};

export default FacebookButton;
