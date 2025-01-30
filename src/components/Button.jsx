import React from "react";

export default function Button({
    children,
    type = "button",
    bgColor = "bg-primary",
    textColor = "text-white",
    className = "",
    ...props
}) {
    return (
        <button
            type={type}
            className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary hover:opacity-90 active:scale-95 ${bgColor} ${textColor} dark:bg-secondary dark:text-background ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
