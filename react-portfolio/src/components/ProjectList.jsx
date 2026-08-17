import ProjectCard from "./ProjectCard";

function ProjectList({ projects }) {
    return (
        <div className="projects">
            {projects.map((project) => (
                <ProjectCard
                    key={project.id}
                    id={project.id}
                    title={project.title}
                    description={project.description}
                    details={project.details}
                    techStack={project.techStack}
                    image={project.image}
                    link={project.link}
                />
            ))}
        </div>
    );
}

export default ProjectList;