import React from "react";

export default function Login({ register_url_form, login_url }) {
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
                        <div className="col-md-8 col-lg-6 col-xl-4">
                            <form action={login_url} method="post">
                                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start mb-4">
                                    <p className="lead fw-normal mb-0 me-3">
                                        Sign in
                                    </p>
                                </div>

                                <div className="form-outline mb-4">
                                    <input
                                        type="text"
                                        id="form3Example3"
                                        className="form-control form-control-lg"
                                        placeholder="Enter a valid username"
                                        name="email"
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
                                        Don't have account? {""}
                                        <a href={register_url_form}>Register</a>
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
