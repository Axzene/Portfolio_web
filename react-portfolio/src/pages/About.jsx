import Skills from "../components/Skills";

function About() {
    return (
        <main>
            <section id="about">
                <div className="container">
                    <h2>About Me</h2>

                    <article>
                        <p>
                            I am a Computer Science student at the
                            National Institute of Technology Warangal
                            with an interest in software development,
                            problem solving and modern web
                            technologies.
                        </p>

                        <div>
                            <h3>Education</h3>

                            <ul>
                                <li>
                                    <strong>Institute:</strong>
                                    NIT Warangal
                                </li>

                                <li>
                                    <strong>Degree:</strong>
                                    B.Tech Computer Science and
                                    Engineering
                                </li>

                                <li>
                                    <strong>CGPA:</strong>
                                    8.8
                                </li>

                                <li>
                                    <strong>Graduation:</strong>
                                    2028
                                </li>
                            </ul>
                        </div>
                    </article>

                    <Skills
                        skills={[
                            "C++",
                            "Java",
                            "Python",
                            "React",
                            "Next.js",
                            "SQL"
                        ]}
                    />
                </div>
            </section>
        </main>
    );
}

export default About;