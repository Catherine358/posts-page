import { use } from 'react';
import type { Post } from '../types/post.ts';
import type { User } from '../types/user.ts';
import { fetchPosts } from '../api/posts.ts';
import { fetchUsers } from '../api/users.ts';

let dataPromise: Promise<{ posts: Post[]; users: User[] }> | null = null;

const fetchData = () => {
  if (!dataPromise) {
    dataPromise = Promise.all([fetchPosts(), fetchUsers()]).then(
      ([postsData, usersData]) => ({ posts: postsData, users: usersData })
    );
  }
  return dataPromise;
};

export const usePostsData = () => {
  return use(fetchData());
};
