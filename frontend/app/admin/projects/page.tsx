"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/Context/AuthContext";
import { useLanguage } from "@/Context/Languagecontext";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import { AdminNavigation } from "@/components/admin/AdminNavigation";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { DeleteConfirmModal } from "@/components/admin/DeleteConfirmModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  adminGetProjects,
  adminCreateProject,
  adminUpdateProject,
  adminDeleteProject,
} from "@/lib/admin-api";
import { Project } from "@/types/project";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  ExternalLink,
  Filter,
  SortAsc,
  SortDesc,
} from "lucide-react";

export default function AdminProjects() {
  const { token } = useAuth();
  const { language } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Form states
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Delete modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingProject, setDeletingProject] = useState<Project | undefined>();
  const [isDeleting, setIsDeleting] = useState(false);

  const loadProjects = async () => {
    try {
      setIsLoading(true);
      const data = await adminGetProjects(token!, language);
      setProjects(data);
    } catch (error) {
      console.error("Failed to load projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      loadProjects();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, language]);

  useEffect(() => {
    filterAndSortProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects, searchQuery, statusFilter, sortOrder]);

  const filterAndSortProjects = () => {
    let filtered = [...projects];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.department.toLowerCase().includes(query) ||
          project.location.toLowerCase().includes(query) ||
          project.year.includes(query)
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((project) => project.status === statusFilter);
    }

    // Sort by date
    filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    setFilteredProjects(filtered);
  };

  const handleCreateProject = async (data: Partial<Project>) => {
    try {
      setIsSubmitting(true);
      await adminCreateProject(token!, data);
      await loadProjects();
      setShowForm(false);
      setEditingProject(undefined);
    } catch (error) {
      console.error("Failed to create project:", error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateProject = async (data: Partial<Project>) => {
    if (!editingProject) return;

    try {
      setIsSubmitting(true);
      await adminUpdateProject(token!, editingProject.groupId, data);
      await loadProjects();
      setShowForm(false);
      setEditingProject(undefined);
    } catch (error) {
      console.error("Failed to update project:", error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProject = async () => {
    if (!deletingProject) return;

    try {
      setIsDeleting(true);
      await adminDeleteProject(token!, deletingProject.groupId);
      await loadProjects();
      setShowDeleteModal(false);
      setDeletingProject(undefined);
    } catch (error) {
      console.error("Failed to delete project:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const openEditForm = (project: Project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const openDeleteModal = (project: Project) => {
    setDeletingProject(project);
    setShowDeleteModal(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingProject(undefined);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setDeletingProject(undefined);
  };

  const getStatusColor = (status: Project["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "planned":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gov-gray-100 text-gov-gray-800 border-gov-gray-200";
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex">
        <AdminNavigation />

        <main className="flex-1 lg:ml-64 p-4 md:p-6 lg:p-8 pt-20 lg:pt-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 md:mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-serif font-bold text-gov-gray-900">
                Projects
              </h1>
              <p className="text-gov-gray-600 mt-2">
                Manage all government sector projects
              </p>
            </div>
            <Button
              onClick={() => setShowForm(true)}
              className="bg-gov-maroon-500 hover:bg-gov-maroon-600 text-white w-full sm:w-auto"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Project
            </Button>
          </div>

          {/* Filters and Search */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col gap-3">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gov-gray-400" />
                  <Input
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Status Filter and Sort */}
                <div className="flex gap-2">
                  <div className="flex-1">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full h-10 px-3 py-2 border border-gov-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gov-maroon-500 focus:border-transparent text-sm"
                    >
                      <option value="all">All Status</option>
                      <option value="completed">Completed</option>
                      <option value="in-progress">In Progress</option>
                      <option value="planned">Planned</option>
                    </select>
                  </div>

                  {/* Sort Button */}
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
                    }
                    title={`Sort ${
                      sortOrder === "asc" ? "Descending" : "Ascending"
                    }`}
                  >
                    {sortOrder === "asc" ? (
                      <SortAsc className="h-4 w-4" />
                    ) : (
                      <SortDesc className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Results count */}
              <div className="mt-4 text-sm text-gov-gray-600">
                Showing {filteredProjects.length} of {projects.length} projects
              </div>
            </CardContent>
          </Card>

          {/* Projects List */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="w-32 h-32 bg-gov-gray-200 rounded"></div>
                      <div className="flex-1 space-y-3">
                        <div className="h-4 bg-gov-gray-200 rounded w-3/4"></div>
                        <div className="h-3 bg-gov-gray-200 rounded w-full"></div>
                        <div className="h-3 bg-gov-gray-200 rounded w-5/6"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredProjects.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <div className="text-gov-gray-400 mb-4">
                  <Search className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gov-gray-900 mb-2">
                  No projects found
                </h3>
                <p className="text-gov-gray-600 mb-6">
                  {searchQuery || statusFilter !== "all"
                    ? "Try adjusting your search or filters"
                    : "Create your first project to get started"}
                </p>
                {(searchQuery || statusFilter !== "all") && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("");
                      setStatusFilter("all");
                    }}
                  >
                    Clear Filters
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-4 lg:gap-6">
              {filteredProjects.map((project) => (
                <Card
                  key={project._id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-4 md:p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Project Image */}
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full sm:w-32 h-48 sm:h-32 object-cover rounded shrink-0"
                      />

                      {/* Project Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="font-semibold text-gov-gray-900 line-clamp-2">
                            {project.title}
                          </h3>
                        </div>

                        <p className="text-sm text-gov-gray-600 line-clamp-2 mb-3">
                          {project.description}
                        </p>

                        <div className="space-y-1 text-xs text-gov-gray-500 mb-3">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Department:</span>
                            <span className="truncate">
                              {project.department}
                            </span>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <span className="font-medium">Location:</span>
                              <span>{project.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="font-medium">Year:</span>
                              <span>{project.year}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between gap-2">
                          <Badge
                            className={`${getStatusColor(
                              project.status
                            )} border`}
                          >
                            {project.status.replace("-", " ")}
                          </Badge>

                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              className="hover:bg-gov-gray-200"
                              onClick={() => openEditForm(project)}
                              title="Edit project"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              onClick={() => openDeleteModal(project)}
                              title="Delete project"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Project Form Modal */}
      {showForm && (
        <ProjectForm
          project={editingProject}
          onSubmit={editingProject ? handleUpdateProject : handleCreateProject}
          onCancel={closeForm}
          isLoading={isSubmitting}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && deletingProject && (
        <DeleteConfirmModal
          projectTitle={deletingProject.title}
          onConfirm={handleDeleteProject}
          onCancel={closeDeleteModal}
          isLoading={isDeleting}
        />
      )}
    </ProtectedRoute>
  );
}
