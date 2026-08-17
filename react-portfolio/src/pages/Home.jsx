import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    if (loading) {
        return (
            <main className="loading-screen">
                <p>Loading portfolio...</p>
            </main>
        );
    }

    return (
        <main>
            <section id="home">
                <div className="container">
                    <div>
                        <p>Hello, I'm</p>

                        <h1>
                            Abhinav
                            <br />
                            S.
                            <br />
                            Basnet
                        </h1>

                        <h2>Computer Science Student</h2>

                        <p>
                            Turning ideas into reliable software.
                        </p>

                        <a
                            href="/resume.pdf"
                            target="_blank"
                            rel="noreferrer"
                        >
                            View Resume
                        </a>

                        <Link to="/contact">
                            Contact Me
                        </Link>
                    </div>

                    <div>
                        <div className="profile-placeholder">
                            <p>
                                PHOTO
                                <br />
                                COMING
                                <br />
                                SOON
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Home;