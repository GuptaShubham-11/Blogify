import React from "react";
import { Login as LoginComponent } from "../components";

export default function Login() {
    return (
        <div className="min-h-screen flex justify-center items-center bg-background text-text">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center mb-6 text-primary">
                    Login to Your Account
                </h2>
                <LoginComponent />
            </div>
        </div>
    );
}
