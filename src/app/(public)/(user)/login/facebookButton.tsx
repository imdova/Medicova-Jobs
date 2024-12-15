import React from "react";
import { Button } from "@mui/material";
import FacebookIcon from "@/components/icons/facebook.png";
import { signIn } from "next-auth/react";
import Image from "next/image";

const FacebookButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <Button
      className="w-full"
      variant="outlined"
      onClick={() => signIn("facebook", { callbackUrl: "/profile" })}
    >
      <Image
        src={FacebookIcon}
        alt="Facebook"
        width={24}
        height={24}
        style={{ marginRight: "8px" }}
      />
      {children}
    </Button>
  );
};

export default FacebookButton;
