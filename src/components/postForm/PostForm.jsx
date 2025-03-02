import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Loader, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const [loading, setLoading] = useState(false);
    const [fileError, setFileError] = useState("");

    // Submit handler: Create or Update a Post
    const submit = async (data) => {
        setLoading(true);
        try {
            let file;
            if (data.image?.[0]) {
                if (!["image/png", "image/jpg", "image/jpeg", "image/gif"].includes(data.image[0].type)) {
                    setFileError("Only image files (PNG, JPG, JPEG, GIF) are allowed.");
                    setLoading(false);
                    return;
                }
                file = await appwriteService.uploadFile(data.image[0]);
            }

            if (post) {
                // If post exists, update it
                if (file) {
                    appwriteService.deleteFile(post.featuredImage);
                }

                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : undefined,
                });
                console.log("dbb", dbPost);

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                // If post doesn't exist, create a new one
                if (file) {
                    const fileId = file.$id;
                    data.featuredImage = fileId;
                    const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });

                    if (dbPost) {
                        navigate(`/post/${dbPost.$id}`);
                    }
                }
            }
        } catch (error) {
            // console.log("PostForm :: Error ", error);
        } finally {
            setLoading(false);
        }
    };

    // Slug transformation: Converts title to a URL-friendly slug
    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return loading ? (
        <Loader />
    ) : (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            {/* Left Section (Title, Slug, Content) */}
            <div className="w-full md:w-2/3 px-4 mb-4">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>

            {/* Right Section (Image, Status, Submit) */}
            <div className="w-full md:w-1/3 px-4">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                    aria-label="Upload featured image"
                />
                {fileError && <p className="text-red-500 text-sm mb-4">{fileError}</p>}
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                    aria-label="Select post status"
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}
