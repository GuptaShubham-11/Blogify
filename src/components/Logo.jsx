import React from "react";

export default function Logo({ width = "100px" }) {
    return (
        <div className="flex items-center justify-center" style={{ width }}>
            <span className="text-white font-bold text-2xl">
                Blogify
            </span>
        </div>
    );
}
