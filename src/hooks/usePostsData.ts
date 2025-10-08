import {useEffect, useState} from "react";
import type {Post} from "../types/post.ts";
import type {User} from "../types/user.ts";
import {fetchPosts} from "../api/posts.ts";
import {fetchUsers} from "../api/users.ts";

interface UsePostsDataReturn {
    posts: Post[];
    users: User[];
}

export const usePostsData = (): UsePostsDataReturn => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [users, setUsers] = useState<User[]>([]);

    const fetchData = async () => {
        const [postsData, usersData] = await Promise.all([fetchPosts(), fetchUsers()]);
        setPosts(postsData);
        setUsers(usersData);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return {
      posts,
      users,
    };
};