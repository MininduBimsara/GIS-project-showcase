# Frontend-Backend Integration Guide

## Overview

The frontend is now fully integrated with the backend API, fetching real project data based on the selected language. The dummy data has been removed and replaced with API calls.

## What Changed

### 1. New Files Created

#### Frontend

- **`/types/project.ts`** - TypeScript interfaces for project data and API responses
- **`/lib/api.ts`** - API service functions for fetching and managing projects
- **`.env.local`** - Environment configuration (set NEXT_PUBLIC_API_URL)

#### Backend

- **`/routes/AdminRoutes.js`** - Admin routes for future admin panel
- **`ADMIN_PANEL_GUIDE.md`** - Documentation for admin panel implementation

### 2. Modified Files

#### Frontend

- **`/components/Home/Body.tsx`**
  - Now fetches projects from API based on language
  - Added loading and error states
  - Uses real project data instead of locale dummy data
- **`/components/Home/Statisticssection.tsx`**

  - Fetches and calculates statistics from real API data
  - Updates when language changes

- **`/locales/en.ts, si.ts, ta.ts`**
  - Removed hardcoded projects array
  - Kept translations for UI elements and status labels

#### Backend

- **`/server.js`**
  - Added admin routes (`/api/admin/*`)

### 3. Deleted Files

- **`/frontend/data/projects.ts`** - No longer needed (replaced with API calls)

## API Endpoints Used

### Public Endpoints (No Auth Required)

- `GET /api/projects?lang=en|si|ta` - Get all projects in specified language
- `GET /api/projects/:id?lang=en|si|ta` - Get single project

### Admin Endpoints (Auth Required)

- `POST /api/admin/projects` - Create project
- `PUT /api/admin/projects/:id` - Update project
- `DELETE /api/admin/projects/:id` - Delete project

## How It Works

### Language Switching Flow

1. User clicks language button (English/සිංහල/தமிழ்)
2. Language context updates
3. `Body` component detects language change via `useEffect`
4. New API request made with `?lang=si` or `?lang=ta` parameter
5. Backend returns projects in requested language
6. Projects re-render with translated content
7. Statistics section also updates with new data

### Data Flow

```
User → Language Toggle → Context Update → API Call → Backend (MongoDB) → Response → UI Update
```

## Setup Instructions

### 1. Backend Setup

```bash
cd backend
npm install
```

Make sure `.env` file has:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
AZURE_TRANSLATOR_KEY=your_azure_key
AZURE_TRANSLATOR_REGION=your_region
PORT=5000
FRONTEND_ORIGIN=http://localhost:3000
```

Start backend:

```bash
npm run dev
```

### 2. Frontend Setup

```bash
cd frontend
npm install
```

Create `.env.local` with:

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Start frontend:

```bash
npm run dev
```

### 3. Test the Integration

1. Start both backend and frontend
2. Open http://localhost:3000
3. You should see projects loading from the backend
4. Try switching languages - projects should reload in the new language
5. Search functionality should work with real data

## Environment Variables

### Frontend (.env.local)

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Backend (.env)

```
MONGODB_URI=mongodb://...
JWT_SECRET=your-secret-key
AZURE_TRANSLATOR_KEY=your-key
AZURE_TRANSLATOR_REGION=your-region
PORT=5000
FRONTEND_ORIGIN=http://localhost:3000
```

## API Response Format

### Get All Projects

```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "_id": "...",
      "groupId": "...",
      "title": "Project Title",
      "description": "Project description",
      "imageUrl": "https://...",
      "projectUrl": "https://...",
      "department": "Department Name",
      "location": "Location",
      "year": "2024",
      "status": "completed",
      "createdBy": {
        "_id": "...",
        "name": "User Name",
        "email": "user@example.com"
      },
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

## Features Implemented

✅ Dynamic project loading from backend
✅ Language-based content switching (EN/SI/TA)
✅ Loading states with spinner
✅ Error handling with retry option
✅ Search functionality with real data
✅ Statistics calculated from real projects
✅ Admin routes structure (ready for admin panel)
✅ TypeScript types for type safety
✅ Environment configuration

## Next Steps

1. **Add Projects to Database**

   - Use Postman to add projects via `/api/projects` POST endpoint
   - Login first to get JWT token
   - Projects will be auto-translated to all languages

2. **Implement Admin Panel** (Future)

   - Create admin login page
   - Build project management interface
   - Use the API functions in `/lib/api.ts`
   - Follow `/backend/ADMIN_PANEL_GUIDE.md`

3. **Production Deployment**
   - Update `NEXT_PUBLIC_API_URL` to production backend URL
   - Update `FRONTEND_ORIGIN` in backend to production frontend URL
   - Ensure HTTPS is enabled
   - Set up proper CORS policies

## Troubleshooting

### Projects Not Loading

1. Check if backend is running on port 5000
2. Check browser console for errors
3. Verify `NEXT_PUBLIC_API_URL` in `.env.local`
4. Check MongoDB connection

### Language Not Switching

1. Ensure backend has projects in all languages
2. Check network tab to see if API calls include `?lang=` parameter
3. Verify Azure Translator is configured correctly

### CORS Errors

1. Check `FRONTEND_ORIGIN` in backend `.env`
2. Ensure CORS middleware is properly configured
3. Clear browser cache

## Notes

- All projects are stored in three separate collections (ProjectEn, ProjectSi, ProjectTa)
- Projects are linked by `groupId` field
- When creating/updating via API, translations happen automatically
- Statistics update in real-time based on fetched projects
- Search works across all project fields (title, description, department, location, year, status)

## Support

For issues or questions:

1. Check console logs (browser and terminal)
2. Review API documentation in Postman collection
3. Check `/backend/README.md` for backend details
4. Review `/backend/ADMIN_PANEL_GUIDE.md` for admin features
