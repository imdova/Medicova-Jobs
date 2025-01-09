import Image from "next/image";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React from "react";
import ResetForm from "./ResetForm";

const Set = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const { em } = searchParams as {
    [key: string]: string;
  };
  return (
    <React.Fragment>
      <div className="absolute inset-0 z-[-1] bg-[url('/images/background.png')] bg-cover bg-center opacity-20"></div>
      {/* Main Content */}
      <div className="m-auto flex h-screen flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center rounded-base border border-gray-50 bg-[#f8faff]/80 p-5 shadow-xl">
          {/* Lock Icon */}
          <Image
            src="/images/reset-password.jpg"
            width={200}
            height={170}
            alt="reset password"
            className="mt-5 object-contain mix-blend-multiply"
          />

          {/* Title */}
          <h4 className="mb-1 text-center text-3xl font-semibold text-main">
            Password Reset
          </h4>
          {/* Subtitle */}
          <p className="mb-4 text-center text-secondary">
            We send a Code to <span className="text-light-primary">{em}</span>
          </p>
          {/* Email Input */}

          <ResetForm email={em} />

          <Link
            href="/auth/signin"
            replace
            className="mt-5 flex items-center gap-2 text-secondary hover:underline"
          >
            <ArrowBackIcon />
            <span>Back to login</span>
          </Link>
        </div>
        {/* Stages */}
        <div className="mt-5 flex h-1 w-full max-w-[400px] items-center justify-center gap-5 px-10">
          <div className="h-full flex-1 rounded bg-[#CDD3D1]"></div>
          <div className="h-full flex-1 rounded bg-light-primary"></div>
          <div className="h-full flex-1 rounded bg-[#CDD3D1]"></div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Set;
