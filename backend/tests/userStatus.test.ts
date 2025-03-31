import { userStatus } from "../src/controller/authController";
import prisma from "../src/db/prisma";
import { Request, Response } from "express";

jest.mock("../src/db/prisma", () => ({
  user: {
    findUnique: jest.fn(),
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

    // Mocking findUnique to return a user object
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
