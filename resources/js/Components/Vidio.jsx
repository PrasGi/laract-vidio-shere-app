import React from "react";

export default function Vidio({ vidio }) {
    console.log(vidio);
    return (
        <>
            <div className="ratio ratio-16x9">
                <iframe
                    src={`${vidio.vidio}`}
                    title={`${vidio.title}`}
                    allowFullScreen
                    webkitallowfullscreen="true"
                    mozallowfullscreen="true"
                ></iframe>
            </div>
            <div className="shadow-lg">
                <div className="card-body">
                    <h5 className="card-title">{vidio.title}</h5>
                    <p className="card-text">by : {vidio.user.name}</p>
                    <p className="card-text">{vidio.description}</p>
                </div>
            </div>
        </>
    );
}
