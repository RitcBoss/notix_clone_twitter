import { useRouter } from "next/router"
import { ClipLoader } from "react-spinners";

import Header from "@/components/Header";
import PostItem from "@/components/posts/PostItem";
import usePost from "@/hooks/usePost";
import From from "@/components/From";
import CommentFeed from "@/components/posts/CommentFeed";


const PostView = () => {
    const router = useRouter();
    const { postId } = router.query;

    const { data: fetchedPost, isLoading } = usePost(postId as string);

    if (isLoading || !fetchedPost) {
        return (
            <div className="flex justify-center items-center h-full">
                <ClipLoader />
            </div>
        )
    }

    return (
        <>
            <Header label="Post" showBackArrow />
            <PostItem data={fetchedPost} />
            <From
                postId={postId as string}
                isComment
                placeholder="Post your reply"
            />
            <CommentFeed comments={fetchedPost?.comments} />
        </>
    )
}

export default PostView