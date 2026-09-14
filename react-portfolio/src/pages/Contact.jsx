import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState("idle");
    const [serverMessage, setServerMessage] = useState("");

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((current) => ({
            ...current,
            [name]: value
        }));
    }

    function validate() {
        const nextErrors = {};

        if (!formData.name.trim()) {
            nextErrors.name = "Please enter your name.";
        }

        if (!formData.email.trim()) {
            nextErrors.email = "Please enter your email.";
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            nextErrors.email = "Please enter a valid email.";
        }

        if (!formData.message.trim()) {
            nextErrors.message = "Please enter a message.";
        }

        return nextErrors;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const validationErrors = validate();

        setErrors(validationErrors);
        setServerMessage("");

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        setStatus("sending");

        try {
            const response = await fetch(
                `${API_URL}/api/contact`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error || "Unable to send your message."
                );
            }

            setStatus("sent");
            setFormData({
                name: "",
                email: "",
                message: ""
            });
            setErrors({});
            setServerMessage(data.message);
        } catch (error) {
            setStatus("error");
            setServerMessage(
                error.message ||
                "Unable to send your message. Please try again."
            );
        }
    }

    if (status === "sent") {
        return (
            <main>
                <section id="contact">
                    <div className="container">
                        <h2>Contact</h2>

                        <article>
                            <p>
                                {serverMessage ||
                                    "Thanks for reaching out! Your message has been sent."}
                            </p>
                        </article>
                    </div>
                </section>
            </main>
        );
    }

    return (
        <main>
            <section id="contact">
                <div className="container">
                    <h2>Contact</h2>

                    <p>
                        Have an idea, question, or opportunity? Get in touch.
                    </p>

                    {status === "error" && (
                        <p>{serverMessage}</p>
                    )}

                    <form onSubmit={handleSubmit} noValidate>
                        <div>
                            <label htmlFor="name">Name</label>

                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />

                            {errors.name && (
                                <p>{errors.name}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="email">Email</label>

                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />

                            {errors.email && (
                                <p>{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="message">Message</label>

                            <textarea
                                id="message"
                                name="message"
                                rows="6"
                                value={formData.message}
                                onChange={handleChange}
                            />

                            {errors.message && (
                                <p>{errors.message}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={status === "sending"}
                        >
                            {status === "sending"
                                ? "Sending..."
                                : "Send Message"}
                        </button>
                    </form>
                </div>
            </section>
        </main>
    );
}

export default Contact;