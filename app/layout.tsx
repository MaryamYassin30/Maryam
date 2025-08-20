// trigger redeploy

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "You need, I can",
  description: "Local help. Real people. Prices upfront.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white">
        {/* Polished header */}
        <header className="border-b bg-white">
          <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
            {/* Left side: logo + tagline */}
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-black text-white grid place-items-center font-bold">
                YC
              </div>
              <div>
                <h1 className="font-semibold">You need, I can</h1>
                <p className="text-xs text-gray-500">
                  Local help. Real people. Prices upfront.
                </p>
              </div>
            </div>

            {/* Right side: actions */}
            <div className="flex items-center gap-2">
              <button className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-50">
                Sign in
              </button>
              <button className="rounded-lg bg-black text-white px-3 py-1.5 text-sm hover:bg-gray-800">
                + Post
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main>{children}</main>
      </body>
    </html>
  );
}
