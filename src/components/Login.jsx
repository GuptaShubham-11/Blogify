import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Loader, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");

    const login = async (data) => {
        setError("");
        setLoading(true);
        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(authLogin(userData));
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return loading ? (
        <Loader />
    ) : (
        <div className="flex items-center justify-center w-full min-h-screen bg-background text-text">
            <div className="mx-auto w-full max-w-md bg-white rounded-lg p-8 border border-gray-300 dark:border-gray-700 shadow-md">
                <div className="mb-4 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold text-primary">
                    Sign in to your account
                </h2>
                <p className="mt-2 text-center text-base text-gray-900">
                    email: test@12.com
                    password: 12345678
                </p>
                <p className="mt-2 text-center text-base text-gray-600 dark:text-gray-400">
                    Don&apos;t have an account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary hover:text-accent transition-all duration-200"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
                <form onSubmit={handleSubmit(login)} className="mt-6 space-y-5">
                    <Input
                        label="Email:"
                        placeholder="Enter your email"
                        type="email"
                        className="w-full"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPattern: (value) =>
                                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Email address must be a valid address",
                            },
                        })}
                    />
                    <Input
                        label="Password:"
                        type="password"
                        placeholder="Enter your password"
                        className="w-full"
                        {...register("password", { required: true })}
                    />
                    <Button
                        type="submit"
                        className="w-full bg-primary hover:bg-secondary text-white py-2 rounded-lg focus:ring-2 focus:ring-primary"
                    >
                        Sign in
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default Login;
