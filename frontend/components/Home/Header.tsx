"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/Context/Languagecontext";
import { useRouter, usePathname } from "next/navigation";

export function Header() {
  const { language, setLanguage, t } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      {/* Top Strip - Fixed and Responsive */}
      <div className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-[#8b2635] to-[#8b2635]/80 text-white py-2 md:py-3">
        <div className="container mx-auto px-2 md:px-4">
          <div className="flex flex-wrap justify-between items-center text-xs md:text-sm gap-2">
            <div className="flex flex-wrap gap-2 md:gap-6">
              <span>📧 {t.header.email}</span>
              <span>📞 {t.header.phone}</span>
            </div>
            <div className="flex gap-2 md:gap-4">
              <button
                onClick={() => setLanguage("en")}
                className={`hover:text-[#fbbf24] transition-colors ${
                  language === "en" ? "text-[#fbbf24] font-bold" : ""
                }`}
              >
                English
              </button>
              <span>|</span>
              <button
                onClick={() => setLanguage("si")}
                className={`hover:text-[#fbbf24] transition-colors ${
                  language === "si" ? "text-[#fbbf24] font-bold" : ""
                }`}
              >
                සිංහල
              </button>
              <span>|</span>
              <button
                onClick={() => setLanguage("ta")}
                className={`hover:text-[#fbbf24] transition-colors ${
                  language === "ta" ? "text-[#fbbf24] font-bold" : ""
                }`}
              >
                தமிழ்
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Header - flush with Top Strip */}
      <header className="bg-white shadow-md sticky top-[32px] md:top-[44px] z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between py-6 gap-4">
            <div className="flex items-center gap-4">
              <Image
                src="/logo.png"
                alt="GIS Logo"
                width={50}
                height={50}
                className="object-contain"
              />

              <div>
                <h1 className="text-xl md:text-2xl font-bold text-[#8b2635] font-serif">
                  {t.header.title}
                </h1>
                <p className="text-sm text-slate-600">{t.header.subtitle}</p>
              </div>
            </div>
            <nav className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                className={`${
                  pathname === "/"
                    ? "text-gov-maroon-500 font-bold"
                    : "text-gov-maroon-500 font-normal"
                }`}
                onClick={() => router.push("/")}
              >
                {t.header.nav.home}
              </Button>
              {/* <Button variant="ghost" size="sm">
                {t.header.nav.projects}
              </Button>
              <Button variant="ghost" size="sm">
                {t.header.nav.services}
              </Button> */}
              <Button
                variant="ghost"
                size="sm"
                className={`${
                  pathname === "/contact"
                    ? "text-gov-maroon-500 font-bold"
                    : "text-gov-maroon-500 font-normal"
                }`}
                onClick={() => router.push("/contact")}
              >
                {t.header.nav.contact}
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-slate-100 border-y">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <a href="/" className="hover:text-[#8b2635] transition-colors">
              {t.header.breadcrumb.home}
            </a>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#8b2635] font-medium">
              {t.header.breadcrumb.projects}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
