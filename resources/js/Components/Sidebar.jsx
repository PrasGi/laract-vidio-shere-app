import React from "react";
import { Link } from "@inertiajs/react";

export default function Sidebar() {
    const currentPath = window.location.pathname;
    return (
        <aside id="sidebar" className="sidebar shadow-lg">
            <ul className="sidebar-nav" id="sidebar-nav">
                <li className="nav-item">
                    <Link
                        className={`nav-link ${
                            currentPath == "/" ? "active" : ""
                        } collapsed`}
                        href="/"
                    >
                        <i className="bi bi-house"></i>
                        <span>Dashboard</span>
                    </Link>
                </li>

                <li className="nav-heading">private</li>

                <li className="nav-item">
                    <Link
                        className={`nav-link ${
                            currentPath == "/vidios" ? "active" : ""
                        } collapsed`}
                        href="/vidios"
                    >
                        <i className="bi bi-calendar-heart"></i>
                        <span>My vidio</span>
                    </Link>
                </li>
            </ul>
        </aside>
    );
}
