import {useEffect, useState} from "react";
import {fetchPosts} from "../api/posts.ts";
import {fetchUsers} from "../api/users.ts";
import type {Post} from "../types/post.ts";
import type {User} from "../types/user.ts";
import PostItem from "../components/PostItem.tsx";

export default function Dashboard() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUserId, setSelectedUserId] = useState<string>('');

    const usersMap = new Map<string, User>(users.map((user) => [user.id, user]));

    const filterdPosts = selectedUserId ? posts.filter((post) => selectedUserId === post.userId) : posts;

    useEffect(() => {
        const fetchData = async () => {
            const [postsData, usersData] = await Promise.all([fetchPosts(), fetchUsers()]);
            setPosts(postsData);
            setUsers(usersData);
        };
        fetchData();
    }, []);

    const addUserIdToFilter = (userId: string) => {
        if (userId === selectedUserId) return;
      setSelectedUserId(userId);
    };

    const resetFilterByUser = () => {
        setSelectedUserId('');
    };

    return (
      <div>
          <h1 className="mb-4">Posts</h1>
          <div className="p-4">
              {selectedUserId && (
                  <button
                      onClick={resetFilterByUser}
                      className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                      Alle anzeigen
                  </button>
              )}
          </div>
          <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {filterdPosts.map((post) => {
                  const user = usersMap.get(post.userId);
                  return (
                    <li key={post.id}>
                        <PostItem data={{ post, user }} onFilterByUser={addUserIdToFilter} />
                    </li>
                  );
              })}
          </ul>
      </div>
    );
};