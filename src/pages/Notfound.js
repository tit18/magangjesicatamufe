import React from "react";

export default function NotFound() {
    return (
        <section className="flex items-center justify-center w-screen h-screen bg-white">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center">
                    <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-red-600">ERROR🤪</h1>
                    <p className="mb-4 text-3xl tracking-tight font-bold md:text-4xl text-black">Something's missing.</p>
                    <p className="mb-4 text-lg font-light text-gray-400">Sorry, we can't find that page. </p>
                    <a href="/magangjesicatamufe/build/" className="inline-flex text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-red-900 my-4">Back to Login</a>
                </div>
            </div>
        </section>

    )
}
