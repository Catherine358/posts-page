import PostItem from "./PostItem.tsx";
import type {User} from "../types/user.ts";
import type {Post} from "../types/post.ts";

interface PostsListProps {
    data: {
        posts: Post[];
        users: User[];
    }
    onFilterByUser: (userId: string) => void;
}

export default function PostsList({ data, onFilterByUser }: PostsListProps) {
    const { posts, users } = data;

    if (posts.length === 0) {
        return <p>Liste ist leer.</p>;
    }

    const usersMap = new Map<string, User>(users.map((user) => [user.id, user]));

    return (
              <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {posts.map((post) => {
                      const user = usersMap.get(post.userId);
                      return (
                          <li key={post.id}>
                              <PostItem data={{ post, user }} onFilterByUser={onFilterByUser} />
                          </li>
                      );
                  })}
              </ul>
  );
};