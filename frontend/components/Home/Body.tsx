"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MapPin,
  Calendar,
  ExternalLink,
  Building2,
  Search,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/Context/Languagecontext";

export function MainContent() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");

  // Filter projects based on search query
  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) {
      return t.projects;
    }

    const query = searchQuery.toLowerCase();
    return t.projects.filter(
      (project) =>
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.department.toLowerCase().includes(query) ||
        project.location.toLowerCase().includes(query) ||
        project.year.toLowerCase().includes(query) ||
        project.status.toLowerCase().includes(query)
    );
  }, [searchQuery, t.projects]);

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <main className="container mx-auto px-4 py-12">
      {/* Page Header */}
      <div className="mb-12 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-[#8b2635] mb-4 font-serif">
          {t.main.pageTitle}
        </h2>
        <div className="w-24 h-1 bg-[#fbbf24] mx-auto mb-6"></div>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
          {t.main.pageDescription}
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-10 max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            type="text"
            placeholder={t.main.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-12 py-6 text-base border-2 border-slate-200 focus:border-[#8b2635] rounded-xl shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#8b2635] transition-colors"
              aria-label="Clear search"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        {searchQuery && (
          <p className="mt-3 text-sm text-slate-600 text-center">
            {t.main.searchResults} {filteredProjects.length}{" "}
            {filteredProjects.length !== 1
              ? t.main.searchResultsPlural
              : t.main.searchResultsSingular}{" "}
            {t.main.searchMatching} &quot;{searchQuery}&quot;
          </p>
        )}
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <Card
              key={project.id}
              className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-[#8b2635]/20"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Badge
                  className="absolute top-4 right-4 shadow-xl font-bold backdrop-blur-sm capitalize"
                  variant={
                    project.status === "completed" ? "default" : "secondary"
                  }
                >
                  {t.status[project.status as keyof typeof t.status]}
                </Badge>
              </div>
              <CardHeader className="space-y-3">
                <CardTitle className="text-xl font-serif leading-tight group-hover:text-[#8b2635] transition-colors">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed line-clamp-3">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-sm">
                    <Building2 className="w-4 h-4 text-[#8b2635] flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600 line-clamp-1">
                      {project.department}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <MapPin className="w-4 h-4 text-[#8b2635] flex-shrink-0" />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Calendar className="w-4 h-4 text-[#8b2635] flex-shrink-0" />
                    <span>{project.year}</span>
                  </div>
                </div>
                <Link href={project.link}>
                  <Button
                    variant="outline"
                    className="w-full mt-4 group/btn border-[#8b2635]/30 hover:bg-[#8b2635] hover:text-white"
                  >
                    {t.main.viewDetails}
                    <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="mb-4">
            <Search className="w-16 h-16 text-slate-300 mx-auto" />
          </div>
          <h3 className="text-2xl font-bold text-slate-700 mb-2">
            {t.main.noResults.title}
          </h3>
          <p className="text-slate-500 mb-6">{t.main.noResults.description}</p>
          <Button
            onClick={clearSearch}
            variant="outline"
            className="border-[#8b2635] text-[#8b2635] hover:bg-[#8b2635] hover:text-white"
          >
            {t.main.noResults.button}
          </Button>
        </div>
      )}
    </main>
  );
}
