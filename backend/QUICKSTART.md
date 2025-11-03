# GIS Project Showcase Backend - Quick Start

## Step 1: Install Dependencies

Run this command in the backend directory:

```bash
npm install
```

This will install:

- express
- cors
- dotenv
- mongoose
- bcryptjs
- jsonwebtoken
- cookie-parser
- nodemon (dev dependency)

## Step 2: Configure Environment

1. Copy `.env.example` to `.env`:

   ```bash
   cp .env.example .env
   ```

2. Update `.env` with your MongoDB Atlas credentials, cookie/CORS, and translation settings:

   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/gis_projects?retryWrites=true&w=majority
   JWT_SECRET=generate-a-long-random-secret-key-here
   JWT_EXPIRE=30d

   # Browser CORS & Cookies
   FRONTEND_ORIGIN=http://localhost:3000
   COOKIE_SECURE=false
   COOKIE_SAMESITE=lax

   # Translation
   TRANSLATION_PROVIDER=none # set to 'azure' to enable Azure Translator
   AZURE_TRANSLATOR_KEY= # required if provider=azure
   AZURE_TRANSLATOR_REGION= # required if provider=azure (e.g., eastus)
   ```

## Step 3: Start the Server

Development mode (auto-restart on changes):

```bash
npm run dev
```

Production mode:

```bash
npm start
```

## Step 4: Test with Postman

1. Import `GIS_Project_Showcase_API.postman_collection.json` into Postman
2. Run "Register Admin" to create your first admin user
3. A secure httpOnly cookie named `token` will be set automatically
4. Now you can create projects without adding an Authorization header!

## Quick Test Flow

1. **Register** → Creates admin and returns token
2. **Create Project** → Uses token to create an English project; server creates Sinhala & Tamil variants
3. **Get All Projects** → View all projects in a language (use `?lang=en|si|ta`, default `en`)
4. **Update Project** → Modify a project (requires auth)
5. **Delete Project** → Remove a project (requires auth)

## Important Notes

- ⚠️ Make sure MongoDB Atlas IP whitelist includes your IP (or use 0.0.0.0/0 for testing)
- ⚠️ Change JWT_SECRET to a random string in production
- ✅ Projects can be viewed by anyone
- ✅ Only authenticated admins can create/update/delete projects
