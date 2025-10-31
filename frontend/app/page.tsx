"use client";

import { Header } from "@/components/Home/Header";
import { MainContent } from "@/components/Home/Body";
import { StatisticsSection } from "@/components/Home/Statisticssection";
import { Footer } from "@/components/Home/Footer";
import { LanguageProvider } from "@/Context/Languagecontext";

export default function Page() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
        <Header />
        <MainContent />
        <div className="container mx-auto px-4">
          <StatisticsSection />
        </div>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
