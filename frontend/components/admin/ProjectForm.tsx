"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Project } from "@/types/project";
import { X } from "lucide-react";

interface ProjectFormProps {
  project?: Project;
  onSubmit: (data: Partial<Project>) => Promise<void>;
  onCancel: () => void;
  isLoading: boolean;
}

export function ProjectForm({
  project,
  onSubmit,
  onCancel,
  isLoading,
}: ProjectFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    projectUrl: "",
    department: "",
    location: "",
    year: new Date().getFullYear().toString(),
    status: "planned" as Project["status"],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        description: project.description,
        imageUrl: project.imageUrl,
        projectUrl: project.projectUrl || "",
        department: project.department,
        location: project.location,
        year: project.year,
        status: project.status,
      });
    }
  }, [project]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }

    if (!formData.department.trim()) {
      newErrors.department = "Department is required";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = "Image URL is required";
    } else if (!/^https?:\/\/.+/.test(formData.imageUrl)) {
      newErrors.imageUrl = "Invalid URL format";
    }

    if (!formData.year.match(/^\d{4}$/)) {
      newErrors.year = "Invalid year format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      // FIX: Removed the unnecessary conversion logic.
      // The formData object already has the correct status
      // from the <select> element.
      const payload: Partial<Project> = {
        ...formData,
      };

      await onSubmit(payload);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
      <Card className="w-full max-w-2xl my-8 bg-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-serif">
              {project ? "Edit Project" : "Add New Project"}
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onCancel}
              disabled={isLoading}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gov-gray-700 mb-1"
              >
                Project Title *
              </label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter project title"
                disabled={isLoading}
                aria-invalid={!!errors.title}
              />
              {errors.title && (
                <p className="text-sm text-red-600 mt-1">{errors.title}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gov-gray-700 mb-1"
              >
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter project description"
                rows={4}
                disabled={isLoading}
                className="w-full px-3 py-2 border border-gov-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gov-maroon-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              />
              {errors.description && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Department */}
            <div>
              <label
                htmlFor="department"
                className="block text-sm font-medium text-gov-gray-700 mb-1"
              >
                Department *
              </label>
              <Input
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="e.g., Ministry of Urban Development"
                disabled={isLoading}
                aria-invalid={!!errors.department}
              />
              {errors.department && (
                <p className="text-sm text-red-600 mt-1">{errors.department}</p>
              )}
            </div>

            {/* Location */}
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gov-gray-700 mb-1"
              >
                Location *
              </label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Colombo"
                disabled={isLoading}
                aria-invalid={!!errors.location}
              />
              {errors.location && (
                <p className="text-sm text-red-600 mt-1">{errors.location}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Year */}
              <div>
                <label
                  htmlFor="year"
                  className="block text-sm font-medium text-gov-gray-700 mb-1"
                >
                  Year *
                </label>
                <Input
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  placeholder="2024"
                  disabled={isLoading}
                  aria-invalid={!!errors.year}
                />
                {errors.year && (
                  <p className="text-sm text-red-600 mt-1">{errors.year}</p>
                )}
              </div>

              {/* Status */}
              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gov-gray-700 mb-1"
                >
                  Status *
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full h-9 px-3 py-1 border border-gov-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gov-maroon-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  <option value="planned">Planned</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label
                htmlFor="imageUrl"
                className="block text-sm font-medium text-gov-gray-700 mb-1"
              >
                Image URL *
              </label>
              <Input
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                disabled={isLoading}
                aria-invalid={!!errors.imageUrl}
              />
              {errors.imageUrl && (
                <p className="text-sm text-red-600 mt-1">{errors.imageUrl}</p>
              )}
              {formData.imageUrl && !errors.imageUrl && (
                <img
                  src={formData.imageUrl}
                  alt="Preview"
                  className="mt-2 w-full h-48 object-cover rounded-md"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                    setErrors((prev) => ({
                      ...prev,
                      imageUrl: "Failed to load image",
                    }));
                  }}
                />
              )}
            </div>

            {/* Project URL */}
            <div>
              <label
                htmlFor="projectUrl"
                className="block text-sm font-medium text-gov-gray-700 mb-1"
              >
                Project URL (optional)
              </label>
              <Input
                id="projectUrl"
                name="projectUrl"
                value={formData.projectUrl}
                onChange={handleChange}
                placeholder="https://example.com/project"
                disabled={isLoading}
              />
            </div>

            {/* Form Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-gov-maroon-500 hover:bg-gov-maroon-600"
              >
                {isLoading
                  ? "Saving..."
                  : project
                  ? "Update Project"
                  : "Create Project"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isLoading}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
