import { useState } from "react";
import { Link } from "react-router-dom";
import ProjectTitle from "./ProjectTitle";
function ProjectCard({
    id,
    title,
    description,
    details,
    techStack,
    image,
    link
}) {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <article className="project-card">
            <div className="project-placeholder">
                {image ? (
                    <img src={image} alt={`${title} project`} />
                ) : (
                    <p>NO IMAGE AVAILABLE</p>
                )}
            </div>
{/*this is the prop drilling part*/}
            <ProjectTitle title={title} />

            <p>{description}</p>

            <div className="tech-stack">
                {techStack.map((technology) => (
                    <span key={technology}>
                        {technology}
                    </span>
                ))}
            </div>

            {showDetails && (
                <p className="project-details">
                    This project explores the technologies and ideas
                    mentioned above.
                </p>
            )}

            <button
                type="button"
                onClick={() => setShowDetails(!showDetails)}
            >
                {showDetails ? "Hide Details" : "View Details"}
            </button>

            <a href={link} target="_blank" rel="noreferrer">
                GitHub
            </a>
        </article>
    );
}

export default ProjectCard;