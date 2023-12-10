import React from "react";

export default function Navbar() {
    return (
        <header id="header" class="header fixed-top d-flex align-items-center">
            <div class="d-flex align-items-center justify-content-between">
                <i class="bi bi-list toggle-sidebar-btn"></i>
                <a href="#" class="logo d-flex align-items-center">
                    <span class="d-none d-lg-block fs-3 ms-3">Vidio Shere</span>
                </a>
            </div>

            <nav class="header-nav ms-auto p-5">
                <a href="" class="btn btn-outline-danger">
                    <i class="bi bi-box-arrow-left"></i> Logout
                </a>
            </nav>
        </header>
    );
}
