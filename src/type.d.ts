interface Post {
  id: number;
  title: string;
}
interface CreatePost {
  title: string;
  body: string;
}

interface PostProps {
  id: number;
}

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface User {
  name: string;
}
interface PropsCreatePost {
  setCurrentPage: (page: JSX.Element) => void;
}

interface PostsData {
  posts: Post[];
  previousPage: number | null;
  nextPage: number | null;
}
type PaginatedPosts = {
  nextPage?: number;
  posts: Post[];
};