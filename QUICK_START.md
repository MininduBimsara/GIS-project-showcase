# Quick Start Guide

## Prerequisites

- Node.js installed
- MongoDB running (local or Atlas)
- Azure Translator API key (for translations)

## Setup (5 minutes)

### 1. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_here
AZURE_TRANSLATOR_KEY=your_azure_translator_key
AZURE_TRANSLATOR_REGION=your_region
PORT=5000
FRONTEND_ORIGIN=http://localhost:3000
```

Start backend:

```bash
npm run dev
```

✅ Backend should be running on http://localhost:5000

### 2. Frontend Setup

```bash
cd frontend
npm install
```

The `.env.local` file is already created with:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Start frontend:

```bash
npm run dev
```

✅ Frontend should be running on http://localhost:3000

### 3. Add Sample Data (Optional)

#### Option A: Using Postman

1. Import the Postman collection: `backend/GIS_Project_Showcase_API.postman_collection.json`

2. Register a user:

   - POST to `/api/auth/register`

   ```json
   {
     "name": "Admin User",
     "email": "admin@example.com",
     "password": "password123"
   }
   ```

3. Login:

   - POST to `/api/auth/login`

   ```json
   {
     "email": "admin@example.com",
     "password": "password123"
   }
   ```

   - Copy the JWT token from response

4. Create a project:
   - POST to `/api/projects`
   - Add header: `Authorization: Bearer YOUR_JWT_TOKEN`
   ```json
   {
     "title": "National Land Registry System",
     "description": "Comprehensive digitization of land records across all districts",
     "imageUrl": "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=600",
     "projectUrl": "https://example.com/land-registry",
     "department": "Department of Land Registry",
     "location": "Island-wide",
     "year": "2024",
     "status": "completed"
   }
   ```

The project will be automatically translated to Sinhala and Tamil!

#### Option B: Using cURL

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Admin","email":"admin@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password123"}'

# Create project (replace YOUR_TOKEN with JWT from login)
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "National Land Registry System",
    "description": "Comprehensive digitization of land records",
    "imageUrl": "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=600",
    "projectUrl": "https://example.com",
    "department": "Department of Land Registry",
    "location": "Island-wide",
    "year": "2024",
    "status": "completed"
  }'
```

## Test the Integration

1. Open http://localhost:3000
2. You should see projects loading (or empty state if no projects yet)
3. Click language buttons: **English** | **සිංහල** | **தமிழ்**
4. Projects should reload in the selected language
5. Try the search box to filter projects
6. Check statistics section for real-time counts

## Verify Everything Works

### Check Backend

```bash
# Health check
curl http://localhost:5000/health

# Get projects
curl http://localhost:5000/api/projects?lang=en
```

### Check Frontend

1. Open browser DevTools (F12)
2. Go to Network tab
3. Switch languages
4. You should see API requests to `/api/projects?lang=en|si|ta`

## Common Issues

### Backend won't start

- ✅ Check MongoDB is running
- ✅ Verify `.env` file exists and has correct values
- ✅ Run `npm install` again

### Frontend won't start

- ✅ Check backend is running
- ✅ Verify `.env.local` exists
- ✅ Run `npm install` again
- ✅ Delete `.next` folder and restart

### Projects not loading

- ✅ Check browser console for errors
- ✅ Verify backend is running on port 5000
- ✅ Check `NEXT_PUBLIC_API_URL` in `.env.local`
- ✅ Add some projects using Postman

### Language switching not working

- ✅ Check Network tab for API calls
- ✅ Verify projects exist in database
- ✅ Check Azure Translator is configured

## What You Can Do Now

✅ View projects in 3 languages (EN/SI/TA)
✅ Search and filter projects
✅ See real-time statistics
✅ Add new projects via API (auto-translates)
✅ Update and delete projects via API
✅ Projects linked across languages by groupId

## Next Steps

1. **Add More Projects**

   - Use Postman or cURL to add projects
   - They'll automatically appear in all 3 languages

2. **Customize Styling**

   - Edit components in `/frontend/components`
   - Colors, fonts, layouts are all customizable

3. **Build Admin Panel**

   - Follow `/backend/ADMIN_PANEL_GUIDE.md`
   - Use API functions from `/frontend/lib/api.ts`

4. **Deploy to Production**
   - Update environment variables
   - Deploy backend (e.g., Railway, Render, AWS)
   - Deploy frontend (e.g., Vercel, Netlify)

## Resources

- 📖 **INTEGRATION_GUIDE.md** - Complete integration documentation
- 📖 **ADMIN_PANEL_GUIDE.md** - Admin panel implementation guide
- 📖 **backend/README.md** - Backend documentation
- 📮 **Postman Collection** - API testing

## Support

Having issues? Check:

1. Browser console (F12)
2. Backend terminal output
3. Network tab in DevTools
4. MongoDB connection
5. Environment variables

## 🎉 You're All Set!

Your GIS Project Showcase is now fully integrated with:

- ✅ Dynamic content from MongoDB
- ✅ Multi-language support (EN/SI/TA)
- ✅ Auto-translation
- ✅ Search functionality
- ✅ Real-time statistics
- ✅ Admin API ready

Enjoy building! 🚀
