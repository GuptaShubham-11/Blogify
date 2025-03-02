import React, { useState } from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

export default function LogoutBtn() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const logoutHandler = async () => {
        if (window.confirm("Are you sure you want to log out?")) {
            setLoading(true);
            setError("");  // Clear previous errors
            try {
                await authService.logout();
                dispatch(logout());
                navigate("/login");
            } catch (error) {
                setError("Logout failed. Please try again.");
                console.error("Logout failed:", error);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
                onClick={logoutHandler}
                className={`inline-block px-6 py-2 text-white ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-rose-500 hover:bg-rose-700'} focus:outline-none rounded transition-all duration-200`}
                disabled={loading}>
                {loading ? "Logging out..." : "Logout"}
            </button>
        </div>
    );
}
