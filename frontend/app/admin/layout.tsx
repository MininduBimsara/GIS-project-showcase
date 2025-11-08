"use client";

import { AuthProvider } from "@/Context/AuthContext";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  return (
    <AuthProvider>
      {isLoginPage ? (
        children
      ) : (
        <div className="min-h-screen bg-gov-gray-50 flex flex-col">
          {children}
        </div>
      )}
    </AuthProvider>
  );
}
