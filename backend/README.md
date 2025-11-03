# GIS Project Showcase Backend

Backend API for GIS Project Showcase with MongoDB Atlas integration and JWT authentication.

## Features

- 🔐 JWT-based authentication for admin users
- 🗄️ MongoDB Atlas database integration
- 📝 CRUD operations for projects
- 🌐 Automatic translation of English projects to Sinhala and Tamil
- 🛡️ Protected routes for project management
- ✅ Input validation and error handling
- 🔒 Password hashing with bcrypt

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - MongoDB ODM
- **JWT** - Token-based authentication (httpOnly cookies by default)
- **cookie-parser** - Read/clear cookies in Express
- **bcryptjs** - Password hashing

## Project Structure

```
backend/
├── config/
│   └── database.js          # MongoDB connection
├── controller/
│   ├── AuthController.js    # Authentication logic
│   └── ProjectController.js # Project CRUD operations
├── middleware/
│   └── authMiddleware.js    # JWT verification middleware
├── models/
│   ├── User.js             # User schema
│   └── Project.js          # Project schema
├── routes/
│   ├── AuthRoutes.js       # Auth endpoints
│   └── ProjectRoutes.js    # Project endpoints
├── .env.example            # Environment variables template
├── .gitignore
├── package.json
└── server.js               # Application entry point
```

## Installation

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Install Required Packages

The following dependencies will be installed:

- **express** (^4.18.2) - Web framework
- **cors** (^2.8.5) - Enable CORS
- **dotenv** (^16.3.1) - Environment variables
- **mongoose** (^8.0.0) - MongoDB ODM
- **bcryptjs** (^2.4.3) - Password hashing
- **jsonwebtoken** (^9.0.2) - JWT tokens
- **nodemon** (^3.0.1) - Dev dependency for auto-restart

### 3. Set Up Environment Variables

Create a `.env` file in the backend directory:

```bash
cp .env.example .env
```

Update the `.env` file with your MongoDB Atlas credentials:

```env
PORT=5000

# MongoDB Atlas Connection String
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/gis_projects?retryWrites=true&w=majority

# JWT Secret (use a long random string)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=30d

# Frontend & Cookies
FRONTEND_ORIGIN=http://localhost:3000
# Use true only when serving over HTTPS and SameSite=None
COOKIE_SECURE=false
# lax | strict | none
COOKIE_SAMESITE=lax
```

### 4. Get MongoDB Atlas Connection String

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign in or create an account
3. Create a new cluster (free tier available)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Replace `<username>`, `<password>`, and `<database_name>` in your `.env` file

## Running the Server

### Development Mode (with auto-restart)

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication Endpoints

| Method | Endpoint             | Description            | Auth Required |
| ------ | -------------------- | ---------------------- | ------------- |
| POST   | `/api/auth/register` | Register new admin     | No            |
| POST   | `/api/auth/login`    | Login admin            | No            |
| GET    | `/api/auth/me`       | Get current admin info | Yes           |
| POST   | `/api/auth/logout`   | Logout (clear cookie)  | No            |

### Project Endpoints

| Method | Endpoint                   | Description        | Auth Required |
| ------ | -------------------------- | ------------------ | ------------- | -------------------------------------------------------- | --- |
| GET    | `/api/projects?lang=en     | si                 | ta`           | Get all projects (by language, default: en)              | No  |
| GET    | `/api/projects/:id?lang=en | si                 | ta`           | Get single project by groupId (by language, default: en) | No  |
| POST   | `/api/projects`            | Create new project | Yes           |
| PUT    | `/api/projects/:id`        | Update project     | Yes           |
| DELETE | `/api/projects/:id`        | Delete project     | Yes           |

### Health Check

| Method | Endpoint  | Description         | Auth Required |
| ------ | --------- | ------------------- | ------------- |
| GET    | `/health` | Server health check | No            |

## Testing with Postman

### Import Collection

1. Open Postman
2. Click "Import"
3. Select `GIS_Project_Showcase_API.postman_collection.json`
4. The collection will be imported with all endpoints

### Test Flow

1. **Register Admin**

   - Use the "Register Admin" request
   - Token will be automatically saved

2. **Login** (if already registered)

   - Use the "Login Admin" request
   - Token will be automatically saved

3. **Create Project**

   - Use the "Create Project" request
   - Token is automatically included
   - Project ID will be saved

4. **Get Projects**

   - Use "Get All Projects" or "Get Single Project"

5. **Update/Delete**
   - Use the saved project ID

## Data Models

### User Model

```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (default: "admin"),
  createdAt: Date,
  updatedAt: Date
}
```

### Project Models (by language)

```javascript
// Common shape stored in separate collections:
// projects_en, projects_si, projects_ta
{
   groupId: ObjectId,        // Shared across language variants
   title: String,
   description: String,
   imageUrl: String,
   projectUrl: String,
   createdBy: ObjectId (ref: User),
   lang: 'en' | 'si' | 'ta',
   createdAt: Date,
   updatedAt: Date,
}
```

## Language & Translation Behavior

1. Create a project in English via `POST /api/projects`.
2. The server automatically translates the title and description to Sinhala (si) and Tamil (ta), and stores three documents under the same `groupId` in separate collections.
3. Fetch projects in a specific language using `?lang=en|si|ta` (default: `en`).
4. Updating a project by `groupId` re-translates non-static fields for Sinhala and Tamil.

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "error": "Error message",
  "message": "Detailed error information"
}
```

## Security Features

- ✅ Password hashing with bcrypt (10 rounds)
- ✅ JWT token expiration (30 days by default)
- ✅ Protected routes with JWT verification
- ✅ Input validation
- ✅ MongoDB injection protection (via Mongoose)
- ✅ CORS enabled for frontend integration

## Environment Variables

| Variable                  | Description                          | Example                  |
| ------------------------- | ------------------------------------ | ------------------------ |
| PORT                      | Server port                          | 5000                     |
| MONGODB_URI               | MongoDB connection string            | mongodb+srv://...        |
| JWT_SECRET                | Secret key for JWT                   | random-secret-key        |
| JWT_EXPIRE                | Token expiration time                | 30d                      |
| FRONTEND_ORIGIN           | Allowed CORS origin (for cookies)    | http://localhost:3000    |
| COOKIE_SECURE             | Use secure cookies (HTTPS only)      | false                    |
| COOKIE_SAMESITE           | Cookie SameSite policy               | lax                      |
| TRANSLATION_PROVIDER      | none or azure                        | none                     |
| AZURE_TRANSLATOR_KEY      | Azure Translator subscription key    | (secret)                 |
| AZURE_TRANSLATOR_REGION   | Azure resource region (e.g., eastus) | eastus                   |
| AZURE_TRANSLATOR_ENDPOINT | Azure Translator endpoint (optional) | https://api.cognitive... |

## Notes

- Only authenticated admin users can create, update, or delete projects
- All users can view projects (public access)
- Passwords are automatically hashed before storage
- JWT tokens are required for protected routes
- MongoDB Atlas provides a free tier (512MB storage)

## Troubleshooting

### MongoDB Connection Error

- Check if your IP address is whitelisted in MongoDB Atlas
- Verify connection string in `.env` file
- Ensure username and password are correct

### Auth/Cookie Error

- Ensure `JWT_SECRET` is set in `.env`
- For browser clients, set `FRONTEND_ORIGIN` in `.env` and enable credentials on your HTTP client
- If using cross-site cookies, set `COOKIE_SAMESITE=none` and `COOKIE_SECURE=true` (requires HTTPS)
- Postman stores cookies automatically; no Authorization header is needed for protected routes in this collection

### Port Already in Use

- Change PORT in `.env` file
- Or kill the process using port 5000

## License

MIT
