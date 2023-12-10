import React from "react";

export default function Sidebar() {
    return (
        <aside id="sidebar" className="sidebar">
            <ul className="sidebar-nav" id="sidebar-nav">
                <li className="nav-heading">admin</li>

                <li className="nav-item">
                    <a className="nav-link active collapsed" href="">
                        <i className="bi bi-house"></i>
                        <span>Dashboard</span>
                    </a>
                </li>

                <li className="nav-heading">private</li>

                <li className="nav-item">
                    <a className="nav-link collapsed" href="">
                        <i className="bi bi-calendar-heart"></i>
                        <span>My vidio</span>
                    </a>
                </li>
            </ul>
        </aside>
    );
}
