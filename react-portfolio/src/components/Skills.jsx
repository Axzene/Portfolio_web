function Skills({ skills }) {
    return (
        <div className="skills">
            {skills.map((skill) => (
                <span key={skill}>
                    {skill}
                </span>
            ))}
        </div>
    );
}

export default Skills;