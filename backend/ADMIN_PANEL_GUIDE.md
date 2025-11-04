# Admin Panel Integration Guide

This document outlines the admin routes and API structure for implementing an admin panel in the future.

## Admin API Routes

All admin routes are prefixed with `/api/admin` and require authentication via JWT token.

### Authentication

Include the JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### Available Routes

#### Project Management

- **GET** `/api/admin/projects?lang=en|si|ta` - Get all projects
- **GET** `/api/admin/projects/:id?lang=en|si|ta` - Get single project by groupId
- **POST** `/api/admin/projects` - Create new project (with auto-translation)
- **PUT** `/api/admin/projects/:id` - Update project (with auto-translation)
- **DELETE** `/api/admin/projects/:id` - Delete project (all language versions)

#### Create Project Payload

```json
{
  "title": "Project Title",
  "description": "Project description",
  "imageUrl": "https://example.com/image.jpg",
  "projectUrl": "https://example.com/project",
  "department": "Department Name",
  "location": "Location",
  "year": "2024",
  "status": "completed" // or "ongoing", "in-progress", "planned"
}
```

### Future Routes (To Be Implemented)

#### User Management

- **GET** `/api/admin/users` - Get all users
- **GET** `/api/admin/users/:id` - Get user by ID
- **PUT** `/api/admin/users/:id` - Update user
- **DELETE** `/api/admin/users/:id` - Delete user

#### Dashboard

- **GET** `/api/admin/dashboard/stats` - Get dashboard statistics

#### Activity Logs

- **GET** `/api/admin/logs` - Get activity logs

## Frontend Integration

The frontend API helper functions are already available in `/frontend/lib/api.ts`:

```typescript
import { createProject, updateProject, deleteProject } from "@/lib/api";

// Create project
const newProject = await createProject(projectData, token);

// Update project
const updated = await updateProject(groupId, projectData, token);

// Delete project
await deleteProject(groupId, token);
```

## Next Steps for Admin Panel Implementation

1. **Create Admin Authentication Flow**

   - Login page at `/admin/login`
   - Protected admin routes
   - Token management (localStorage/cookies)

2. **Create Admin Dashboard**

   - Statistics overview
   - Recent projects
   - Quick actions

3. **Create Project Management Interface**

   - Projects list with search/filter
   - Add new project form
   - Edit project form
   - Delete confirmation modal
   - Image upload functionality

4. **Create User Management Interface** (Optional)

   - User list
   - Add/Edit user
   - Role management

5. **Add Activity Logging**
   - Track admin actions
   - Display logs in admin panel

## Recommended Tech Stack for Admin Panel

- **Framework**: Next.js (already setup)
- **UI Components**: shadcn/ui (already setup)
- **Forms**: React Hook Form + Zod validation
- **State Management**: React Context or Zustand
- **Tables**: TanStack Table
- **File Upload**: React Dropzone
- **Rich Text Editor**: Tiptap or Quill

## Security Considerations

1. Always validate JWT tokens on the backend
2. Implement rate limiting for admin routes
3. Add CSRF protection
4. Log all admin actions for audit trail
5. Implement role-based access control (RBAC)
6. Use HTTPS in production
7. Sanitize all user inputs
8. Implement file upload validation and size limits

## Testing

Use the provided Postman collection: `GIS_Project_Showcase_API.postman_collection.json`

Update the collection with admin routes for easier testing.
