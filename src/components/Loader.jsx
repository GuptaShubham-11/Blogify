import React from "react";
import { InfinitySpin } from "react-loader-spinner"

export default function Loader() {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <InfinitySpin
                visible={true}
                width="200"
                color="#515151"
                ariaLabel="infinity-spin-loading"
            />
        </div>
    )
}