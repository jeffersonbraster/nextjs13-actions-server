"use client";
import React, { useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { useMyContext } from "../context/Provider";

const PostCard = ({ post, handleDelete }) => {
  const { setEditPost } = useMyContext();
  let [isPending, startTransition] = useTransition();

  return (
    <div>
      <Link href={`/post/${post._id}`}>
        <Image
          src={post?.image}
          alt="image"
          width={200}
          height={200}
          priority
        />
        <h3>{post?.title}</h3>
      </Link>

      <div style={{ display: "flex", gap: 20 }}>
        <button onClick={() => setEditPost(post)}>Edit</button>
        <button
          disabled={isPending}
          onClick={() => startTransition(() => handleDelete(post._id))}
        >
          {isPending ? "Carregando.." : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default PostCard;
