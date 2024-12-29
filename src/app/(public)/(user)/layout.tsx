import { MenuIcon } from "@/components/icons/icons";
import LogoIcon from "@/components/icons/logo";
import { Box, Button, Container } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative">
      <div className="container mx-auto flex items-center justify-center p-2 md:justify-normal lg:max-w-[1170px]">
        <Link href="/" className="text-primary flex items-center">
          <LogoIcon className="h-[50px] w-[40px]" />
          <div className="flex h-fit flex-col text-center">
            <h1 className="font-baiJamJuree text-[16px] font-bold leading-none">
              MEDICOVA
            </h1>
            <p className="font-baiJamJuree text-[8px] font-medium">
              MEDICAL COMMUNITY
            </p>
          </div>
        </Link>
      </div>
      {children}
    </div>
  );
};

export default layout;
