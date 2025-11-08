"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/Context/AuthContext";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import { AdminNavigation } from "@/components/admin/AdminNavigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { adminGetProjects } from "@/lib/admin-api";
import { Project } from "@/types/project";
import {
  FolderKanban,
  CheckCircle2,
  Clock,
  Calendar,
  TrendingUp,
} from "lucide-react";

export default function AdminDashboard() {
  const { token } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token) {
      loadProjects();
    }
  }, [token]);

  const loadProjects = async () => {
    try {
      setIsLoading(true);
      const data = await adminGetProjects(token!, "en");
      setProjects(data);
    } catch (error) {
      console.error("Failed to load projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const stats = {
    total: projects.length,
    completed: projects.filter((p) => p.status === "completed").length,
    inProgress: projects.filter((p) => p.status === "in-progress").length,
    planned: projects.filter((p) => p.status === "planned").length,
  };

  const recentProjects = projects
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  return (
    <ProtectedRoute>
      <div className="flex">
        <AdminNavigation />

        <main className="flex-1 lg:ml-64 p-4 md:p-6 lg:p-8 pt-20 lg:pt-8">
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-gov-gray-900">
              Dashboard
            </h1>
            <p className="text-gov-gray-600 mt-2">
              Welcome back! Here&apos;s an overview of your projects.
            </p>
          </div>

          {/* Statistics Cards */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader className="pb-3">
                    <div className="h-4 bg-gov-gray-200 rounded w-24"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-8 bg-gov-gray-200 rounded w-16"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
              <Card className="border-l-4 border-l-gov-navy-500">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-gov-gray-600">
                      Total Projects
                    </CardTitle>
                    <FolderKanban className="h-5 w-5 text-gov-navy-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gov-gray-900">
                    {stats.total}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-gov-gray-600">
                      Completed
                    </CardTitle>
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gov-gray-900">
                    {stats.completed}
                  </div>
                  <p className="text-xs text-gov-gray-500 mt-1">
                    {stats.total > 0
                      ? Math.round((stats.completed / stats.total) * 100)
                      : 0}
                    % of total
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-yellow-500">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-gov-gray-600">
                      In Progress
                    </CardTitle>
                    <Clock className="h-5 w-5 text-yellow-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gov-gray-900">
                    {stats.inProgress}
                  </div>
                  <p className="text-xs text-gov-gray-500 mt-1">
                    Currently active
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-gov-gray-600">
                      Planned
                    </CardTitle>
                    <Calendar className="h-5 w-5 text-blue-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gov-gray-900">
                    {stats.planned}
                  </div>
                  <p className="text-xs text-gov-gray-500 mt-1">
                    Upcoming projects
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Recent Projects */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-serif">
                    Recent Projects
                  </CardTitle>
                  <p className="text-sm text-gov-gray-500 mt-1">
                    Latest project additions
                  </p>
                </div>
                <TrendingUp className="h-5 w-5 text-gov-maroon-500" />
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 p-4 border rounded-lg animate-pulse"
                    >
                      <div className="w-16 h-16 bg-gov-gray-200 rounded"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gov-gray-200 rounded w-48 mb-2"></div>
                        <div className="h-3 bg-gov-gray-200 rounded w-32"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : recentProjects.length === 0 ? (
                <div className="text-center py-12">
                  <FolderKanban className="h-12 w-12 text-gov-gray-400 mx-auto mb-3" />
                  <p className="text-gov-gray-600">No projects yet</p>
                  <p className="text-sm text-gov-gray-500 mt-1">
                    Create your first project to get started
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentProjects.map((project) => (
                    <div
                      key={project._id}
                      className="flex items-center gap-4 p-4 border border-gov-gray-200 rounded-lg hover:border-gov-maroon-300 transition-colors"
                    >
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-16 h-16 object-cover rounded shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gov-gray-900 truncate">
                          {project.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 mt-1 text-xs sm:text-sm text-gov-gray-500">
                          <span className="truncate max-w-[150px]">
                            {project.department}
                          </span>
                          <span className="hidden sm:inline">•</span>
                          <span>{project.year}</span>
                          <span className="hidden sm:inline">•</span>
                          <span className="capitalize">{project.status}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </ProtectedRoute>
  );
}
