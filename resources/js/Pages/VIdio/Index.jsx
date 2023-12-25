import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";

export default function Index(props) {
    const csrfToken = document.head.querySelector(
        'meta[name="csrf-token"]'
    ).content;

    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState();
    const [datas, setDatas] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
    });

    useEffect(() => {
        // Panggil getData saat komponen pertama kali dimuat
        getData();
    }, []);

    const [vidio, setVidio] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleChangeVidio = (event) => {
        setVidio(event.target.files[0]);
    };

    const handleStore = async (event) => {
        event.preventDefault();

        try {
            const formDataSubmit = new FormData();
            formDataSubmit.append("title", formData.title);
            formDataSubmit.append("description", formData.description);
            formDataSubmit.append("vidio", vidio); // Assuming you have an input element for file selection

            const response = await fetch(props.url.store, {
                method: "POST",
                headers: {
                    "X-CSRF-TOKEN": csrfToken,
                },
                body: formDataSubmit,
            });

            const responseData = await response.json();
            if (responseData.status_code == 200) {
                // Redirect to / on successful registration
                setSuccessMessage("success add vidio");
                getData();
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
            setErrorMessage("An unexpected error occurred. " + error.message);
        }
    };

    async function handleDestroy(id) {
        console.log("tes");
        try {
            const response = await fetch(`./vidios/${id}`, {
                method: "DELETE",
                headers: {
                    "X-CSRF-TOKEN": csrfToken,
                },
            });

            const responseData = await response.json();
            if (responseData.status_code == 200) {
                // Redirect to / on successful registration
                setSuccessMessage("success delete vidio");
                getData();
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
            setErrorMessage("An unexpected error occurred. " + error.message);
        }
    }

    const getData = async () => {
        try {
            const response = await fetch(`${props.url.index}?byUser=true`, {
                method: "GET", // Menggunakan metode GET untuk pengambilan data
                headers: {
                    "X-CSRF-TOKEN": csrfToken,
                },
            });

            const responseData = await response.json();

            if (responseData.data.length > 0) {
                setDatas(responseData.data);
            }
        } catch (error) {
            console.error("An error occurred while fetching data: ", error);
            setErrorMessage(
                "An unexpected error occurred while fetching data."
            );
        }
    };

    return (
        <>
            <Navbar></Navbar>
            <Sidebar></Sidebar>
            <main className="main" id="main">
                <div className="text-center shadow p-3">
                    <button
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#modalAddVidio"
                        onClick={() => {
                            setErrorMessage(null); // Menghapus pesan kesalahan saat membuka modal
                            setSuccessMessage(null); // Menghapus pesan keberhasilan saat membuka modal
                        }}
                    >
                        <i className="bi bi-upload"></i> Add new vidio
                    </button>
                </div>
                <div className="row mt-3 justify-content-start">
                    {datas ? (
                        datas.map((data) => (
                            <div className="col-6 p-4 shadow" key={data.id}>
                                <Card data={data} url={props.url.app_url} />
                            </div>
                        ))
                    ) : (
                        <div className="text-center">
                            <Empty />
                        </div>
                    )}
                </div>
            </main>

            <div
                className="modal fade"
                id="modalAddVidio"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1
                                className="modal-title fs-5"
                                id="exampleModalLabel"
                            >
                                Add new vido
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <form onSubmit={handleStore}>
                            <div className="modal-body">
                                {errorMessage && (
                                    <div
                                        className="alert alert-warning"
                                        role="alert"
                                        dangerouslySetInnerHTML={{
                                            __html: errorMessage,
                                        }}
                                    ></div>
                                )}
                                {successMessage && (
                                    <div
                                        className="alert alert-success"
                                        role="alert"
                                    >
                                        {successMessage}
                                    </div>
                                )}
                                <div className="mb-3">
                                    <label
                                        htmlFor="title"
                                        className="form-label"
                                    >
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        placeholder="Example title"
                                        onChange={handleChange}
                                        value={formData.title}
                                        name="title"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="description"
                                        className="form-label"
                                    >
                                        Description
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="description"
                                        rows="3"
                                        onChange={handleChange}
                                        value={formData.description}
                                        name="description"
                                    ></textarea>
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="vidio"
                                        className="form-label"
                                    >
                                        File vidio
                                    </label>
                                    <input
                                        className="form-control"
                                        type="file"
                                        id="vidio"
                                        onChange={handleChangeVidio}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="submit"
                                    id="submitVidio"
                                    className="btn btn-primary"
                                >
                                    Upload vidio
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

function Card({ data }) {
    return (
        <>
            <div className="ratio ratio-16x9">
                <iframe
                    src={`${data.vidio}`}
                    title={`${data.title}`}
                    allowFullScreen
                    webkitallowfullscreen="true"
                    mozallowfullscreen="true"
                ></iframe>
            </div>
            <div className="row">
                <div className="col-8">
                    <h5 className="card-title">{data.title}</h5>
                    <p className="card-text">{data.description}</p>
                </div>
                <div className="col-4">
                    <div className="mt-3 text-end">
                        <a
                            className="btn btn-danger"
                            onClick={() => handleDestroy(data.id)}
                        >
                            Delete
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}

function Empty() {
    return <p>Empty vidios</p>;
}
