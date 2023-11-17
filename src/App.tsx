import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import "./App.css";

function App() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      await wait(1000);
      return POSTS;
    },
  });

  const queryClient = useQueryClient();
  const { mutate: newPostMutation, isPending: newPostIsPending } = useMutation({
    mutationFn: async () => {
      await wait(1000);
      POSTS.push({ id: 3, title: "Post 3" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>Error</h1>;

  return (
    <div className="App">
      <h1>TanStack Query</h1>
      <ul>
        {data?.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
      <button
        disabled={newPostIsPending}
        onClick={() => newPostMutation()} // i have to add ()
      >
        Add Post
      </button>
    </div>
  );
}

export default App;

//POSTS and wait just for simulation
const POSTS = [
  { id: 1, title: "Post 1" },
  { id: 2, title: "Post 2" },
];
function wait(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}
