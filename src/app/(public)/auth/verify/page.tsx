"use client";
import { CircularProgress } from "@mui/material";
import { CheckCircle, Mail, MousePointerClick } from "lucide-react";
import { User } from "next-auth";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function EmailVerificationPage({
  searchParams,
}: {
  searchParams: { token: string };
}) {
  const { data: session, status } = useSession();
  const user = session?.user as User;
  const token = searchParams.token;

  const isVerifying = Boolean(user?.email && !user.isVerified && token);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async () => {
    setLoading(true);
    try {
      const result = await signIn("validate-credentials", {
        email: user.email,
        token: token,
        redirect: false,
      });
      console.log("🚀 ~ onSubmit ~ result:", result)
      if (result?.error) {
        setError(
          result.error === "CredentialsSignin"
            ? "Invalid email or password"
            : "An error occurred during sign in",
        );
      } else {
        if (typeof window !== "undefined") {
          window.location.replace("/me");
        }
      }
    } catch (error) {
      setError("Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isVerifying) {
      onSubmit();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVerifying]);

  const waitingForVerification = user?.email && !user.isVerified && !token;

  if (status === "loading") {
    return (
      <div className="flex min-h-[calc(100dvh-70px)] items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 px-4">
        <CircularProgress className="mx-auto h-16 w-16 text-green-500" />
      </div>
    );
  }

  if (user?.isVerified) {
    return redirect("/");
  }

  return (
    <div className="flex min-h-[calc(100dvh-70px)] items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 px-4">
      {loading && (
        <div className="mb-10 w-full max-w-xl space-y-8 rounded-3xl bg-white p-10 text-center shadow-2xl">
          <CircularProgress className="mx-auto h-16 w-16 text-green-500" />
          <h1 className="text-3xl font-bold text-gray-800">
            Verifying your account
          </h1>
          <p className="text-lg text-gray-600">
            We&apos;re verifying your account. This may take a few seconds.
          </p>
        </div>
      )}
      {waitingForVerification && (
        <div className="mb-10 w-full max-w-xl space-y-8 rounded-3xl bg-white p-10 text-center shadow-2xl">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
          <h1 className="text-3xl font-bold text-gray-800">
            Registration Successful 🎉
          </h1>
          <p className="text-lg text-gray-600">
            You&apos;re almost there! Just one more step to get started.
          </p>

          <div className="space-y-6 text-left">
            <Step
              number={1}
              title="Check your inbox"
              description="We've sent a verification email to the address you provided."
              Icon={Mail}
            />
            <Step
              number={2}
              title="Open the verification email"
              description="Find the email with the subject 'Verify your account'."
              Icon={MousePointerClick}
            />
            <Step
              number={3}
              title="Click the verification link"
              description="This will activate your account and log you in."
              Icon={CheckCircle}
            />
          </div>

          <p className="mt-6 text-sm text-gray-500">
            Didn&apos;t receive the email? Check your spam folder
            {/* <a href="#" className="text-indigo-600 hover:underline">
            resend it
          </a> */}
            .
          </p>
        </div>
      )}
    </div>
  );
}

type StepProps = {
  number: number;
  title: string;
  description: string;
  Icon: React.ElementType;
};

function Step({ number, title, description, Icon }: StepProps) {
  return (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-lg font-bold text-indigo-600">
          {number}
        </div>
      </div>
      <div>
        <h3 className="flex items-center gap-2 font-semibold text-gray-800">
          <Icon className="h-5 w-5 text-indigo-500" /> {title}
        </h3>
        <p className="mt-1 text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}
