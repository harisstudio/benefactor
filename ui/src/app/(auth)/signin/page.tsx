import type { Metadata } from "next";
import { SigninForm } from "@/components/signin/signin-form";

export const metadata: Metadata = {
  title: "Sign In — Benefactor",
  description: "Sign in to Benefactor or create an account to start fundraising.",
};

export default function SignInPage() {
  return <SigninForm />;
}
