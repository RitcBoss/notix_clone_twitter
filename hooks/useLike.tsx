import { useCallback, useMemo } from "react";

import useCurrentUser from "./useCurrentUser"
import useLoginModel from "./useLoginModel";
import usePost from "./usePost";
import usePosts from "./usePosts";
import toast from "react-hot-toast";
import axios from "axios";
import { useSession } from "next-auth/react";

const useLike = ({ postId, userId }: { postId: string, userId?: string }) => {
    const { data: session } = useSession();
    const { data: currentUser } = useCurrentUser(session);
    const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
    const { mutate: mutateFetchedPosts } = usePosts(userId);

    const loginModel = useLoginModel();

    const hasLiked = useMemo(() => {
        const list = fetchedPost?.linkedIds || [];

        return list.includes(currentUser?.id);
    }, [currentUser?.id, fetchedPost?.linkedIds])

    const toggleLike = useCallback(async () => {
        if (!currentUser) {
            return loginModel.onOpen();
        }

        try {
            let request;
            if (hasLiked) {
                request = () => axios.delete('/api/like', { data: { postId } });
            } else {
                request = () => axios.post('/api/like', { postId });
            }

            await request();

            mutateFetchedPost();
            mutateFetchedPosts();

            toast.success('Success');
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    }, [
        currentUser,
        hasLiked,
        postId,
        mutateFetchedPost,
        mutateFetchedPosts,
        loginModel
    ]);
    return {
        hasLiked,
        toggleLike
    }
}

export default useLike;