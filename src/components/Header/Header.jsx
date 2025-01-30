import React, { useState } from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
    const authStatus = useSelector((state) => state.auth?.status);
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const navItems = [
        { name: 'Home', slug: '/', active: true },
        { name: "Login", slug: "/login", active: !authStatus },
        { name: "Signup", slug: "/signup", active: !authStatus },
        { name: "All Posts", slug: "/all-posts", active: authStatus },
        { name: "Add Post", slug: "/add-post", active: authStatus },
    ];

    return (
        <header className="py-3 bg-gray-500 rounded shadow relative">
            <Container className="max-w-screen-lg">
                <div className="flex items-center justify-between relative h-8">
                    {/* Logo Positioned at Top Left */}
                    <Link to="/" className="absolute right-0">
                        <Logo width="70px" />
                    </Link>

                    {/* Navigation Links (Visible on Large Screens) */}
                    <ul className="hidden md:flex space-x-4 absolute left-0">
                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name}>
                                    <button
                                        onClick={() => navigate(item.slug)}
                                        className={`px-6 py-2 rounded transition-all duration-200 
                                            ${item.active ? 'bg-accent text-white' : 'text-gray-800'} 
                                            hover:bg-orange-500 focus:outline-none`}
                                    >
                                        {item.name}
                                    </button>
                                </li>
                            ) : null
                        )}
                        {authStatus && (
                            <li>
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>

                    {/* Hamburger Menu for Mobile */}
                    <button
                        className="block md:hidden text-white"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </Container>

            {/* Mobile Sidebar */}
            <div
                className={`fixed inset-0 z-50 bg-gray-800 bg-opacity-75 transform ${menuOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 md:hidden`}
            >
                <div className="flex justify-end p-4">
                    <button
                        className="text-white"
                        onClick={() => setMenuOpen(false)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <ul className="flex flex-col items-center space-y-4">
                    {navItems.map((item) =>
                        item.active ? (
                            <li key={item.name}>
                                <button
                                    onClick={() => navigate(item.slug)}
                                    className="text-white px-6 py-2 hover:bg-blue-600 rounded"
                                >
                                    {item.name}
                                </button>
                            </li>
                        ) : null
                    )}
                    {authStatus && (
                        <li>
                            <LogoutBtn />
                        </li>
                    )}
                </ul>
            </div>
        </header>
    );
}
