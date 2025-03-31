import { Request, Response } from "express";
import prisma from "../db/prisma.js";

export const sendMessage = async (req: Request, res: Response) => {
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
    res.status(201).json(newChat);
  } catch (error: any) {
    console.error("error in sendMessage", error.message);
    res.status(500).json({ message: "internal server error" });
  }
};
