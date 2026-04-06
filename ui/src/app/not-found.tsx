import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-5">
      <h1 className="text-6xl font-bold text-primary-navy font-heading">404</h1>
      <p className="mt-4 text-lg text-text-gray">Page not found</p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center justify-center h-12 px-8 rounded-btn font-bold bg-primary-yellow text-primary-navy shadow-sm hover:shadow-md transition-shadow"
      >
        Back to Home
      </Link>
    </main>
  );
}
