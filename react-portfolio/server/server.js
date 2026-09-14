import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN;
const PROJECTS_FILE = process.env.PROJECTS_FILE;
const CONTACTS_FILE = process.env.CONTACTS_FILE;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectsPath = path.resolve(__dirname, PROJECTS_FILE);
const contactsPath = path.resolve(__dirname, CONTACTS_FILE);

//middle ware

app.use(
    cors({
        origin: ALLOWED_ORIGIN
    })
);

app.use(express.json());

//helper function

async function readJsonFile(filePath) {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
}

async function writeJsonFile(filePath, data) {
    await fs.writeFile(
        filePath,
        JSON.stringify(data, null, 2),
        "utf-8"
    );
}



app.get("/", (req, res) => {
    res.status(200).json({
        status: "ok"
    });
});
//get api for projects


app.get("/api/projects", async (req, res, next) => {
    try {
        const projects = await readJsonFile(projectsPath);

        res.status(200).json(projects);
    } catch (error) {
        next(error);
    }
});

//get api for projects id

app.get("/api/projects/:id", async (req, res, next) => {
    try {
        const projects = await readJsonFile(projectsPath);

        const projectId = Number(req.params.id);

        const project = projects.find(
            (item) => item.id === projectId
        );

        if (!project) {
            return res.status(404).json({
                error: "Project not found"
            });
        }

        res.status(200).json(project);
    } catch (error) {
        next(error);
    }
});

//post api

app.post("/api/contact", async (req, res, next) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !name.trim()) {
            return res.status(400).json({
                error: "Name is required"
            });
        }

        if (!email || !email.trim()) {
            return res.status(400).json({
                error: "Email is required"
            });
        }

        if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
            return res.status(400).json({
                error: "Please provide a valid email address"
            });
        }

        if (!message || !message.trim()) {
            return res.status(400).json({
                error: "Message is required"
            });
        }

        const contacts = await readJsonFile(contactsPath);

        const newSubmission = {
            id: Date.now(),
            name: name.trim(),
            email: email.trim(),
            message: message.trim(),
            createdAt: new Date().toISOString()
        };

        contacts.push(newSubmission);

        await writeJsonFile(contactsPath, contacts);

        res.status(201).json({
            message: "Contact submission received successfully",
            submission: newSubmission
        });
    } catch (error) {
        next(error);
    }
});

//get api

app.get("/api/contact", async (req, res, next) => {
    try {
        const contacts = await readJsonFile(contactsPath);

        res.status(200).json(contacts);
    } catch (error) {
        next(error);
    }
});

//handle 404

app.use((req, res) => {
    res.status(404).json({
        error: "Route not found"
    });
});
//handle error

app.use((error, req, res, next) => {
    console.error(error);

    if (error instanceof SyntaxError && error.status === 400) {
        return res.status(400).json({
            error: "Invalid JSON request body"
        });
    }

    res.status(500).json({
        error: "Internal server error"
    });
});



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});