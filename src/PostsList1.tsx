import { useQueries, useQuery } from "@tanstack/react-query";
import { getPost, getPosts } from "./api/posts";

export default function PostsList1() {
  const postsQuery = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: getPosts,
    placeholderData: [{ id: 1, title: "Initial Data", body: "", userId: 1 }],
  });

  const queries = useQueries({
    queries: (postsQuery.data ?? []).map((post) => ({
      queryKey: ["posts", post.id],
      queryFn: () => getPost(post.id),
    })),
  });

  if (postsQuery.status === "pending") return <h1>Loading...</h1>;
  if (postsQuery.status === "error") {
    return <h1>{JSON.stringify(postsQuery.error)}</h1>;
  }
  console.log("queries", queries);
  
  console.log("postQuery", postsQuery.data);

  return (
    <div>
      <h1>Posts List 1</h1>
      <ol>
        {postsQuery.data.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ol>
    </div>
  );
}
