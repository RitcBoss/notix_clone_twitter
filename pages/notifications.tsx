import Header from "@/components/Header";
import NotificationFeed from "@/components/NotificationFeed";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }
    return {
        props:{
            session
        }
    }
    

}

const Notifications = () => {
    return (
        <>
            <Header label="Notification" showBackArrow />
            <NotificationFeed/>
        </>
    )
}

export default Notifications;