import React from "react";

export default function Loader() {
    return (
        <div className="flex justify-center items-center min-h-screen bg-background">
            <div className="spinner-border animate-spin inline-block w-16 h-16 border-4 border-t-primary border-solid rounded-full" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
}
