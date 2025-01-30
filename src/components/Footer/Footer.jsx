import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <section className="relative overflow-hidden py-3 bg-gray-500 border-t-2 border-t-black">
            <div className="relative z-10 mx-auto max-w-7xl px-4">
                <div className="flex flex-wrap -m-6 justify-center items-center text-center">
                    <div className="w-full p-6 md:w-1/2 lg:w-5/12">
                        <div className="flex flex-col justify-center items-center">
                            <div className="mb-4 inline-flex items-center justify-center">
                                <span className="ml-2 text-lg font-medium">Coded by ❤️ Gupta Shubham</span>
                            </div>
                            <div className="flex space-x-4 justify-center">
                                <a
                                    href="https://github.com/GuptaShubham"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-900 hover:text-gray-700 p-2 bg-secondary hover:bg-orange-400 rounded"
                                >
                                    GitHub
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/GuptaShubham/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-900 hover:text-gray-700 p-2 bg-secondary hover:bg-orange-400 rounded"
                                >
                                    LinkedIn
                                </a>
                                <a
                                    href="https://leetcode.com/GuptaShubham/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-900 hover:text-gray-700 p-2 bg-secondary hover:bg-orange-400 rounded"
                                >
                                    LeetCode
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
