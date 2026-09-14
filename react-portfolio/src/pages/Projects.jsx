import { useEffect, useState } from "react";
import ProjectList from "../components/ProjectList";

const API_URL = import.meta.env.VITE_API_URL;

function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchProjects() {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    `${API_URL}/api/projects`
                );

                if (!response.ok) {
                    throw new Error(
                        "Unable to load projects from the server."
                    );
                }

                const data = await response.json();

                setProjects(data);
            } catch (error) {
                setError(
                    error.message ||
                    "Unable to load projects."
                );
            } finally {
                setLoading(false);
            }
        }

        fetchProjects();
    }, []);

    if (loading) {
        return (
            <main>
                <section id="projects">
                    <div className="container">
                        <h2>Projects</h2>
                        <p>Loading projects...</p>
                    </div>
                </section>
            </main>
        );
    }

    if (error) {
        return (
            <main>
                <section id="projects">
                    <div className="container">
                        <h2>Projects</h2>
                        <p>{error}</p>
                    </div>
                </section>
            </main>
        );
    }

    return (
        <main>
            <section id="projects">
                <div className="container">
                    <h2>Projects</h2>

                    <ProjectList projects={projects} />
                </div>
            </section>
        </main>
    );
}

export default Projects;