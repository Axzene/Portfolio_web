import { NavLink } from "react-router-dom";

function Navbar({ theme, toggleTheme }) {
    return (
        <header>
            <div className="container">
                <NavLink to="/Home" className="logo">
                    AB.
                </NavLink>

                <nav aria-label="Primary Navigation">
                    <ul>
                        <li>
                            <NavLink to="/Home">
                                Home
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/about">
                                About
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/projects">
                                Projects
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/contact">
                                Contact
                            </NavLink>
                        </li>

                        <li>
                            <button
                                type="button"
                                className="theme-toggle"
                                onClick={toggleTheme}
                                aria-label={
                                    theme === "light"
                                        ? "Switch to dark theme"
                                        : "Switch to light theme"
                                }
                            >
                                {theme === "light" ? "☾" : "☀"}
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;