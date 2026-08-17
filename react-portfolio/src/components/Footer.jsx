import { NavLink } from "react-router-dom";

function Footer() {
    return (
        <footer>
            <div className="container">
                <nav aria-label="Footer Navigation">
                    <ul>
                        <li>
                            <NavLink to="/Home">Home</NavLink>
                        </li>

                        <li>
                            <NavLink to="/about">About</NavLink>
                        </li>

                        <li>
                            <NavLink to="/projects">Projects</NavLink>
                        </li>

                        <li>
                            <NavLink to="/contact">Contact</NavLink>
                        </li>
                    </ul>
                </nav>

                <p>
                    © 2026 Abhinav S. Basnet. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
}

export default Footer;