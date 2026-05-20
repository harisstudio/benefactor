"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IconEye, IconEyeOff, IconArrowLeft, IconBrandGoogleFilled } from "@tabler/icons-react";
import { authClient } from "@/lib/auth-client";
import { useLanguage } from "@/context/LanguageContext";
import { useToast } from "@/components/ui/toast";

type AuthMode = "signin" | "signup";
type AuthStep = "email" | "credentials";

export function SigninForm() {
  const { t } = useLanguage();
  const router = useRouter();
  const toast = useToast();
  const [mode, setMode] = useState<AuthMode>("signin");
  const [step, setStep] = useState<AuthStep>("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === "email" && email) {
      setStep("credentials");
    } else if (step === "credentials") {
      handleAuth();
    }
  };

  const handleAuth = async () => {
    setIsLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await authClient.signUp.email({ email, password, name });
        if (error) throw new Error(error.message);
      } else {
        const { error } = await authClient.signIn.email({ email, password });
        if (error) throw new Error(error.message);
      }
      router.push("/dashboard");
    } catch (err) {
      const msg = err instanceof Error ? err.message : t("authFailed");
      toast.show({ tone: "error", title: t("authFailed"), description: msg });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setMode(mode === "signin" ? "signup" : "signin");
    setStep("email");
  };

  return (
    <div className="w-full max-w-[440px]">
      <div className="bg-white rounded-3xl shadow-md border border-surface-muted p-8 md:p-10">
        <Link href="/" className="flex justify-center mb-7">
          <Image src="/assets/logo.svg" alt="Benefactor" width={150} height={32} className="h-auto w-[140px]" priority />
        </Link>

        <div className="text-center mb-7">
          <h1 className="font-heading text-[26px] md:text-[30px] font-extrabold text-primary-navy tracking-[-0.01em]">
            {mode === "signin" ? t("authWelcomeBack") : t("authCreateAccount")}
          </h1>
          <p className="mt-2 text-[14px] text-text-gray">
            {mode === "signin" ? t("authSigninDesc") : t("authSignupDesc")}
          </p>
        </div>

        {step === "email" && (
          <>
            <button
              type="button"
              onClick={async () => {
                try {
                  await authClient.signIn.social({
                    provider: "google",
                    callbackURL: "/",
                  });
                } catch (err) {
                  const msg = err instanceof Error ? err.message : t("authFailed");
                  toast.show({ tone: "error", title: t("authFailed"), description: msg });
                }
              }}
              className="w-full h-12 flex items-center justify-center gap-2.5 border border-surface-muted rounded-[14px] text-[14px] font-semibold text-primary-navy hover:bg-bg-off-white transition-colors"
            >
              <IconBrandGoogleFilled size={18} />
              {t("authContinueGoogle")}
            </button>

            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-surface-muted" />
              <span className="text-[11px] text-text-gray uppercase tracking-[0.14em] font-semibold">{t("authOr")}</span>
              <div className="flex-1 h-px bg-surface-muted" />
            </div>
          </>
        )}

        <form onSubmit={handleNextStep} className="space-y-4">
          {step === "email" ? (
            <div>
              <label className="block text-[11px] font-semibold text-text-gray mb-1.5 uppercase tracking-[0.1em]">
                {t("authEmail")}
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("authEmailPlaceholder")}
                className="w-full h-12 px-4 border border-surface-muted rounded-[14px] text-[15px] text-text-dark placeholder:text-text-gray/70 focus:outline-none focus:border-primary-navy focus:ring-2 focus:ring-primary-navy/10 transition-all"
              />
            </div>
          ) : (
            <div className="space-y-4">
              {mode === "signup" && (
                <div>
                  <label className="block text-[11px] font-semibold text-text-gray mb-1.5 uppercase tracking-[0.1em]">
                    {t("authFullName")}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t("authNamePlaceholder")}
                    className="w-full h-12 px-4 border border-surface-muted rounded-[14px] text-[15px] text-text-dark placeholder:text-text-gray/70 focus:outline-none focus:border-primary-navy focus:ring-2 focus:ring-primary-navy/10 transition-all"
                  />
                </div>
              )}
              <div>
                <label className="block text-[11px] font-semibold text-text-gray mb-1.5 uppercase tracking-[0.1em]">
                  {t("authPassword")}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t("authPasswordPlaceholder")}
                    className="w-full h-12 pl-4 pr-12 border border-surface-muted rounded-[14px] text-[15px] text-text-dark placeholder:text-text-gray/70 focus:outline-none focus:border-primary-navy focus:ring-2 focus:ring-primary-navy/10 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center text-text-gray hover:text-primary-navy transition-colors rounded-md"
                    aria-label={showPassword ? t("authHidePassword") : t("authShowPassword")}
                  >
                    {showPassword ? <IconEyeOff size={18} /> : <IconEye size={18} />}
                  </button>
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 rounded-[100px] font-bold text-[15px] bg-primary-yellow text-primary-navy shadow-md hover:bg-primary-yellow-hover hover:shadow-lg active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-primary-navy border-t-transparent rounded-full animate-spin" />
            ) : step === "email" ? (
              t("authContinue")
            ) : mode === "signin" ? (
              t("authSignIn")
            ) : (
              t("authCreate")
            )}
          </button>

          {step === "credentials" && (
            <button
              type="button"
              onClick={() => setStep("email")}
              className="w-full inline-flex items-center justify-center gap-1.5 text-[13px] font-semibold text-primary-navy hover:underline pt-1"
            >
              <IconArrowLeft size={14} />
              {t("authUseDifferentEmail")}
            </button>
          )}
        </form>

        <div className="mt-7 pt-6 border-t border-surface-muted text-center">
          <p className="text-[14px] text-text-gray">
            {mode === "signin" ? t("authNewToBenefactor") : t("authAlreadyHave")}{" "}
            <button
              type="button"
              onClick={toggleMode}
              className="font-bold text-primary-navy hover:underline"
            >
              {mode === "signin" ? t("authCreateLink") : t("authSignInLink")}
            </button>
          </p>
        </div>
      </div>

      <p className="text-center text-[11px] text-text-gray mt-6 leading-relaxed max-w-[320px] mx-auto">
        {t("authAgreeTerms")}{" "}
        <Link href="#" className="underline hover:text-primary-navy">{t("authTerms")}</Link>
        {" "}{t("authAnd")}{" "}
        <Link href="#" className="underline hover:text-primary-navy">{t("authPrivacy")}</Link>.
      </p>

      <Link
        href="/"
        className="inline-flex items-center justify-center gap-1.5 w-full mt-3 text-[13px] font-semibold text-text-gray hover:text-primary-navy transition-colors"
      >
        <IconArrowLeft size={14} />
        {t("authBackToBenefactor")}
      </Link>
    </div>
  );
}
