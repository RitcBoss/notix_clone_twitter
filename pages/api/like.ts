import { NextApiRequest, NextApiResponse } from "next";

import prisma from '@/libs/prismadb';
import serverAuth from "@/libs/serverAuth";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST' && req.method !== 'DELETE') {
        return res.status(405).end();
    }

    try {
        const { postId } = req.body;

        const { currentUser } = await serverAuth(req, res)

        if (!postId || typeof postId !== 'string') {
            throw new Error('Invalid ID');
        }

        const post = await prisma.post.findUnique({
            where : {
                id: postId
            }
        });

        if (!post) {
            throw new Error('Invalid ID');
        }

        let updatedLinkedIds = [...(post.linkedIds || [])];

        if (req.method === 'POST') {
            updatedLinkedIds.push(currentUser.id);

            try {
                const post = await prisma.post.findUnique({
                    where: {
                        id: postId
                    },
                });

                if (post?.userId) {
                    await prisma.notification.create({
                        data: {
                            body: "Someone liked your post",
                            userId: post.userId
                        }
                    });
                    
                    await prisma.user.update({
                        where: {
                            id: post.userId
                        },
                        data: {
                            hasNotification: true
                        }
                    })
                }

            }catch (error) {
                console.log(error)
            }
        }

        if (req.method === 'DELETE'){
            updatedLinkedIds = updatedLinkedIds
            .filter((linkedId) => linkedId !== currentUser.id)
        }

        const updatePost = await prisma.post.update({
            where: {
                id: postId
            },
            data: {
                linkedIds: updatedLinkedIds
            }
        });

        return res.status(200).json(updatePost);


    } catch (error) {
        console.log(error)
        return res.status(400).end();
    }
}