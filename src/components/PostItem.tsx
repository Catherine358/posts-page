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
    <article>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
    </article>
  );
};