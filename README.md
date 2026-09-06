# Study Flow

Study Flow is a React student productivity dashboard backed by Node.js, Express, MongoDB, and JWT authentication.

## Requirements

- Node.js 20+
- MongoDB running locally, or a MongoDB Atlas connection string

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file from `.env.example` and set:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/study-flow
JWT_SECRET=use-a-long-random-secret
PORT=5000
CLIENT_URL=http://localhost:5173
```

3. Run the frontend and backend together:

```bash
npm run dev
```

The Vite client runs on `http://localhost:5173` and proxies `/api` requests to the Node server on port 5000.

## API

- `POST /api/auth/signup`
- `POST /api/auth/signin`
- `GET /api/auth/me`
- `GET /api/tasks`
- `POST /api/tasks`
- `PATCH /api/tasks/:id`
- `DELETE /api/tasks/:id`
- `GET /api/subjects`
- `POST /api/subjects`
- `DELETE /api/subjects/:id`
- `PATCH /api/profile/study-hours`

Passwords are hashed with bcrypt. Private routes require a JWT bearer token. User records, tasks, subjects, and study hours are stored in MongoDB.

## Deploy Frontend and API to Vercel

Create one Vercel project with the root directory set to `study flow`. Vercel will deploy the Vite app and the Express API function from `api/[...path].js`.

Use these Vercel environment variables:

```env
MONGODB_URI=your-mongodb-atlas-uri
JWT_SECRET=your-long-random-secret
CLIENT_URL=https://your-project.vercel.app
```

`PORT` is not required on Vercel. Leave `VITE_API_URL` unset when the frontend and API share the same Vercel project; the frontend will use `/api`. If the API is deployed separately, set `VITE_API_URL` to that backend URL.
