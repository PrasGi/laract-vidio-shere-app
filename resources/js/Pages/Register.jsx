import React, { useState } from "react";

export default function Register({ login_url_form, register_url }) {
    const csrfToken = document.head.querySelector(
        'meta[name="csrf-token"]'
    ).content;
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [errorMessage, setErrorMessage] = useState(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleRegister = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(register_url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": csrfToken,
                },
                body: JSON.stringify(formData),
            });
            const responseData = await response.json();
            console.log(responseData);
            if (responseData.status_code == 200) {
                // Redirect to / on successful registration
                window.location.href = "/";
            } else {
                // Handle registration failure
                error = "";
                responseData.message.map((m) => {
                    error += (
                        <div className="alert alert-warning" role="alert">
                            {m[0]}
                        </div>
                    );
                });
                setErrorMessage(error);
            }
        } catch (error) {
            console.error("Error during registration:", error);
            setErrorMessage("An unexpected error occurred. Please try again.");
        }
    };

    return (
        <>
            <section
                className="vh-100 w-100 h-100"
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <div
                    className="container-fluid h-custom"
                    style={{ height: "calc(100% - 72px)" }}
                >
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-10 col-lg-7 col-xl-6">
                            <img
                                src="img/login2.jpg"
                                className="img-fluid"
                                alt="Sample image"
                            />
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4">
                            {errorMessage && (
                                <div
                                    className="alert alert-warning"
                                    role="alert"
                                >
                                    {errorMessage}
                                </div>
                            )}
                            <form
                                action={register_url}
                                method="post"
                                onSubmit={handleRegister}
                            >
                                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start mb-4">
                                    <p className="lead fw-normal mb-0 me-3">
                                        Register
                                    </p>
                                </div>

                                <div className="form-outline mb-4">
                                    <input
                                        type="text"
                                        id="form3Example3"
                                        className="form-control form-control-lg"
                                        placeholder="Enter a valid username"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                    <label
                                        className="form-label"
                                        htmlFor="form3Example3"
                                    >
                                        Name
                                    </label>
                                </div>

                                <div className="form-outline mb-4">
                                    <input
                                        type="email"
                                        id="form3Example3"
                                        className="form-control form-control-lg"
                                        placeholder="Enter a valid email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                    <label
                                        className="form-label"
                                        htmlFor="form3Example3"
                                    >
                                        Email
                                    </label>
                                </div>

                                <div className="form-outline mb-3">
                                    <input
                                        type="password"
                                        id="form3Example4"
                                        className="form-control form-control-lg"
                                        placeholder="Enter password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                    <label
                                        className="form-label"
                                        htmlFor="form3Example4"
                                    >
                                        Password
                                    </label>
                                </div>
                                <div>
                                    <p>
                                        Already have an account? {""}
                                        <a href={login_url_form}>Login</a>
                                    </p>
                                </div>
                                <div className="text-center text-lg-start">
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-lg"
                                        style={{
                                            paddingLeft: "2.5rem",
                                            paddingRight: "2.5rem",
                                        }}
                                    >
                                        Register
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <script
                src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
                integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
                crossOrigin="anonymous"
            ></script>
        </>
    );
}
