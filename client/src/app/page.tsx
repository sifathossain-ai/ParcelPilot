import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-2">ParcelPilot</h1>
      <p className="text-gray-600 mb-8 max-w-md">
        AI-Assisted Address Structuring and Courier Booking Automation for Bangladeshi F-commerce Sellers.
      </p>

      <div className="flex gap-4">
        <Link
          href="/dashboard"
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition"
        >
          Open Dashboard
        </Link>
        <Link
          href="/login"
          className="px-6 py-3 bg-white text-gray-800 font-medium rounded-lg border border-gray-300 shadow-sm hover:bg-gray-100 transition"
        >
          Seller Login
        </Link>
      </div>
    </div>
  );
}
