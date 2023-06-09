"use server";
import { revalidatePath } from "next/cache";
import connectDB from "../database/mongodb";
import Post from "../models/PostModel";

connectDB();

export async function getAllPosts(searchParams) {
  const search = searchParams.search || "";
  const sort = searchParams.sort || "createdAt";

  const limit = searchParams.limit * 1 || 4;
  const page = searchParams.page * 1 || 1;
  const skip = searchParams.skip * 1 || (page - 1) * limit;

  try {
    const posts = await Post.find({ title: { $regex: search } })
      .sort(sort)
      .limit(limit)
      .skip(skip);

    const count = await Post.find({ title: { $regex: search } }).count();

    const totalPage = Math.ceil(count / limit);

    const newData = posts.map((post) => ({
      ...post._doc,
      _id: post._doc._id.toString(),
    }));

    return { posts: newData, count, totalPage };
  } catch (error) {
    throw new Error(error.message || "Failed to list posts!");
  }
}

export async function getPost(id) {
  try {
    const post = await Post.findById(id);

    return { ...post._doc, _id: post._doc._id.toString() };
  } catch (error) {
    throw new Error(error.message || "Failed to list posts!");
  }
}

export async function createPost(data) {
  try {
    const newPost = new Post(data);

    await newPost.save();
    revalidatePath("/");

    return { ...newPost._doc, _id: newPost._id.toString() };
  } catch (error) {
    throw new Error(error.message || "Failed to create post!");
  }
}

export async function updatePost({ title, image, id }) {
  try {
    const post = await Post.findByIdAndUpdate(
      id,
      { title, image },
      { new: true }
    );

    console.log(post);
    revalidatePath("/");

    return { ...post._doc, _id: post._id.toString() };
  } catch (error) {
    throw new Error(error.message || "Failed to update posts!");
  }
}

export async function deletePost(id) {
  try {
    const post = await Post.findByIdAndDelete(id, { new: true });

    console.log(post);
    revalidatePath("/");

    return { ...post._doc, _id: post._id.toString() };
  } catch (error) {
    throw new Error(error.message || "Failed to delete posts!");
  }
}
