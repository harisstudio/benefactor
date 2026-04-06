import Image from "next/image";
import Link from "next/link";

export function SimpleNavbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-container mx-auto px-5 h-16 flex items-center justify-between">
        <Link href="/">
          <Image src="/assets/logo.svg" alt="Benefactor" width={140} height={28} />
        </Link>
        <Link
          href="/"
          className="text-sm font-medium text-text-dark hover:text-primary-navy transition-colors min-h-[44px] flex items-center"
        >
          &larr; Back to Home
        </Link>
      </div>
    </nav>
  );
}
