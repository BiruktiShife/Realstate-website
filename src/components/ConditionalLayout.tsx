"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingActionButton } from "@/components/FloatingActionButton";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();

  // Check if current route is an admin route
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <>
      {/* Header - show on all pages */}
      <Header />

      {/* Main content */}
      <main>{children}</main>

      {/* Footer - show on all pages except admin */}
      {!isAdminRoute && <Footer />}

      {/* Floating Action Button - show on all pages except admin */}
      {!isAdminRoute && <FloatingActionButton />}
    </>
  );
}
