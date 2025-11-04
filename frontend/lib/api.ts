import { Project, ApiResponse, ProjectStats } from "@/types/project";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

/**
 * Fetch all projects from the backend
 * @param language - Language code (en, si, ta)
 * @returns Promise with projects array
 */
export async function fetchProjects(
  language: string = "en"
): Promise<Project[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/projects?lang=${language}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // Always fetch fresh data
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.statusText}`);
    }

    const result: ApiResponse<Project[]> = await response.json();

    if (!result.success) {
      throw new Error(result.error || "Failed to fetch projects");
    }

    return result.data || [];
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
}

/**
 * Fetch a single project by ID
 * @param id - Project group ID
 * @param language - Language code (en, si, ta)
 * @returns Promise with project
 */
export async function fetchProjectById(
  id: string,
  language: string = "en"
): Promise<Project> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/projects/${id}?lang=${language}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch project: ${response.statusText}`);
    }

    const result: ApiResponse<Project> = await response.json();

    if (!result.success) {
      throw new Error(result.error || "Failed to fetch project");
    }

    return result.data;
  } catch (error) {
    console.error("Error fetching project:", error);
    throw error;
  }
}

/**
 * Calculate project statistics
 * @param projects - Array of projects
 * @returns Statistics object
 */
export function calculateProjectStats(projects: Project[]): ProjectStats {
  const stats = {
    total: projects.length,
    completed: 0,
    ongoing: 0,
    inProgress: 0,
    planned: 0,
  };

  projects.forEach((project) => {
    switch (project.status) {
      case "completed":
        stats.completed++;
        break;
      case "ongoing":
        stats.ongoing++;
        break;
      case "in-progress":
        stats.inProgress++;
        break;
      case "planned":
        stats.planned++;
        break;
    }
  });

  return stats;
}

/**
 * Admin API functions (to be implemented later)
 */

export async function createProject(
  projectData: Partial<Project>,
  token: string
): Promise<Project> {
  try {
    const response = await fetch(`${API_BASE_URL}/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(projectData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create project: ${response.statusText}`);
    }

    const result: ApiResponse<{ groupId: string; project: Project }> =
      await response.json();

    if (!result.success) {
      throw new Error(result.error || "Failed to create project");
    }

    return result.data.project;
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
}

export async function updateProject(
  id: string,
  projectData: Partial<Project>,
  token: string
): Promise<Project> {
  try {
    const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(projectData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update project: ${response.statusText}`);
    }

    const result: ApiResponse<Project> = await response.json();

    if (!result.success) {
      throw new Error(result.error || "Failed to update project");
    }

    return result.data;
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
}

export async function deleteProject(id: string, token: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete project: ${response.statusText}`);
    }

    const result: ApiResponse<{ groupId: string }> = await response.json();

    if (!result.success) {
      throw new Error(result.error || "Failed to delete project");
    }
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
}
