import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function ProjectDetails() {
    const { projectId } = useParams();

    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchProject() {
            try {
                setLoading(true);
                setError("");
                setProject(null);

                const response = await fetch(
                    `${API_URL}/api/projects/${projectId}`
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.error || "Project not found"
                    );
                }

                setProject(data);
            } catch (error) {
                setError(
                    error.message || "Unable to load project."
                );
            } finally {
                setLoading(false);
            }
        }

        fetchProject();
    }, [projectId]);

    if (loading) {
        return (
            <main>
                <section>
                    <div className="container">
                        <p>Loading project...</p>
                    </div>
                </section>
            </main>
        );
    }

    if (error) {
        return (
            <main>
                <section>
                    <div className="container">
                        <h2>Project Not Found</h2>
                        <p>{error}</p>

                        <Link to="/projects">
                            Back to Projects
                        </Link>
                    </div>
                </section>
            </main>
        );
    }

    return (
        <main>
            <section className="project-details-page">
                <div className="container">
                    <p className="project-number">
                        PROJECT {String(project.id).padStart(2, "0")}
                    </p>

                    <h1>{project.title}</h1>

                    <p>{project.description}</p>

                    <div className="tech-stack">
                        {project.techStack.map((technology) => (
                            <span key={technology}>
                                {technology}
                            </span>
                        ))}
                    </div>

                    {project.details && (
                        <p>{project.details}</p>
                    )}

                    <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                    >
                        View on GitHub
                    </a>

                    <br />

                    <Link to="/projects">
                        Back to Projects
                    </Link>
                </div>
            </section>
        </main>
    );
}

export default ProjectDetails;