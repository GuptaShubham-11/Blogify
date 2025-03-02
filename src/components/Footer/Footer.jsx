import React from "react";

export default function Footer() {
    return (
        <footer className="bg-gray-700 text-white py-4 border-t-2 border-gray-900">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col items-center space-y-4 md:flex-row md:justify-between">
                    {/* Made by section */}
                    <div className="text-lg font-semibold text-center md:text-left">
                        🩷 Made by <span className="text-secondary">Gupta Shubham</span>
                    </div>

                    {/* Social Links */}
                    <div className="flex space-x-4">
                        <a
                            href="https://github.com/GuptaShubham"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-2 bg-secondary text-gray-900 font-medium rounded-lg transition duration-300 hover:bg-orange-400 hover:text-white"
                        >
                            GitHub
                        </a>
                        <a
                            href="https://www.linkedin.com/in/GuptaShubham/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-2 bg-secondary text-gray-900 font-medium rounded-lg transition duration-300 hover:bg-orange-400 hover:text-white"
                        >
                            LinkedIn
                        </a>
                        <a
                            href="https://leetcode.com/GuptaShubham/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-2 bg-secondary text-gray-900 font-medium rounded-lg transition duration-300 hover:bg-orange-400 hover:text-white"
                        >
                            LeetCode
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
