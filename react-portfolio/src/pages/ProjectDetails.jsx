import { Link, useParams } from "react-router-dom";
import projects from "../data/projects";

function ProjectDetails() {
    const { projectId } = useParams();

    const project = projects.find(
        (item) => item.id === Number(projectId)
    );

    if (!project) {
        return (
            <main>
                <section>
                    <div className="container">
                        <h2>Project Not Found</h2>

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