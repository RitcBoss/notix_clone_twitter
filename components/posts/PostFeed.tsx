import usePosts from "@/hooks/usePosts";
import PostItem from "./PostItem";

interface User {
    id: string;
    name: string;
    username: string;
}

interface Comment {
    id: string;
    body: string;
    createdAt: string;
    user: User;
}

interface Post {
    id: string;
    title: string;
    body: string; 
    createdAt: string; 
    user: User;
    comments: Comment[]; // Updated to use Comment type
    linkedIds: Array<string>;
}

interface PostFeedProps {
    userId?: string;
}

const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {
    const { data: posts = [] } = usePosts(userId);
    return (
        <>
            {posts.map((post: Post) => (
                <PostItem
                    userId={userId}
                    key={post.id}
                    data={post}
                />
            ))}
        </>
    );
}

export default PostFeed;
