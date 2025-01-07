import LogoIcon from "@/components/icons/logo";
import Link from "next/link";

const layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative">
      <div className="z-50 bg-white shadow-lg">
        <div className="container mx-auto flex items-center justify-center p-4 md:justify-normal lg:max-w-[1170px]">
          <Link href="/" className="flex items-center text-primary">
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
      </div>
      {children}
    </div>
  );
};

export default layout;
