export interface Project {
  _id: string;
  groupId: string;
  title: string;
  description: string;
  imageUrl: string;
  projectUrl: string;
  department: string;
  location: string;
  year: string;
  status: "completed" | "ongoing" | "in-progress" | "planned";
  createdBy?: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  message?: string;
  error?: string;
}

export interface ProjectStats {
  total: number;
  completed: number;
  ongoing: number;
  inProgress: number;
  planned: number;
}
