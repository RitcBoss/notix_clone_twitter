import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import { AiOutlineHeart, AiFillHeart, AiOutlineMessage } from "react-icons/ai";

import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModel from "@/hooks/useLoginModel";
import { useSession } from "next-auth/react";

import Avatar from "../Avatar";
import useLike from "@/hooks/useLike";

// Define the User and Comment interfaces
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

interface PostItemProps {
    data: {
        id: string;
        title: string;
        body: string;
        createdAt: string;
        user: User; // Use User type
        comments: Comment[]; // Use Comment type
        linkedIds: Array<string>;
    };
    userId?: string;
}

const PostItem: React.FC<PostItemProps> = ({ data, userId }) => {
    const router = useRouter();
    const loginModel = useLoginModel();
    const { data: session } = useSession();
    const { data: currentUser } = useCurrentUser(session);
    const { hasLiked, toggleLike } = useLike({ postId: data.id, userId });

    const goToUser = useCallback((event: React.MouseEvent<HTMLParagraphElement>) => {
        event.stopPropagation();
        router.push(`/users/${data.user.id}`);
    }, [router, data.user.id]);

    const goToPost = useCallback(() => {
        router.push(`/posts/${data.id}`);
    }, [router, data.id]);

    const onLike = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        if (!currentUser) {
            return loginModel.onOpen();
        }
        toggleLike();
    }, [loginModel, currentUser, toggleLike]);

    const createdAt = useMemo(() => {
        if (!data?.createdAt) {
            return null;
        }
        return formatDistanceToNowStrict(new Date(data.createdAt));
    }, [data?.createdAt]);

    const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart;

    return (
        <div
            onClick={goToPost}
            className="
                border-b-[1px]
                border-neutral-800
                p-5
                cursor-pointer
                hover:bg-neutral-900
                transition
            "
        >
            <div className="flex flex-row items-start gap-3">
                <Avatar userId={data.user.id} />
                <div>
                    <div className="flex flex-row items-center gap-2">
                        <p
                            onClick={goToUser}
                            className="text-white font-semibold cursor-pointer hover:underline"
                        >
                            {data.user.name}
                        </p>
                        <span
                            onClick={goToUser}
                            className="text-neutral-500 hidden md:block"
                        >
                            @{data.user.username}
                        </span>
                        <span className="text-neutral-500 text-sm">
                            {createdAt}
                        </span>
                    </div>
                    <div className="text-white mt-1">
                        {data.body}
                    </div>
                    <div className="flex flex-row items-center mt-3 gap-10">
                        <div
                            className="
                                flex
                                flex-row
                                items-center
                                text-neutral-500
                                gap-2
                                cursor-pointer
                                transition
                                hover:text-sky-500
                                hover:bg-sky-500/25
                                rounded-full
                                p-2
                            "
                        >
                            <AiOutlineMessage size={20} />
                            <p>{data.comments?.length || 0}</p>
                        </div>
                        <div
                            onClick={onLike}
                            className="
                                flex
                                flex-row
                                items-center
                                text-neutral-500
                                gap-2
                                cursor-pointer
                                transition
                                hover:text-red-500
                                hover:bg-red-500/25
                                rounded-full
                                p-2
                            "
                        >
                            <LikeIcon size={20} color={hasLiked ? 'red' : ''} />
                            <p>{data.linkedIds.length}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostItem;
