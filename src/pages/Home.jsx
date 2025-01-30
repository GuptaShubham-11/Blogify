import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";

function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
        });
    }, []);

    if (posts.length === 0) {
        return (
            <div className="w-full py-12 flex justify-center items-center bg-background">
                <Container>
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-primary">
                            Please Login or Signup to read posts 😊.
                        </h1>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="w-full py-12 bg-background text-text">
            <Container>
                {/* Introduction Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-primary mb-4">
                        Welcome to Our Blogify!
                    </h1>
                    <p className="text-lg text-gray-700">
                        Explore a collection of insightful articles, tips, and
                        stories from our community. Whether you're looking to
                        learn, stay informed, or be inspired, there's something
                        here for everyone.
                    </p>
                </div>

                {/* Posts Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {posts.map((post) => (
                        <div
                            key={post.$id}
                            className="p-4 rounded-xl shadow-lg bg-white hover:bg-secondary transition"
                        >
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;
