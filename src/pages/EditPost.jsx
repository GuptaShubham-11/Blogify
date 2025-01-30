import React, { useEffect, useState } from "react";
import { Container, PostForm, Loader } from "../components";
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";

export default function EditPost() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (slug) {
            appwriteService
                .getPost(slug)
                .then((fetchedPost) => {
                    if (fetchedPost) {
                        setPost(fetchedPost);
                    }
                })
                .catch((err) => {
                    setError("Failed to load post. Please try again later.");
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            navigate("/");  // If no slug, navigate back to home.
        }
    }, [slug, navigate]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader />
                <span className="ml-4">Loading post...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full py-8 text-center text-red-600">
                <p>{error}</p>
                <button
                    onClick={() => setLoading(true)}  // Retry fetching the post
                    className="mt-4 px-6 py-2 bg-blue-500 text-white rounded"
                >
                    Retry
                </button>
            </div>
        );
    }

    return post ? (
        <div className="py-8">
            <Container>
                <h1 className="text-2xl font-semibold mb-6">Edit Post</h1>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null;
}
