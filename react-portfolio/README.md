Personal Portfolio

My personal portfolio site — React frontend, with an Express backend I added to serve project data through an API and handle contact form submissions instead of faking them.

Tech Stack

Frontend: React, React Router, Vite, JavaScript, CSS, Fetch API

Backend: Node.js, Express, CORS, dotenv, JSON files for storage (no database needed for this)

Project Structure
react-portfolio/
│
├── server/
│   ├── data/
│   │   ├── projects.json
│   │   └── contacts.json
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│   └── ...
│
├── .env
├── .env.example
├── .gitignore
├── package.json
└── README.md
Setup

Install the frontend deps from the project root:

npm install

Then install the backend deps:

cd server
npm install

You'll need two .env files — copy the values from the .env.example files.

server/.env:

PORT=5000
ALLOWED_ORIGIN=http://localhost:5173
PROJECTS_FILE=./data/projects.json
CONTACTS_FILE=./data/contacts.json

.env in the project root:

VITE_API_URL=http://localhost:5000
Running it

You need two terminals — the backend and frontend run separately.

Terminal 1 (backend):

cd server
npm start

Runs at http://localhost:5000. (npm run dev also works if you want it to restart on changes.)

Terminal 2 (frontend):

npm run dev

Runs at http://localhost:5173.

Both need to stay running for the site to actually work — the frontend fetches everything from the backend.

API Endpoints

Base URL: http://localhost:5000

GET /

Health check.

GET http://localhost:5000/
json
{ "status": "ok" }
GET /api/projects

Returns all projects from projects.json.

GET http://localhost:5000/api/projects
json
[
  {
    "id": 1,
    "title": "DevPulse",
    "description": "GitHub developer analytics dashboard built with Next.js.",
    "techStack": ["Next.js", "PostgreSQL", "Prisma", "NextAuth.js"],
    "link": "https://github.com/Axzene"
  }
]
GET /api/projects/:id

Returns a single project.

GET http://localhost:5000/api/projects/1
json
{
  "id": 1,
  "title": "DevPulse",
  "description": "GitHub developer analytics dashboard built with Next.js.",
  "techStack": ["Next.js", "PostgreSQL", "Prisma", "NextAuth.js"],
  "link": "https://github.com/Axzene"
}

If the ID doesn't exist, you get a 404:

json
{ "error": "Project not found" }
POST /api/contact

Submits the contact form. Validates that name, email, and message are all present and that the email looks valid, then saves it to contacts.json.

POST http://localhost:5000/api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "I would like to discuss a project opportunity."
}

Returns 201 Created:

json
{
  "message": "Contact submission received successfully",
  "submission": {
    "id": 1758123456789,
    "name": "John Doe",
    "email": "john@example.com",
    "message": "I would like to discuss a project opportunity.",
    "createdAt": "2026-09-17T12:30:00.000Z"
  }
}

Missing/invalid fields return 400, e.g.:

json
{ "error": "Name is required" }
GET /api/contact

Returns the saved submissions. Just for local dev/testing — this shouldn't be exposed like this in production since it leaks people's contact info.

GET http://localhost:5000/api/contact
json
[
  {
    "id": 1758123456789,
    "name": "John Doe",
    "email": "john@example.com",
    "message": "I would like to discuss a project opportunity.",
    "createdAt": "2026-09-17T12:30:00.000Z"
  }
]
Notes
Unknown routes return { "error": "Route not found" } with a 404.
CORS is locked to the origin set in ALLOWED_ORIGIN, so only the frontend dev server can hit the API locally.
.env files aren't committed — only the .env.example files are, so anyone else pulling the repo knows what to set up.