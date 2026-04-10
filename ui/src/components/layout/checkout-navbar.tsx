import Image from "next/image";
import Link from "next/link";

export function CheckoutNavbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="relative flex items-center justify-center px-4 md:px-10 h-16">
        {/* Back link - left */}
        <Link
          href="/campaigns/1"
          className="absolute left-4 md:left-10 text-sm font-medium text-primary-navy hover:opacity-80 transition-opacity min-h-[44px] flex items-center gap-1"
        >
          <span className="text-base">←</span> Back
        </Link>

        {/* Logo - center */}
        <Link href="/" className="flex items-center">
          <Image
            src="/assets/logo.svg"
            alt="Benefactor"
            width={140}
            height={40}
            className="h-10 w-auto"
          />
        </Link>

        {/* Sign in - right */}
        <Link
          href="/signin"
          className="absolute right-4 md:right-10 text-sm font-medium text-primary-navy hover:opacity-80 transition-opacity min-h-[44px] flex items-center"
        >
          <span className="hidden sm:inline">
            Already have an account?{" "}
          </span>
          <span className="font-bold text-primary-yellow ml-1">Sign in</span>
        </Link>
      </div>
    </nav>
  );
}
