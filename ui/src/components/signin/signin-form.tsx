"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

type AuthMode = "signin" | "signup";
type AuthStep = "email" | "credentials";

export function SigninForm() {
  const router = useRouter();
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
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 1500);
  };

  const toggleMode = () => {
    setMode(mode === "signin" ? "signup" : "signin");
    setStep("email");
  };

  return (
    <div className="w-full max-w-[480px] bg-white rounded-md shadow-md p-8 md:p-10 text-center animate-in fade-in zoom-in duration-300">
      {/* Logo */}
      <Link href="/">
        <Image
          src="/assets/logo.svg"
          alt="Benefactor"
          width={180}
          height={36}
          className="mx-auto"
        />
      </Link>

      {/* Heading */}
      <h1 className="text-2xl font-bold text-primary-navy mt-6">
        {mode === "signin" ? "Welcome back" : "Join Benefactor"}
      </h1>
      <p className="text-sm text-text-gray mt-2">
        {mode === "signin" 
          ? "Sign in to your account to continue." 
          : "Create an account to start your direct impact."}
      </p>

      {step === "email" && (
        <>
          {/* Social buttons */}
          <div className="space-y-3 mt-6">
            <button className="w-full h-12 flex items-center justify-center gap-3 border border-gray-300 rounded-sm text-sm font-medium text-text-dark hover:bg-bg-off-white transition-colors">
              <svg viewBox="0 0 24 24" className="w-5 h-5">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Continue with Google
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-text-gray uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
        </>
      )}

      <form onSubmit={handleNextStep} className="space-y-4 text-left">
        {step === "email" ? (
          <div>
            <label className="block text-xs font-semibold text-text-dark mb-1 ml-1 uppercase">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full h-12 px-4 border border-gray-300 rounded-sm text-sm text-text-dark placeholder:text-text-gray focus:outline-none focus:border-primary-navy"
            />
          </div>
        ) : (
          <div className="space-y-4 animate-in slide-in-from-right duration-300">
            {mode === "signup" && (
              <div>
                <label className="block text-xs font-semibold text-text-dark mb-1 ml-1 uppercase">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full h-12 px-4 border border-gray-300 rounded-sm text-sm text-text-dark placeholder:text-text-gray focus:outline-none focus:border-primary-navy"
                />
              </div>
            )}
            <div>
              <label className="block text-xs font-semibold text-text-dark mb-1 ml-1 uppercase">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-12 px-4 border border-gray-300 rounded-sm text-sm text-text-dark placeholder:text-text-gray focus:outline-none focus:border-primary-navy"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-gray hover:text-text-dark text-xs font-medium"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 rounded-btn font-bold bg-primary-yellow text-primary-navy hover:brightness-110 transition-all flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-primary-navy border-t-transparent rounded-full animate-spin" />
          ) : (
            step === "email" ? "Continue" : (mode === "signin" ? "Sign In" : "Create Account")
          )}
        </button>

        {step === "credentials" && (
          <button
            type="button"
            onClick={() => setStep("email")}
            className="w-full text-xs font-semibold text-primary-navy hover:underline mt-2 text-center"
          >
            Change email
          </button>
        )}
      </form>

      <div className="mt-8 pt-6 border-t border-gray-100 text-sm">
        <p className="text-text-gray">
          {mode === "signin" ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={toggleMode}
            className="font-bold text-primary-navy hover:underline"
          >
            {mode === "signin" ? "Sign up" : "Sign in"}
          </button>
        </p>
      </div>

      {/* Footer text */}
      <p className="text-[11px] text-text-gray mt-6 leading-relaxed max-w-[280px] mx-auto">
        By continuing, you agree to Benefactor's{" "}
        <a href="#" className="underline">Terms of Service</a> and{" "}
        <a href="#" className="underline">Privacy Policy</a>.
      </p>

      {/* Back link */}
      <Link
        href="/"
        className="inline-block mt-4 text-sm font-medium text-text-dark hover:text-primary-navy transition-colors"
      >
        &larr; Back to Benefactor
      </Link>
    </div>
  );
}
