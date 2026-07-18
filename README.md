# Former

A forum app built with&ensp;<img src="https://img.icons8.com/?size=100&id=kg46nzoJrmTR&format=png&color=000000" style="vertical-align: middle;" width="16" height="16" alt="Express.js Logo"> Express.js and&ensp;<img src="https://img.icons8.com/?size=100&id=122637&format=png&color=61DBFB" style="vertical-align: middle;" width="16" height="16" alt="React Logo"> React ran in&ensp;<img src="https://img.icons8.com/?size=100&id=cdYUlRaag9G9&format=png&color=000000" style="vertical-align: middle;" width="16" height="16" alt="Docker Logo"> Docker using Docker Compose

---

## Features

- Backend, database, and frontend can all be built and started using a single Docker Compose command
- Backend is built in&ensp;<img src="https://img.icons8.com/?size=100&id=hsPbhkOH4FMe&format=png&color=000000" style="vertical-align: middle;" width="16" height="16" alt="Node.js Logo"> Node.js using the&ensp;<img src="https://img.icons8.com/?size=100&id=kg46nzoJrmTR&format=png&color=000000" style="vertical-align: middle;" width="16" height="16" alt="Express.js Logo"> Express.js framework and the&ensp;<img src="https://img.icons8.com/?size=100&id=zJh5Gyrd6ZKu&format=png&color=000000" style="vertical-align: middle;" width="16" height="16" alt="Prisma ORM Logo"> Prisma ORM
- <img src="https://img.icons8.com/?size=100&id=36440&format=png&color=336791" style="vertical-align: middle;" width="16" height="16" alt="PostgreSQL Logo"> PostgreSQL is used as the database
- Frontend is built in&ensp;<img src="https://img.icons8.com/?size=100&id=122637&format=png&color=61DBFB" style="vertical-align: middle;" width="16" height="16" alt="React Logo"> React using&ensp;<img src="https://img.icons8.com/?size=100&id=4PiNHtUJVbLs&format=png&color=000000" style="vertical-align: middle;" width="16" height="16" alt="Tailwind cSS Logo"> Tailwind CSS for styling
- Fully implemented user sign up and log in system
- Posts are shown to users using a basic recommendation algorithm
- Users can vote on posts, and users earn points called 'Formits' based on their posts' scores

---

## Environment Variables

The project requires `.env` files in both the `former-backend` and `former-frontend` directories

### Backend Variables

- `PORT` — the port that the server runs on, its value is `3000` by default if unset
- `DATABASE_URL` — the URL of the database
- `JWT_SECRET` — the JSON Web Token secret

### Frontend Variables

- None for now

---

## Run Locally in Development Environment

>### Prerequisites
> 
>1. [Node.js and npm](https://nodejs.org/en/download/)
>2. [Docker Desktop](https://www.docker.com/products/docker-desktop/)

- At the project root, run `docker compose -f docker-compose.dev.yml up` to start up the database in docker
- Run `npm run dev` in both the `former-backend` and `former-frontend` directories
- The project will be available on http://localhost:5173/

---

## Build and Start Application Using Docker Compose

>### Prerequisites
>
>1. [Docker Desktop](https://www.docker.com/products/docker-desktop/)

- At the project root, run `docker compose up` to start up all the services in Docker
- The project will be available on http://localhost:5173/