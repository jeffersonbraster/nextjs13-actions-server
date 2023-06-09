import React from "react";
import { getPost } from "../../../actions/postActions";
import PostCard from "../../../components/PostCard";

const PostDetails = async ({ params: { id }, searchParams }) => {
  const post = await getPost(id);
  return <div>{post && <PostCard post={post} />}</div>;
};

export default PostDetails;
