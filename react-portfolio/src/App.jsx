import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

import "./App.css";

function App() {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem("theme");

        return savedTheme || "light";
    });

    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme]);

    function toggleTheme() {
        setTheme((currentTheme) =>
            currentTheme === "light" ? "dark" : "light"
        );
    }

    return (
        <BrowserRouter>
            <div className={`app ${theme}`}>
                <Navbar
                    theme={theme}
                    toggleTheme={toggleTheme}
                />

                <Routes>
                    <Route path="/Home" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/projects" element={<Projects />} />

                    <Route
                        path="/projects/:projectId"
                        element={<ProjectDetails />}
                    />

                    <Route path="/contact" element={<Contact />} />

                    <Route
                        path="*"
                        element={<NotFound />}
                    />
                </Routes>

                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;