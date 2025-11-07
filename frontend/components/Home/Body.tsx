"use client";

import { useState, useMemo, useEffect } from "react";
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
  Loader2,
  AlertCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/Context/Languagecontext";
import { fetchProjects } from "@/lib/api";
import { Project } from "@/types/project";

export function MainContent() {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const PROJECTS_PER_PAGE = 6;

  // Fetch projects when language changes, with localStorage caching for first 6
  useEffect(() => {
    const cached = localStorage.getItem("cachedFirst6Projects");
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        setProjects(parsed);
        setCurrentPage(1);
        setLoading(false);
        return;
      } catch (e) {
        // If parsing fails, fallback to API
      }
    }
    const loadProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProjects(language);
        setProjects(data);
        setCurrentPage(1); // Reset to first page on language change
        // Cache the first 6 projects
        if (Array.isArray(data) && data.length > 0) {
          localStorage.setItem(
            "cachedFirst6Projects",
            JSON.stringify(data.slice(0, 6))
          );
        }
      } catch (err) {
        console.error("Failed to load projects:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load projects"
        );
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, [language]);

  // Filter projects based on search query
  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) {
      return projects;
    }

    const query = searchQuery.toLowerCase();
    return projects.filter(
      (project) =>
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.department.toLowerCase().includes(query) ||
        project.location.toLowerCase().includes(query) ||
        project.year.toLowerCase().includes(query) ||
        project.status.toLowerCase().includes(query)
    );
  }, [searchQuery, projects]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);
  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * PROJECTS_PER_PAGE;
    return filteredProjects.slice(start, start + PROJECTS_PER_PAGE);
  }, [filteredProjects, currentPage]);

  const clearSearch = () => {
    setSearchQuery("");
    setCurrentPage(1);
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
        {searchQuery && !loading && (
          <p className="mt-3 text-sm text-slate-600 text-center">
            {t.main.searchResults} {filteredProjects.length}{" "}
            {filteredProjects.length !== 1
              ? t.main.searchResultsPlural
              : t.main.searchResultsSingular}{" "}
            {t.main.searchMatching} &quot;{searchQuery}&quot;
          </p>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-12 h-12 text-[#8b2635] animate-spin mb-4" />
          <p className="text-slate-600">Loading projects...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="flex flex-col items-center justify-center py-20">
          <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
          <h3 className="text-2xl font-bold text-slate-700 mb-2">
            Failed to Load Projects
          </h3>
          <p className="text-slate-500 mb-6">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            className="border-[#8b2635] text-[#8b2635] hover:bg-[#8b2635] hover:text-white"
          >
            Retry
          </Button>
        </div>
      )}

      {/* Projects Grid with Pagination */}
      {!loading && !error && filteredProjects.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedProjects.map((project, index) => (
              <Card
                key={project._id}
                className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-[#8b2635]/20 flex flex-col h-full"
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
                <CardContent className="space-y-4 flex flex-col flex-1">
                  <div className="space-y-2 flex-1">
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
                  <Link href={project.projectUrl || "#"}>
                    <Button
                      variant="outline"
                      className="w-full mt-4 group/btn border-[#8b2635]/30 bg-[#8b2635] text-white"
                    >
                      {t.main.viewDetails}
                      <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-10">
              <Button
                variant="outline"
                size="sm"
                className="border-[#8b2635] text-[#8b2635] hover:bg-[#8b2635] hover:text-white px-3"
                onClick={() => {
                  if (currentPage > 1) {
                    setCurrentPage(currentPage - 1);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                disabled={currentPage === 1}
              >
                Prev
              </Button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold border transition-colors
                    ${
                      currentPage === i + 1
                        ? "bg-[#8b2635] text-white border-[#8b2635]"
                        : "bg-white text-[#8b2635] border-[#8b2635]/30 hover:bg-[#8b2635]/10"
                    }
                  `}
                  onClick={() => {
                    setCurrentPage(i + 1);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  aria-current={currentPage === i + 1 ? "page" : undefined}
                >
                  {i + 1}
                </button>
              ))}
              <Button
                variant="outline"
                size="sm"
                className="border-[#8b2635] text-[#8b2635] hover:bg-[#8b2635] hover:text-white px-3"
                onClick={() => {
                  setCurrentPage((p) => {
                    const next = Math.min(totalPages, p + 1);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    return next;
                  });
                }}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}

      {/* No Results State */}
      {!loading && !error && filteredProjects.length === 0 && (
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
