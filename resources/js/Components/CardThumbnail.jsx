import React from "react";
import { Link } from "@inertiajs/react";

export default function CardThumbnail({
    data,
    handleDestroy = null,
    user = true,
}) {
    const onDeleteClick = () => {
        handleDestroy(data.id);
    };

    const truncatedDescription = truncateText(data.description, 20);

    return (
        <>
            <img src={data.thumbnail} className="img-fluid" alt="..." />
            <div className="row">
                <div className="col-8">
                    <h5 className="card-title">{data.title}</h5>
                    <p className="card-text">by : {data.user.name}</p>
                </div>
                <div className="col-4">
                    <div className="mt-3 text-end">
                        <Link
                            className="btn btn-outline-dark me-1"
                            href={`/vidios/${data.id}`}
                        >
                            <i className="bi bi-eye"> view</i>
                        </Link>
                        {user ? (
                            <button
                                className="btn btn-danger"
                                onClick={onDeleteClick}
                            >
                                <i className="bi bi-trash"></i>
                            </button>
                        ) : null}
                    </div>
                </div>
                <div className="col-12">
                    <p className="card-text">{truncatedDescription}</p>
                </div>
            </div>
        </>
    );
}

// Fungsi untuk memotong teks menjadi jumlah kata tertentu
function truncateText(text, maxWords) {
    const words = text.split(" ");
    if (words.length > maxWords) {
        return words.slice(0, maxWords).join(" ") + "...";
    }
    return text;
}
