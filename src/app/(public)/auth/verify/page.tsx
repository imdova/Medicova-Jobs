"use client";
import { API_CHANGE_EMAIL } from "@/api/users";
import VerifyToken from "@/components/UI/verifyToken";
import { VerifyType } from "@/constants/enums/verify-types.enums";
import { deleteCookies, getCookies } from "@/lib/cookies";
import { Verify } from "@/types";
import { CircularProgress } from "@mui/material";
import { User } from "next-auth";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export default function EmailVerificationPage({
  searchParams,
}: {
  searchParams: { token: string };
}) {
  const { data: session, status, update: updateSession } = useSession();

  const user = session?.user as User;
  const token = searchParams.token;

  const isVerifying = Boolean(user?.email && !user.isVerified && token);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const hasChangedEmail = useRef(false);

  const handleChangeEmail = async () => {
    if (hasChangedEmail.current) return;
    hasChangedEmail.current = true;
    setLoading(true);
    try {
      const data = await getCookies("verify");
      const verify: Verify = data ? JSON.parse(data) : null;
      if (verify?.type !== VerifyType.EMAIL_VERIFY) {
        return;
      }
      const newMail = verify.newMail;
      const response = await fetch(API_CHANGE_EMAIL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newMail, token }),
      });

      if (!response.ok) {
        throw new Error("Failed to change email");
      }
      window.location.replace("/job-seeker/setting");

      const updatedUser = await response.json();
      const newData: Partial<User> = {
        email: updatedUser.email,
      };
      await updateSession(newData);
      await deleteCookies("verify");
    } catch (error) {
      setError("Failed to change email");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      const data = await getCookies("verify");
      const verify: Verify = data ? JSON.parse(data) : null;
      if (verify?.type === VerifyType.EMAIL_VERIFY) {
        return;
      }
      const result = await signIn("validate-credentials", {
        email: user.email,
        token: token,
        redirect: false,
      });
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

  useEffect(() => {
    if (status === "authenticated") {
      handleChangeEmail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

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
      {waitingForVerification && <VerifyToken />}
    </div>
  );
}
