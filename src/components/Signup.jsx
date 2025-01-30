import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Input, Loader, Logo } from "./index.js";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Signup() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [loading, setLoading] = useState(false);

    const create = async (data) => {
        setError("");
        setLoading(true);
        try {
            const userData = await authService.createAccount(data);
            if (userData) {
                const currentUser = await authService.getCurrentUser();
                if (currentUser) dispatch(login(currentUser));
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return !loading ? (
        <div className="min-h-screen flex items-center justify-center bg-background text-text px-4">
            <div className="w-full max-w-md sm:max-w-lg bg-background rounded-xl p-8 border border-gray-300 shadow-lg">
                <div className="mb-4 flex justify-center">
                    <span className="inline-block w-full max-w-[80px] sm:max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold text-primary">
                    Sign up to create an account
                </h2>
                <p className="mt-2 text-center text-base text-gray-600">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary hover:text-accent transition-all duration-200"
                    >
                        Sign In
                    </Link>
                </p>
                {error && (
                    <p className="text-red-600 mt-4 text-center" aria-live="polite">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit(create)} className="mt-6" aria-label="Signup Form">
                    <div className="space-y-5">
                        <Input
                            label="Full Name:"
                            placeholder="Enter your full name"
                            {...register("name", { required: true })}
                        />
                        <Input
                            label="Email:"
                            placeholder="Enter your email"
                            type="email"
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
                            {...register("password", { required: true })}
                        />
                        <Button
                            type="submit"
                            className="w-full bg-primary hover:bg-opacity-80 text-white transition-all duration-200"
                        >
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    ) : (
        <Loader />
    );
}

export default Signup;
