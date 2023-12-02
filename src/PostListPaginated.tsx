import { useState } from "react";
import { getPostsPaginated } from "./api/posts";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
export function PostListPaginated() {
  const [page, setPage] = useState(1);
  const { isPending, isError, error, data, isFetching, isPlaceholderData } =
    useQuery({
      queryKey: ["posts", page],
      queryFn: () => getPostsPaginated(page),
      placeholderData: keepPreviousData,
    });

  if (isPending) return <h1>Loading...</h1>;
  if (isError) return <h1>{JSON.stringify(error)}</h1>;
  return (
    <>
      <h1>
        Post List Paginated
        <br />
        <small>{isPlaceholderData && "Previous Data"}</small>
      </h1>
      {data.posts.map((post: Post) => (
        <div key={post.id}>{post.title}</div>
      ))}
      <button
        onClick={() => setPage((old) => Math.max(old - 1, 1))}
        disabled={page === 1}
      >
        Previous
      </button>
      <button
        onClick={() => {
          if (!isPlaceholderData && data.hasNext) {
            setPage((old) => old + 1);
          }
        }}
        disabled={isPlaceholderData || !data?.hasNext}
      >
        Next
      </button>
      <span>Current Page: {page}</span>
      {isFetching ? <span> Loading...</span> : null}{" "}
    </>
  );
}
