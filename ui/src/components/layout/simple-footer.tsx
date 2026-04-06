import Image from "next/image";
import Link from "next/link";

export function SimpleFooter() {
  return (
    <footer className="bg-primary-navy text-white py-10">
      <div className="max-w-container mx-auto px-5 flex flex-col items-center gap-3">
        <Link href="/">
          <Image src="/assets/logo-footer.png" alt="Benefactor" width={120} height={24} />
        </Link>
        <p className="text-sm text-gray-400">World Wide Fundraising Platform</p>
      </div>
    </footer>
  );
}
