"use client";

import { Building2, FolderKanban, Database, Clock } from "lucide-react";
import { useLanguage } from "@/Context/Languagecontext";

const iconMap = [Building2, FolderKanban, Database, Clock];

export function StatisticsSection() {
  const { t } = useLanguage();

  return (
    <div className="mt-20 bg-gradient-to-br from-[#8b2635] via-[#8b2635] to-[#6d1f29] rounded-3xl p-12 text-white shadow-2xl relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#fbbf24] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#fbbf24] rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold mb-3 font-serif">
            {t.statistics.title}
          </h3>
          <div className="w-24 h-1 bg-[#fbbf24] mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.statistics.stats.map((stat, index) => {
            const Icon = iconMap[index];
            return (
              <div
                key={index}
                className="group relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 hover:border-[#fbbf24]/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                {/* Icon */}
                <div className="mb-4 flex justify-center">
                  <div className="w-16 h-16 bg-[#fbbf24]/20 rounded-full flex items-center justify-center group-hover:bg-[#fbbf24]/30 transition-colors">
                    <Icon className="w-8 h-8 text-[#fbbf24]" />
                  </div>
                </div>

                {/* Value */}
                <div className="text-5xl font-bold text-[#fbbf24] mb-2 text-center group-hover:scale-110 transition-transform">
                  {stat.value}
                </div>

                {/* Label */}
                <div className="text-lg font-semibold text-white/95 mb-1 text-center">
                  {stat.label}
                </div>

                {/* Description */}
                <div className="text-sm text-white/70 text-center">
                  {stat.description}
                </div>

                {/* Decorative Element */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#fbbf24]/5 rounded-full blur-2xl group-hover:bg-[#fbbf24]/10 transition-colors"></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
