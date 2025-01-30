import React, { forwardRef, useId } from "react";

function Select({ options, label, className, ...props }, ref) {
    const id = useId();

    return (
        <div className="space-y-2">
            {label && (
                <label htmlFor={id} className="text-text font-medium">
                    {label}
                </label>
            )}
            <select
                {...props}
                id={id}
                ref={ref}
                aria-label={label || "Select an option"}
                className={`px-3 py-2 rounded-lg bg-background text-text outline-none border border-gray-300 w-full transition-all duration-200 
                    focus:ring-2 focus:ring-primary focus:bg-gray-50 hover:bg-gray-100 ${className}`}
            >
                {options?.map((option, index) => (
                    <option key={index} value={option} className="text-text">
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default forwardRef(Select);
