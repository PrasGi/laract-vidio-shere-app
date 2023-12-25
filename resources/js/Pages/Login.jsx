import React, { useState } from "react";

export default function Login(props) {
    const csrfToken = document.head.querySelector(
        'meta[name="csrf-token"]'
    ).content;

    const [errorMessage, setErrorMessage] = useState(null);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(props.login_url, {
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
                let error = "";
                // Memeriksa apakah 'message' adalah objek
                if (typeof responseData.message === "object") {
                    for (const key in responseData.message) {
                        if (responseData.message.hasOwnProperty(key)) {
                            for (const i in responseData.message[key]) {
                                error += responseData.message[key][i] + "<br>";
                            }
                        }
                    }
                } else {
                    error = responseData.message;
                }
                setErrorMessage(error);
            }
        } catch (error) {
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
                                src="img/login.png"
                                className="img-fluid"
                                alt="Sample image"
                            />
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 shadow-lg p-4 rounded-4">
                            {errorMessage && (
                                <div
                                    className="alert alert-warning"
                                    role="alert"
                                    dangerouslySetInnerHTML={{
                                        __html: errorMessage,
                                    }}
                                ></div>
                            )}
                            <form method="post" onSubmit={handleLogin}>
                                <div className="form-outline mb-4">
                                    <label
                                        className="form-label"
                                        htmlFor="form3Example3"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="text"
                                        id="form3Example3"
                                        className="form-control form-control-lg"
                                        placeholder="Enter a valid username"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-outline mb-3">
                                    <label
                                        className="form-label"
                                        htmlFor="form3Example4"
                                    >
                                        Password
                                    </label>
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
                                </div>
                                <div className="text-center">
                                    <p>
                                        Don't have account? {""}
                                        <a href={props.register_url_form}>
                                            Register
                                        </a>
                                    </p>
                                </div>
                                <div className="text-center text-lg-center">
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-lg"
                                        style={{
                                            paddingLeft: "2.5rem",
                                            paddingRight: "2.5rem",
                                        }}
                                    >
                                        Login
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
