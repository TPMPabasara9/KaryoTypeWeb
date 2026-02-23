import React from "react";

export function Spinner() {
    return (
        <div className="flex items-center justify-center h-full">
            <div className="w-16 h-16 border-4 border-blue-600 border-dashed rounded-full animate-spin"></div>
        </div>
    );
}

