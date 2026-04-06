import Image from "next/image";
import Link from "next/link";

export function DashboardNavbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-[1100px] mx-auto px-5 h-16 flex items-center justify-between">
        <Link href="/">
          <Image src="/assets/logo.svg" alt="Benefactor" width={140} height={28} />
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-text-dark hover:text-primary-navy transition-colors min-h-[44px] flex items-center">
            Home
          </Link>
          <Link href="#" className="text-sm font-medium text-text-dark hover:text-primary-navy transition-colors min-h-[44px] flex items-center">
            My Fundraisers
          </Link>
          <Link href="#" className="text-sm font-medium text-text-dark hover:text-primary-navy transition-colors min-h-[44px] flex items-center">
            Donations
          </Link>
          <div className="w-9 h-9 rounded-full bg-primary-navy text-white flex items-center justify-center text-sm font-bold">
            H
          </div>
        </div>
      </div>
    </nav>
  );
}
