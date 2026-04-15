# Koda-b6-react

Frontend web application built with **React 19**, **Vite 7**, and **Tailwind CSS v4**, consuming the [koda-b6-backend-node](https://github.com/VirgilIw/koda-b6-backend-node) REST API.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Pages & Routes](#pages--routes)
- [State Management](#state-management)
- [API Integration](#api-integration)
- [Styling](#styling)
- [Scripts](#scripts)
- [Build & Deployment](#build--deployment)
- [Docker](#docker)
- [CI/CD](#cicd)
- [Related Repositories](#related-repositories)
- [License](#license)

---

## Tech Stack

| Category          | Library / Tool                         | Version  |
| ----------------- | -------------------------------------- | -------- |
| UI Library        | React                                  | ^19.2.0  |
| Bundler           | Vite                                   | ^7.3.1   |
| Styling           | Tailwind CSS                           | ^4.1.18  |
| State Management  | Redux Toolkit                          | ^2.11.2  |
| State Persistence | Redux Persist                          | ^6.0.0   |
| Routing           | React Router                           | ^7.13.0  |
| Charts            | Recharts                               | ^3.7.0   |
| Icons             | Lucide React                           | ^0.574.0 |
| Date Utility      | date-fns                               | ^4.1.0   |
| Linter            | ESLint + eslint-plugin-react-hooks     | ^9.39.1  |
| Formatter         | Prettier + prettier-plugin-tailwindcss | ^3.8.1   |

---

## Prerequisites

Make sure you have the following installed before running the project:

- **Node.js** >= 20
- **npm** >= 10
- **Backend** — [koda-b6-backend-node](https://github.com/VirgilIw/koda-b6-backend-node) running on `localhost:8888`

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/VirgilIw/Koda-b6-react.git
cd Koda-b6-react
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

```bash
cp .env.example .env
```

Fill in the values (see [Environment Variables](#environment-variables)).

### 4. Start the development server

```bash
npm run dev
```

App will be available at **http://localhost:5173**

---

## Environment Variables

Create a `.env` file at the root of the project:

```env
VITE_API_URL=http://localhost:8888
```

| Variable       | Description                       | Example                 |
| -------------- | --------------------------------- | ----------------------- |
| `VITE_API_URL` | Base URL of the backend REST API  | `http://localhost:8888` |

> All environment variables must be prefixed with `VITE_` to be exposed to the browser by Vite.

---

## Project Structure

```
Koda-b6-react/
├── config/
│   └── nginx.conf              # Nginx config for Docker deployment
├── public/
│   └── vite.svg
├── src/
│   ├── assets/                 # Static assets (images, fonts, etc.)
│   ├── components/             # Reusable UI components
│   │   ├── common/             # Shared components (Button, Input, Modal, etc.)
│   │   ├── layout/             # Layout components (Navbar, Sidebar, Footer)
│   │   └── ui/                 # Domain-specific UI (Cards, Charts, Tables)
│   ├── features/               # Redux slices (RTK)
│   │   ├── auth/
│   │   │   └── authSlice.js
│   │   └── users/
│   │       └── usersSlice.js
│   ├── hooks/                  # Custom React hooks
│   ├── pages/                  # Page-level components
│   │   ├── auth/
│   │   │   ├── LoginPage.jsx
│   │   │   └── RegisterPage.jsx
│   │   ├── admin/
│   │   │   └── UsersPage.jsx
│   │   └── users/
│   │       └── ProfilePage.jsx
│   ├── routes/                 # Route definitions & protected route guards
│   ├── services/               # API call functions
│   │   ├── auth.service.js
│   │   └── users.service.js
│   ├── store/                  # Redux store & persist config
│   │   └── index.js
│   ├── utils/                  # Helper/utility functions
│   ├── App.jsx
│   └── main.jsx
├── .dockerignore
├── .gitignore
├── .prettierrc
├── Dockerfile
├── eslint.config.js
├── index.html
├── package.json
└── vite.config.js
```

---

## Pages & Routes

| Route              | Page               | Access     | Description                          |
| ------------------ | ------------------ | ---------- | ------------------------------------ |
| `/`                | Home               | Public     | Landing page                         |
| `/login`           | Login              | Public     | User login — returns JWT token       |
| `/register`        | Register           | Public     | New user registration                |
| `/dashboard`       | Dashboard          | Auth only  | Overview with charts (Recharts)      |
| `/profile`         | Profile            | Auth only  | View & update own account data       |
| `/admin/users`     | Admin — Users      | Admin only | List, create, and delete users       |
| `/admin/users/:id` | Admin — User Detail| Admin only | View and manage a single user        |

> Protected routes redirect to `/login` when no valid token is present in the persisted Redux store.
> Admin routes additionally check that `role === "admin"`, redirecting others to `/dashboard`.

---

## State Management

This project uses **Redux Toolkit (RTK)** with **Redux Persist** to persist authentication state across page refreshes.

### Store structure

```
store/
└── index.js            # configureStore + persistStore setup

features/
├── auth/
│   └── authSlice.js    # token, current user info, role
└── users/
    └── usersSlice.js   # user list for admin panel
```

### Auth flow

1. User submits login form → `POST /auth/login`
2. JWT token received → dispatched to `authSlice` via `setCredentials`
3. Redux Persist saves state to `localStorage` automatically
4. On every protected API request, token is read from store and sent as `Authorization: Bearer <token>`
5. Logout → dispatches `logout` action → Redux state and `localStorage` are cleared

### Example — authSlice

```js
// features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: null, user: null, role: null },
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload.token;
      state.user  = action.payload.user;
      state.role  = action.payload.role;
    },
    logout: (state) => {
      state.token = null;
      state.user  = null;
      state.role  = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
```

### Example — store setup with persist

```js
// store/index.js
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "../features/auth/authSlice";

const persistConfig = { key: "auth", storage };
const persistedAuth = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: { auth: persistedAuth },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
```

---

## API Integration

All HTTP calls are centralized in `src/services/`. The base URL is read from `import.meta.env.VITE_API_URL`.

### Auth service

```js
// services/auth.service.js
const BASE_URL = import.meta.env.VITE_API_URL;

export const register = async ({ fullname, email, password, confirmPassword }) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fullname, email, password, confirmPassword }),
  });
  return res.json();
};

export const login = async ({ email, password }) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
};
```

### Protected requests (with token)

```js
// utils/api.js
const BASE_URL = import.meta.env.VITE_API_URL;

export const authFetch = async (path, options = {}, token) => {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });
  return res.json();
};
```

### Usage in a component

```jsx
import { useSelector } from "react-redux";
import { authFetch } from "../utils/api";

const token = useSelector((state) => state.auth.token);
const data  = await authFetch("/admin/users", {}, token);
```

---

## Styling

This project uses **Tailwind CSS v4** integrated via the official Vite plugin (`@tailwindcss/vite`) — no `tailwind.config.js` needed.

Prettier is configured with `prettier-plugin-tailwindcss` to automatically sort class names on save:

```json
// .prettierrc
{
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

---

## Scripts

| Command            | Description                              |
| ------------------ | ---------------------------------------- |
| `npm run dev`      | Start development server with HMR        |
| `npm run build`    | Build for production (output: `dist/`)   |
| `npm run preview`  | Preview the production build locally     |
| `npm run lint`     | Lint all source files with ESLint        |

---

## Build & Deployment

### Production build

```bash
npm run build
```

Static output will be in the `dist/` directory, ready to be served by any static file server (Nginx, Apache, Caddy, etc.).

### Preview production build locally

```bash
npm run preview
```

---

## Docker

The app uses a **multi-stage Docker build** — Node.js 24 compiles the Vite app, then Nginx 1.28 (Alpine) serves the static files.

### Dockerfile

```dockerfile
# Stage 1 — Build
FROM node:24.11.0 AS build
WORKDIR /workspace
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build

# Stage 2 — Serve
FROM nginx:1.28.2-alpine
WORKDIR /usr/share/nginx/html
COPY --from=build /workspace/dist/ .
RUN rm /etc/nginx/conf.d/default.conf
COPY ./config/nginx.conf /etc/nginx/conf.d/nginx.conf
```

### Build and run

```bash
# Build the image
docker build -t koda-b6-react .

# Run the container
docker run -p 80:80 koda-b6-react
```

App will be available at **http://localhost**

### Passing environment variables at build time

Because `VITE_` variables are **inlined at build time**, they must be passed as Docker build args — not at runtime:

```bash
docker build \
  --build-arg VITE_API_URL=https://your-api-domain.com \
  -t koda-b6-react .
```

Update your `Dockerfile` to accept the arg:

```dockerfile
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
```

---

## CI/CD

This repository includes a GitHub Actions workflow under `.github/workflows/`. The pipeline runs automatically on every push to `master` and typically covers:

- `npm ci` — install dependencies
- `npm run lint` — lint check
- `npm run build` — production build
- Docker image build & push to registry

---

## Related Repositories

| Repository | Description |
| ---------- | ----------- |
| [koda-b6-backend-node](https://github.com/VirgilIw/koda-b6-backend-node) | REST API backend — Express.js + PostgreSQL |

---

## License

MIT License

Copyright (c) 2026 VirgilIw

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
