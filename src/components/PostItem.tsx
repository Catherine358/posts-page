import type {Post} from "../types/post.ts";
import type {User} from "../types/user.ts";
import {useStorePosts} from "../store/useStorePosts.ts";

interface PostItemProps {
    data: {
        post: Post;
        user: User | undefined;
    }
    onFilterByUser: (userId: string) => void;
}

export default function PostItem({ data, onFilterByUser }: PostItemProps) {
    const { post, user } = data;
    const { favPosts, toggleFavPosts } = useStorePosts();

    const isFavorite = favPosts.includes(post.id);

  return (
    <article className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-200">
        <h2 className="text-lg font-semibold mb-2 text-gray-800">{post.title}</h2>
        <p className="text-gray-600 mb-4">{post.body}</p>
        <div className="flex justify-between items-center">
            {user && (
                <button
                    onClick={() => onFilterByUser(user.id)}
                    className="text-blue-600 bg-white"
                >
                    {user.name} {user.company ? `(${user.company.name})` : ''}
                </button>
            )}
            <button
                onClick={() => toggleFavPosts(post.id)}
                className="text-xl text-gray-400 hover:text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-300 rounded"
            >
                {isFavorite ? '★' : '☆'}
            </button>
        </div>
    </article>
  );
};