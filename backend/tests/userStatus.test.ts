import { userStatus } from "../src/controller/authController";
import {
  sendMessage,
  fetchMessage,
  sideBarUsers,
} from "../src/controller/messageController";
import prisma from "../src/db/prisma";
import { Request, Response } from "express";

jest.mock("../src/db/prisma", () => ({
  user: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
  },
  conversation: {
    findFirst: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
  messages: {
    create: jest.fn(),
  },
  $disconnect: jest.fn(),
}));

describe("userStatus function", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    req = {
      user: { id: "user123" },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it("should return 404 if user is not found", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    await userStatus(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "user not found" });
  });

  it("should return 200 with user details if user is found", async () => {
    const mockUser = {
      id: "user123",
      fullName: "John Doe",
      username: "johndoe",
      profilePic: "profile.jpg",
    };

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

    await userStatus(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUser);
  });

  it("should return 500 if an error occurs", async () => {
    (prisma.user.findUnique as jest.Mock).mockRejectedValue(
      new Error("Database error")
    );

    await userStatus(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
  });
});

describe("sendMessage function", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {
      user: { id: "sender123" },
      body: { message: "Hello, World!" },
      params: { id: "receiver123" },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
  it("should create a new conversation if none exists and send a message", async () => {
    const mockConversation = {
      id: "convo123",
      participantsIds: ["sender123", "receiver123"],
    };
    const mockMessage = {
      id: "message123",
      senderId: "sender123",
      body: "Hello, World!",
      conversationId: "convo123",
    };

    (prisma.conversation.findFirst as jest.Mock).mockResolvedValue(null);
    (prisma.conversation.create as jest.Mock).mockResolvedValue(
      mockConversation
    );
    (prisma.messages.create as jest.Mock).mockResolvedValue(mockMessage);
    (prisma.conversation.update as jest.Mock).mockResolvedValue(
      mockConversation
    );

    await sendMessage(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockMessage);
  });

  it("should send a message in an existing conversation", async () => {
    const mockConversation = {
      id: "convo123",
      participantsIds: ["sender123", "receiver123"],
    };
    const mockMessage = {
      id: "message123",
      senderId: "sender123",
      body: "Hello, World!",
      conversationId: "convo123",
    };

    (prisma.conversation.findFirst as jest.Mock).mockResolvedValue(
      mockConversation
    );
    (prisma.messages.create as jest.Mock).mockResolvedValue(mockMessage);

    await sendMessage(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockMessage);
  });

  it("should return 500 if an error occurs while creating the message", async () => {
    (prisma.conversation.findFirst as jest.Mock).mockResolvedValue(null);
    (prisma.conversation.create as jest.Mock).mockResolvedValue({
      id: "convo123",
      participantsIds: ["sender123", "receiver123"],
    });
    (prisma.messages.create as jest.Mock).mockRejectedValue(
      new Error("Database error")
    );

    await sendMessage(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "internal server error" });
  });

  it("should return 400 if the message body is missing", async () => {
    req.body.message = undefined;

    await sendMessage(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Message body is required",
    });
  });
});
describe("fetchMessage function", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {
      user: { id: "sender123" },
      params: { id: "receiver123" },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });
  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should return 200 with messages if the conversation exists", async () => {
    const mockMessages = [
      { id: "msg123", body: "Hello", createdAt: new Date() },
      { id: "msg124", body: "Hi", createdAt: new Date() },
    ];
    const mockConvo = {
      id: "convo123",
      participantsIds: ["sender123", "receiver123"],
      messages: mockMessages,
    };

    (prisma.conversation.findFirst as jest.Mock).mockResolvedValue(mockConvo);

    await fetchMessage(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockMessages);
  });

  it("should return 200 with an empty array if no conversation exists", async () => {
    (prisma.conversation.findFirst as jest.Mock).mockResolvedValue(null);

    await fetchMessage(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([]);
  });

  it("should return 500 if an error occurs", async () => {
    (prisma.conversation.findFirst as jest.Mock).mockRejectedValue(
      new Error("Database error")
    );

    await fetchMessage(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "internal server error" });
  });
});
describe("sideBarUsers function", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {
      user: { id: "authUser123" }, // Mock authenticated user ID
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should return 200 with a list of users excluding the authenticated user", async () => {
    const mockUsers = [
      { id: "user1", fullName: "Alice Smith", profilePic: "alice.jpg" },
      { id: "user2", fullName: "Bob Johnson", profilePic: "bob.jpg" },
    ];

    (prisma.user.findMany as jest.Mock).mockResolvedValue(mockUsers);

    await sideBarUsers(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUsers);
  });

  it("should return 200 with an empty list if no other users exist", async () => {
    (prisma.user.findMany as jest.Mock).mockResolvedValue([]);

    await sideBarUsers(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([]);
  });

  it("should return 500 if an error occurs", async () => {
    (prisma.user.findMany as jest.Mock).mockRejectedValue(
      new Error("Database error")
    );

    await sideBarUsers(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "internal server error" });
  });
});
