import axios from "axios";

export async function getPosts() {
  const res = await axios.get("http://localhost:3000/posts", {
    params: { _sort: "title" },
  });
  return res.data;
}

export async function getPostsPaginated(page: number) {
  const res = await axios.get("http://localhost:3000/posts", {
    params: { _page: page, _sort: "title", _limit: 2 },
  });
  const hasNext = page * 2 < parseInt(res.headers["x-total-count"]);
  return {
    nextPage: hasNext ? page + 1 : undefined,
    previousPage: page > 1 ? page - 1 : undefined,
    posts: res.data,
    hasNext,
  };
}

export async function getPost(id: number) {
  const res = await axios.get(`http://localhost:3000/posts/${id}`);
  return res.data;
}
export async function getUser(id: number | undefined) {
  const res = await axios.get(`http://localhost:3000/users/${id}`);
  return res.data;
}

export async function createPost({ title, body }: CreatePost) {
  const res = await axios.post("http://localhost:3000/posts", {
    title,
    body,
    userId: 1,
    id: Date.now(),
  });
  return res.data;
}
