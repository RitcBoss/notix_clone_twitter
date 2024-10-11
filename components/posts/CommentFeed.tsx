import CommentItem from "./CommentItem";

interface Comment {
    id: string;
    body: string;
    createdAt: string;
    user: {
        id: string;
        name: string;
        username: string;
    };
}

interface CommentFeedProps {
    comments?: Comment [];
}

const CommentFeed: React.FC<CommentFeedProps> = ({ comments = [] }) => {
    return (
        <div>
            {comments.map((comment) => (
                <div key={comment.id}>
                    <CommentItem data={comment}  />
                </div>
            ))}
        </div>
    )
}

export default CommentFeed;