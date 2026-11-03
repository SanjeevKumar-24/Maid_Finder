import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Maid_Finder",
  description: "Connect with verified domestic helpers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-gray-100 font-sans">
        <nav className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="text-xl font-bold tracking-wider text-white">Maid_Finder</Link>
            <div className="space-x-4">
              <Link href="/login" className="text-gray-300 hover:text-white transition font-medium">Login</Link>
              <Link href="/signup" className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition shadow-lg shadow-blue-900/20">Sign Up</Link>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}