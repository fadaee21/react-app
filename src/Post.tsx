import { useQuery } from "@tanstack/react-query";
import { getPost, getUser } from "./api/posts";

export default function Post({ id }: PostProps): JSX.Element {
  const postQuery = useQuery<Post>({
    queryKey: ["posts", id],
    queryFn: () => getPost(id),
  });
  const userQuery = useQuery<User>({
    queryKey: ["users", postQuery.data?.id],
    enabled: postQuery.data?.userId != null,
    queryFn: () => getUser(postQuery.data?.userId),
  });

  if (postQuery.status === "pending") return <h1>Loading...</h1>;
  if (postQuery.status === "error") {
    return <h1>{JSON.stringify(postQuery.error)}</h1>;
  }

  return (
    <>
      <h1>
        {postQuery.data.title} <br />
        <small>
          {userQuery.isLoading
            ? "Loading User..."
            : userQuery.isError
            ? "Error Loading User"
            : userQuery.data?.name}
        </small>
      </h1>
      <p>{postQuery.data.body}</p>
    </>
  );
}
