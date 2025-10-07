import {useEffect, useState} from "react";
import {fetchPosts} from "../api/posts.ts";
import {fetchUsers} from "../api/users.ts";
import type {Post} from "../types/post.ts";
import type {User} from "../types/user.ts";
import {useStorePosts} from "../store/useStorePosts.ts";
import FilterPanel from "../components/FilterPanel.tsx";
import PostsList from "../components/PostsList.tsx";
import {useStoreFilters} from "../store/useStoreFilters.ts";

export default function Dashboard() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [users, setUsers] = useState<User[]>([]);

    const { selectedUserId, showOnlyFavPosts } = useStoreFilters();

    const { favPosts } = useStorePosts();

    const favFilteredPosts = showOnlyFavPosts ? posts.filter((post) => favPosts.includes(post.id)) : posts;
    const filteredPosts = selectedUserId ? favFilteredPosts.filter((post) => selectedUserId === post.userId) : favFilteredPosts;

    useEffect(() => {
        const fetchData = async () => {
            const [postsData, usersData] = await Promise.all([fetchPosts(), fetchUsers()]);
            setPosts(postsData);
            setUsers(usersData);
        };
        fetchData();
    }, []);

    return (
      <div className="p-20">
          <h1 className="mb-4">Posts</h1>
          <FilterPanel
          posts={filteredPosts}
          />
          <PostsList data={{
              posts: filteredPosts,
              users
          }}
          />
      </div>
    );
};