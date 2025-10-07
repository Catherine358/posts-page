import {useEffect, useState} from "react";
import {fetchPosts} from "../api/posts.ts";
import {fetchUsers} from "../api/users.ts";
import type {Post} from "../types/post.ts";
import type {User} from "../types/user.ts";
import PostItem from "../components/PostItem.tsx";

export default function Dashboard() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [users, setUsers] = useState<User[]>([]);

    const usersMap = new Map<string, User>(users.map((user) => [user.id, user]));

    useEffect(() => {
        const fetchData = async () => {
            const [postsData, usersData] = await Promise.all([fetchPosts(), fetchUsers()]);
            setPosts(postsData);
            setUsers(usersData);
        };
        fetchData();
    }, []);

    return (
      <div>
          <h1 className="mb-4">Posts</h1>
          <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => {
                  const user = usersMap.get(post.userId);
                  return (
                    <li key={post.id}>
                        <PostItem data={{ post, user }} />
                    </li>
                  );
              })}
          </ul>
      </div>
    );
};