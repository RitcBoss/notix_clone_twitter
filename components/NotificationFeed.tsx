import useCurrentUser from "@/hooks/useCurrentUser"
import useNotifications from "@/hooks/userNotifications";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { BsTwitterX } from "react-icons/bs";

const NotificationFeed = () => {
    const { data: session } = useSession();
    const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser(session); 
    const { data: fetchedNotifications = [] } = useNotifications(currentUser?.id);

    useEffect(() => {
        mutateCurrentUser();
    }, [mutateCurrentUser])

    if (fetchedNotifications.length === 0) {
        return (
            <div className="
                text-neutral-600
                text-center
                p-6
                text-xl
            "
            >
                No notification
            </div>
        )
    }

    return (
        <div className="flex flex-col">
            {fetchedNotifications.slice(0, 10).map((notification: { id: string; body: string }) => {
                return (
                    <div
                        key={notification.id}
                        className="
                        flex
                        flex-row
                        items-center
                        p-6
                        gap-4
                        border-b-[1px]
                        border-neutral-800
                    "
                    >
                        <BsTwitterX color="white" size={32} />
                        <p className="text-white">
                            {notification.body}
                        </p>
                    </div>
                )
            })}
        </div>
    )
}

export default NotificationFeed;
