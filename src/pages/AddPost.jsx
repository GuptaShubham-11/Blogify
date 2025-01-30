import React from "react";
import { Container, PostForm } from "../components";

export default function AddPost() {
    return (
        <main className="py-8 px-4 md:px-6">
            <Container>
                <h1 className="text-2xl font-semibold mb-6 text-center sm:text-left">Add a New Post</h1>
                <PostForm />
            </Container>
        </main>
    );
}
