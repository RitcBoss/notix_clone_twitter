
import { FaFeather } from "react-icons/fa";

import useLoginModel from "@/hooks/useLoginModel";
import { useCallback } from "react";
import useCurrentUser from "@/hooks/useCurrentUser";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

const SidebarTweetButton = () => {

    const loginModel = useLoginModel();
    const { data: session } = useSession();
    const {data: currentUser} = useCurrentUser(session);

    const onClick = useCallback(() => {
    if (!currentUser) {
        return loginModel.onOpen();  
    }
    toast('Plase include text in your post!',
    {
      icon: '💬',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    }
  );
}, [loginModel, currentUser]);

    return (
        <div onClick={(onClick)}>
            <div className="
                mt-6
                lg:hidden
                h-14
                w-14
                p-4
                flex
                items-center
                justify-center
                bg-emerald-500
                hover:bg-opacity-80
                transition
                cursor-pointer
                rounded-full
                "
            >
                <FaFeather size={24} color="white" />
            </div>
            <div className="
                mt-6
                hidden
                lg:block
                px-4
                py-2
                rounded-full
                bg-emerald-500
                hover:bg-opacity-90
                cursor-pointer
                transition
                "
            >
                <p className="
                hidden
                lg:block
                text-center
                font-semibold
                text-white
                text-[20px]">
                    Post
                </p>

            </div>
        </div>
    )
}

export default SidebarTweetButton
