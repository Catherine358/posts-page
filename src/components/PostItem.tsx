import type {Post} from "../types/post.ts";
import type {User} from "../types/user.ts";

interface PostItemProps {
    data: {
        post: Post;
        user: User | undefined;
    }
}

export default function PostItem({ data }: PostItemProps) {
    const { post, user } = data;

  return (
    <article className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-200">
        <h2 className="text-lg font-semibold mb-2 text-gray-800">{post.title}</h2>
        <p className="text-gray-600 mb-4">{post.body}</p>
        <div className="flex justify-between items-center">
            {user && (
                <button
                    className="text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
                >
                    {user.name} {user.company ? `(${user.company.name})` : ''}
                </button>
            )}
            <button
                className="text-xl text-gray-400 hover:text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-300 rounded"
            >
                {'☆'}
            </button>
        </div>
    </article>
  );
};