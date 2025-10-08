import { useStorePosts } from '../store/useStorePosts.ts';
import FilterPanel from '../components/FilterPanel.tsx';
import PostsList from '../components/PostsList.tsx';
import { useStoreFilters } from '../store/useStoreFilters.ts';
import { usePostsData } from '../hooks/usePostsData.ts';

export default function Dashboard() {
  const { posts, users } = usePostsData();

  const { selectedUserId, showOnlyFavPosts } = useStoreFilters();

  const { favPosts } = useStorePosts();

  const favPostsSet = new Set(favPosts);

  const filteredPosts = posts.filter((post) => {
     if (showOnlyFavPosts && !favPostsSet.has(post.id)) return false;
     if (selectedUserId && post.userId !== selectedUserId) return false;
     return true;
  });

  return (
    <div className="p-20">
      <h1 className="mb-4">Posts</h1>
      <FilterPanel posts={filteredPosts} />
      <PostsList
        data={{
          posts: filteredPosts,
          users,
        }}
      />
    </div>
  );
}
