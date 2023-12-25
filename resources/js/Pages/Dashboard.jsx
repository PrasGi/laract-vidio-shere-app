import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";

export default function Dashborad(props) {
    const csrfToken = document.head.querySelector(
        'meta[name="csrf-token"]'
    ).content;
    useEffect(() => {
        // Panggil getData saat komponen pertama kali dimuat
        getData();
    }, []);

    const [datas, setDatas] = useState(null);

    const getData = async () => {
        try {
            const response = await fetch(`${props.url.index}`, {
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
            <h5 className="card-title">{data.title}</h5>
            <p className="card-text">{data.description}</p>
        </>
    );
}

function Empty() {
    return <p>Empty vidios</p>;
}
