import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <h2 className="text-xl font-medium mb-1">Page not found</h2>
      <p className="mb-6">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link href="/" className="text-sm underline underline-offset-4">
        Go back home
      </Link>
    </div>
  );
}
