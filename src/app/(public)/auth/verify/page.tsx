"use client";
import VerifyToken from "@/components/UI/verifyToken";
import { CircularProgress } from "@mui/material";
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
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
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
        <VerifyToken />
      )}
    </div>
  );
}




