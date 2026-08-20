# Former

A social media app built
with&ensp;<img src="https://img.icons8.com/?size=100&id=kg46nzoJrmTR&format=png&color=ffffff" style="vertical-align: middle;" width="16" height="16" alt="Express.js Logo">
Express.js
and&ensp;<img src="https://img.icons8.com/?size=100&id=122637&format=png&color=61DBFB" style="vertical-align: middle;" width="16" height="16" alt="React Logo">
React, running in&ensp;<img src="https://img.icons8.com/?size=100&id=cdYUlRaag9G9&format=png&color=000000" style="vertical-align: middle;" width="16" height="16" alt="Docker Logo">
Docker using Docker Compose during development, and deployed directly to &ensp;<img src="https://img.icons8.com/?size=100&id=31085&format=png&color=000000" style="vertical-align: middle;" width="16" height="16" alt="Heroku Logo"> Heroku using buildpacks.

---

## Features

- Monorepo structure utilising npm workspaces
- Backend, database, and frontend can all be built and started using a single Docker Compose command
- Backend is built
  in&ensp;<img src="https://img.icons8.com/?size=100&id=hsPbhkOH4FMe&format=png&color=000000" style="vertical-align: middle;" width="16" height="16" alt="Node.js Logo">
  Node.js using
  the&ensp;<img src="https://img.icons8.com/?size=100&id=kg46nzoJrmTR&format=png&color=ffffff" style="vertical-align: middle;" width="16" height="16" alt="Express.js Logo">
  Express.js framework and
  the&ensp;<img src="https://img.icons8.com/?size=100&id=zJh5Gyrd6ZKu&format=png&color=000000" style="vertical-align: middle;" width="16" height="16" alt="Prisma ORM Logo">
  Prisma ORM
- <img src="https://img.icons8.com/?size=100&id=36440&format=png&color=336791" style="vertical-align: middle;" width="16" height="16" alt="PostgreSQL Logo"> PostgreSQL is used as the database
- Frontend is built
  in&ensp;<img src="https://img.icons8.com/?size=100&id=122637&format=png&color=61DBFB" style="vertical-align: middle;" width="16" height="16" alt="React Logo">
  React
  using&ensp;<img src="https://img.icons8.com/?size=100&id=4PiNHtUJVbLs&format=png&color=000000" style="vertical-align: middle;" width="16" height="16" alt="Tailwind cSS Logo">
  Tailwind CSS for styling
- <img src="https://reactrouter.com/_brand/react-router-brand-assets/logo/Dark.png" style="vertical-align: middle;" width="16" alt="PostgreSQL Logo"> React Router is used for frontend routing
- <img src="https://user-images.githubusercontent.com/958486/218346783-72be5ae3-b953-4dd7-b239-788a882fdad6.svg" style="vertical-align: middle;" width="16" height="16" alt="Zustand Logo"> Zustand is used for store management in the frontend
- Fully implemented user signup and log in system
- Posts are shown to users using a basic recommendation algorithm
- Users can vote on posts, and users earn points called 'Formits' based on their posts' scores
- Uses&ensp;<img src="https://img.icons8.com/?size=100&id=12599&format=png&color=000000" style="vertical-align: middle;" width="16" height="16" alt="GitHub Logo"> GitHub Actions to deploy the application to &ensp;<img src="https://img.icons8.com/?size=100&id=31085&format=png&color=000000" style="vertical-align: middle;" width="16" height="16" alt="Heroku Logo"> Heroku on every push and pull request

---

## Environment Variables

The project requires `.env` files in the roots of the `former-backend`, `former-frontend`, and `packages/shared` directories

### Backend Variables

- `PORT` — the port that the server runs on, its value is `3000` by default if unset
- `DATABASE_URL` — the URL of the database e.g. `postgresql://postgres:postgres@localhost:5432/former`
- `JWT_SECRET` — the JSON Web Token secret

### Frontend Variables

- `VITE_API_URL` — the URL to the backend e.g. `http://localhost:3000/api`

### Shared Variables
- `DATABASE_URL` — the same database URL that the backend uses

---

## Run Locally in Development Environment

> ### Prerequisites
>
>1. [Node.js and npm](https://nodejs.org/en/download/)
>2. [Docker Desktop](https://www.docker.com/products/docker-desktop/)

- At the project root, run `docker compose -f docker-compose.dev.yml up` to start up the Database in docker
- Run `npm install` in the root directory to install dependencies
- Run `npm run dev` in both the `former-backend` and `former-frontend` directories to start the dev backend and frontend
  servers
- The project will be available on http://localhost:5173/
- (Optional) to seed data, run `npm run seed` in the root directory

---

## Build and Start Application Using Docker Compose

> ### Prerequisites
>
>1. [Docker Desktop](https://www.docker.com/products/docker-desktop/)

- At the project root, run `docker compose up` to start up all the services in Docker
- The project will be available on http://localhost:5173/

---

## To Do List

- [ ] Show comments on posts
- [ ] Allow comment creation
- [ ] Add a profile page
- [ ] Add a search bar
- [ ] Add sorting and advanced search
- [ ] Add post and comment editing and deletion
- [ ] Add user profile editing and deletion
- [ ] Add custom error pages (404, 500)
- [ ] Add pagination to searching or infinite scrolling
- [ ] Add email verification
- [ ] Add Redis caching
- [ ] Create a logo and icon 