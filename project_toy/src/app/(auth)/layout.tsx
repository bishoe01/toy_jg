import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0A0E10] absolute top-0 left-0 w-full h-[100vh] z-50 px-6">
      {children}
    </div>
  );
}
