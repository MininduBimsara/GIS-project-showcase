import { Project, ApiResponse } from "@/types/project";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

/**
 * Admin API - Get all projects
 */
export async function adminGetProjects(
  token: string,
  language: string = "en"
): Promise<Project[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/admin/projects?lang=${language}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      }
    );

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
 * Admin API - Get single project
 */
export async function adminGetProjectById(
  token: string,
  id: string,
  language: string = "en"
): Promise<Project> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/admin/projects/${id}?lang=${language}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
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
 * Admin API - Create new project
 */
export async function adminCreateProject(
  token: string,
  projectData: Partial<Project>
): Promise<Project> {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify(projectData),
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        throw new Error("Not authorized. Please log in as admin.");
      }
      let message = `Failed to create project (HTTP ${response.status})`;
      try {
        const error = await response.json();
        message = error.message || error.error || message;
      } catch {
        try {
          const text = await response.text();
          if (text) message = `${message}: ${text}`;
        } catch {}
      }
      throw new Error(message);
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

/**
 * Admin API - Update project
 */
export async function adminUpdateProject(
  token: string,
  id: string,
  projectData: Partial<Project>
): Promise<Project> {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/projects/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify(projectData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to update project");
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

/**
 * Admin API - Delete project
 */
export async function adminDeleteProject(
  token: string,
  id: string
): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/projects/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to delete project");
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
