import prisma from "../db/prisma.js";
import { getRecieverSocketId } from "../../socket/socket.js";
import { io } from "../../server.js";
export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: recieverId } = req.params;
        const senderId = req.user.id;
        if (!message) {
            return res.status(400).json({ message: "Message body is required" });
        }
        let convo = await prisma.conversation.findFirst({
            where: {
                participantsIds: {
                    hasEvery: [senderId, recieverId],
                },
            },
        });
        if (!convo) {
            convo = await prisma.conversation.create({
                data: {
                    participantsIds: {
                        set: [senderId, recieverId],
                    },
                },
            });
        }
        const newChat = await prisma.messages.create({
            data: {
                senderId,
                body: message,
                conversationId: convo.id,
            },
        });
        if (newChat) {
            convo = await prisma.conversation.update({
                where: {
                    id: convo.id,
                },
                data: {
                    messages: {
                        connect: {
                            id: newChat.id,
                        },
                    },
                },
            });
        }
        const recieverSocketId = getRecieverSocketId(recieverId);
        if (recieverSocketId) {
            io.to(recieverSocketId).emit("newMessages", newChat);
        }
        res.status(201).json(newChat);
    }
    catch (error) {
        console.error("error in sendMessage", error.message);
        res.status(500).json({ message: "internal server error" });
    }
};
export const fetchMessage = async (req, res) => {
    try {
        const { id: userChattingWithId } = req.params;
        const senderId = req.user.id;
        const convo = await prisma.conversation.findFirst({
            where: {
                participantsIds: {
                    hasEvery: [senderId, userChattingWithId],
                },
            },
            include: {
                messages: {
                    orderBy: {
                        createdAt: "asc",
                    },
                },
            },
        });
        if (!convo)
            return res.status(400).json([]);
        res.status(200).json(convo.messages);
    }
    catch (error) {
        console.error("error in fetchMessage", error.message);
        res.status(500).json({ message: "internal server error" });
    }
};
export const sideBarUsers = async (req, res) => {
    try {
        const authUserId = req.user.id;
        const users = await prisma.user.findMany({
            where: {
                id: {
                    not: authUserId,
                },
            },
            select: {
                id: true,
                fullName: true,
                profilePic: true,
            },
        });
        return res.status(200).json(users);
    }
    catch (error) {
        console.error("error in sideBarUsers", error.message);
        res.status(500).json({ message: "internal server error" });
    }
};
