import React from 'react';

export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h3>Sidebar</h3>
            </div>
            <div className="sidebar-body">
                <ul>
                    <li>
                        <a href="/">Home</a>
                    </li>
                    <li>
                        <a href="/login">Login</a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

        