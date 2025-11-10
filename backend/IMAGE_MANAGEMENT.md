# Image Management Documentation

## Overview

The backend of this project manages images primarily for project-related data. Images are uploaded, stored, and referenced in the database, supporting project showcase features.

## Key Components

### 1. Upload Directory

- **Path:** `backend/data/uploads/`
- **Purpose:** Stores all uploaded image files.
- Images are saved here when users upload them via the API.

### 2. Middleware

- **File:** `backend/middleware/uploadMiddleware.js`
- Handles file uploads, likely using a library such as `multer`.
- Responsible for:
  - Parsing incoming multipart/form-data requests.
  - Saving uploaded images to the `uploads/` directory.
  - Attaching file information to the request object for further processing.

### 3. Controllers

- **File:** `backend/controller/ProjectController.js`
- Handles business logic for projects, including image management.
- Likely responsibilities:
  - Receiving image data from the middleware.
  - Saving image URLs or paths in the project database records.
  - Handling image updates or deletions when projects are modified or removed.

### 4. Scripts

- **File:** `backend/scripts/migrateImageUrls.js`
- Used for migrating or updating image URLs in the database.
- Useful when changing storage structure, moving to a CDN, or updating URL formats.

### 5. Models

- **Files:** `backend/models/ProjectEn.js`, `ProjectSi.js`, `ProjectTa.js`
- Define the schema for projects, including fields for image URLs or paths.

## Typical Workflow

1. **Image Upload**

   - User uploads an image via a project-related API endpoint.
   - `uploadMiddleware.js` processes the upload and saves the file to `data/uploads/`.
   - The controller receives the file info and updates the project record with the image path.

2. **Image Retrieval**

   - When fetching project data, the API includes the image URL/path.
   - The frontend uses this path to display the image.

3. **Image Migration**

   - If image storage or URL format changes, `migrateImageUrls.js` updates existing records.

4. **Image Deletion**
   - When a project is deleted, the controller may also remove the associated image file from `uploads/`.

## Security & Best Practices

- Only authenticated users should be allowed to upload images (see `authMiddleware.js`).
- Validate file types and sizes in `uploadMiddleware.js` to prevent malicious uploads.
- Store only references (paths/URLs) in the database, not the image data itself.

---

If you need more detailed, file-specific documentation or code-level comments, let me know!
