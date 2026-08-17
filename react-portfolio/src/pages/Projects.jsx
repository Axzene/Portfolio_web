import ProjectList from "../components/ProjectList";
import projects from "../data/projects";

function Projects() {
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