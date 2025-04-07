import prisma from "../db/prisma.js";
import { getRecieverSocketId, io } from "../../socket/socket.js";
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
                participants: {
                    some: {
                        id: { in: [senderId, recieverId] },
                    },
                },
            },
        });
        if (!convo) {
            convo = await prisma.conversation.create({
                data: {
                    participants: {
                        connect: [{ id: senderId }, { id: recieverId }],
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
                where: { id: convo.id },
                data: {
                    messages: {
                        connect: { id: newChat.id },
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
        res.status(500).json({ message: "Internal server error" });
    }
};
export const fetchMessage = async (req, res) => {
    try {
        const { id: userChattingWithId } = req.params;
        const senderId = req.user.id;
        const convo = await prisma.conversation.findFirst({
            where: {
                participants: {
                    some: {
                        id: { in: [senderId, userChattingWithId] },
                    },
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
        res.status(500).json({ message: "Internal server error" });
    }
};
export const sideBarUsers = async (req, res) => {
    try {
        const authUserId = req.user.id;
        const conversations = await prisma.conversation.findMany({
            where: {
                participants: {
                    some: {
                        id: authUserId,
                    },
                },
            },
            include: {
                participants: {
                    select: {
                        id: true,
                        fullName: true,
                        profilePic: true,
                    },
                },
            },
        });
        const participants = conversations.flatMap((convo) => convo.participants.filter((user) => user.id !== authUserId));
        const uniqueParticipants = Array.from(new Map(participants.map((user) => [user.id, user])).values());
        res.status(200).json(uniqueParticipants);
    }
    catch (error) {
        console.error("Error in sideBarUsers:", error.message);
        res.status(500).json({ message: "Internal server error in sidebar users" });
    }
};
export const allUsers = async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await prisma.user.findMany({
            select: {
                id: true,
                fullName: true,
                profilePic: true,
            },
        });
        res.status(200).json(users);
    }
    catch (error) {
        console.error("Error in allUsers:", error.message);
        res
            .status(500)
            .json({ message: "Internal server error in fetching users" });
    }
};
