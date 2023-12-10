import React from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";

export default function Dashborad({ value }) {
    return (
        <>
            <Navbar></Navbar>
            <Sidebar></Sidebar>
            <main class="main" id="main">
                <h1>{value}</h1>
            </main>
        </>
    );
}
