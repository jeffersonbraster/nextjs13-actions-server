import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import Feature from "../components/Feature";
import Pagination from "../components/Pagination";
import { getAllPosts } from "../actions/postActions";

const Home = async ({ params, searchParams }) => {
  const { posts, totalPage } = await getAllPosts(searchParams);
  return (
    <div>
      <h1>Nextjs 13.4 Server Actions + MongoDB(mongoose)</h1>

      <h2>CRUD + Sort + Search + Pagination</h2>

      <PostForm />

      <Feature />

      {posts && <PostList posts={posts} />}

      {totalPage && <Pagination totalPage={totalPage} />}
    </div>
  );
};

export default Home;
