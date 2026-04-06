import Image from "next/image";
import Link from "next/link";

export function CheckoutNavbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-container mx-auto px-5 h-16 grid grid-cols-3 items-center">
        <Link
          href="/campaigns/1"
          className="text-sm font-medium text-text-dark hover:text-primary-navy transition-colors min-h-[44px] flex items-center"
        >
          &larr; Back
        </Link>
        <Link href="/" className="flex justify-center">
          <Image src="/assets/logo.svg" alt="Benefactor" width={140} height={28} />
        </Link>
        <div className="flex justify-end">
          <Link
            href="/signin"
            className="text-sm text-text-gray hover:text-text-dark transition-colors min-h-[44px] flex items-center"
          >
            Already have an account? <span className="ml-1 font-semibold text-text-dark">Sign in</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
