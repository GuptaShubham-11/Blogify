import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link
      to={`/post/${$id}`}
      className="w-full block focus:ring-2 focus:ring-primary rounded-xl transition-transform duration-300 hover:scale-105"
    >
      <div className="w-full bg-background rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <div className="w-full mb-4 rounded-xl overflow-hidden">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title || "Blog Post Image"}
            className="rounded-xl w-full h-auto object-cover aspect-[16/9]"
          />
        </div>
        <h2 className="text-xl font-semibold text-text hover:text-primary transition-colors duration-200">
          {title}
        </h2>
      </div>
    </Link>
  );
}

export default PostCard;
