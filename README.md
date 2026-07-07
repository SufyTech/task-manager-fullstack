# Task Manager — Full-Stack App

A full-stack task management application with authentication, relational data, and secure per-user data access. Built as a portfolio project to demonstrate end-to-end web development: REST API design, database security, and a connected frontend.

**Live demo:** _add your deployed link here once deployed_
**Backend repo:** `/task-manager-backend`
**Frontend repo:** `/task-manager-frontend`

---

## Overview

Users can sign up, log in, and manage personal tasks organized into categories. Every user's data is isolated — enforced both in the API layer and at the database level — so no user can ever access another user's tasks or categories.

## Features

- **Authentication** — signup/login via Supabase Auth, real JWT access + refresh tokens
- **Protected REST API** — every task/category endpoint requires a valid bearer token
- **Relational database** — `tasks` and `categories` linked to `auth.users`, with `tasks.category_id` linking to `categories`
- **Row Level Security (RLS)** — Postgres-level policies ensure users can only read/write their own rows, independent of application code
- **Full CRUD** — create, read, update, delete for tasks; create/read for categories
- **Filtering & pagination** — `GET /api/tasks?status=done&page=1&limit=10`
- **Partial updates** — `PUT /api/tasks/{id}` only updates the fields provided
- **Responsive UI** — built with Next.js, Tailwind CSS, and shadcn/ui components

## Tech Stack

**Backend**
- FastAPI (Python)
- Supabase (Postgres + Auth)
- Pydantic for request/response validation

**Frontend**
- Next.js (App Router, TypeScript)
- Tailwind CSS
- shadcn/ui component library

## Architecture

```
task-manager/
├── task-manager-backend/
│   ├── app/
│   │   ├── main.py                # FastAPI app entrypoint, CORS, router registration
│   │   ├── config.py              # Environment variable loading
│   │   ├── auth/
│   │   │   └── dependencies.py    # JWT validation dependency (get_current_user)
│   │   ├── db/
│   │   │   └── supabase_client.py # Shared Supabase client instance
│   │   ├── models/
│   │   │   └── schemas.py         # Pydantic request/response models
│   │   └── routes/
│   │       ├── auth_routes.py     # /auth/signup, /auth/login
│   │       ├── task_routes.py     # /api/tasks CRUD + filtering/pagination
│   │       └── category_routes.py # /api/categories
│   └── requirements.txt
│
└── task-manager-frontend/
    ├── app/
    │   ├── login/page.tsx         # Auth page (signup/login)
    │   └── tasks/page.tsx         # Main task dashboard (protected route)
    ├── components/ui/             # shadcn/ui components
    └── lib/
        └── api.ts                 # Typed fetch wrappers for all backend calls
```

## Database Schema

```sql
-- auth.users (managed by Supabase Auth)

categories
├── id            uuid, primary key
├── user_id       uuid, references auth.users(id)
├── name          text
└── created_at    timestamptz

tasks
├── id            uuid, primary key
├── user_id       uuid, references auth.users(id)
├── category_id   uuid, references categories(id), nullable
├── title         text
├── status        text, default 'pending'
└── created_at    timestamptz
```

Row Level Security is enabled on both tables, with policies restricting all operations to rows where `auth.uid() = user_id`.

## API Reference

| Method | Endpoint | Description | Auth Required |
|--------|----------|--------------|:---:|
| POST | `/auth/signup` | Create a new account | No |
| POST | `/auth/login` | Log in, receive access + refresh tokens | No |
| GET | `/api/tasks` | List tasks (`?status=`, `?page=`, `?limit=`) | Yes |
| POST | `/api/tasks` | Create a task | Yes |
| PUT | `/api/tasks/{id}` | Update a task (partial) | Yes |
| DELETE | `/api/tasks/{id}` | Delete a task | Yes |
| GET | `/api/categories` | List categories | Yes |
| POST | `/api/categories` | Create a category | Yes |

Protected routes require an `Authorization: Bearer <access_token>` header.

## Security Notes

- Passwords are never handled directly by this app — Supabase Auth manages hashing and storage.
- Every protected route validates the JWT server-side via `supabase.auth.get_user(token)` before processing the request.
- Ownership checks are enforced twice: once at the application level (`.eq("user_id", user.id)` on every query) and once at the database level (RLS policies) — so a bug in one layer doesn't compromise data isolation.

## Running Locally

**Backend:**
```bash
cd task-manager-backend
python -m venv venv
venv\Scripts\Activate.ps1       # Windows
pip install -r requirements.txt
# create a .env file with SUPABASE_URL and SUPABASE_KEY
uvicorn app.main:app --reload
```

**Frontend:**
```bash
cd task-manager-frontend
npm install
npm run dev
```

Backend runs on `http://127.0.0.1:8000`, frontend on `http://localhost:3000`.

## What I'd Add With More Time

- Refresh token rotation for longer sessions without re-login
- Email confirmation flow (currently disabled for faster local testing)
- Category editing/deletion
- Automated tests (pytest for backend, Playwright for frontend)
- CI/CD pipeline for deployment

---

Built by Sufiyan Khan — [GitHub](https://github.com/SufyTech)
