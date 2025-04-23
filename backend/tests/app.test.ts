import request from "supertest";
import app from "../src/index.js";
import prisma from "../src/db/prisma.js";
import bcryptjs from "bcryptjs";

describe("User Authentication API", () => {
  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe("User Signup API", () => {
    it("should successfully register a new user", async () => {
      const res = await request(app).post("/api/userAuth/signup").send({
        fullName: "John Doe",
        username: "johndoe",
        password: "password123",
        confirmPassword: "password123",
        gender: "male",
      });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("id");
      expect(res.body).toHaveProperty("username", "johndoe");
    });

    it("should return error if required fields are missing", async () => {
      const res = await request(app).post("/api/userAuth/signup").send({
        username: "johndoe",
        password: "password123",
      });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error", "please fill in all fields");
    });

    it("should return error if passwords do not match", async () => {
      const res = await request(app).post("/api/userAuth/signup").send({
        fullName: "John Doe",
        username: "johndoe",
        password: "password123",
        confirmPassword: "wrongpassword",
        gender: "male",
      });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error", "passwords dont match");
    });

    it("should return error if username already exists", async () => {
      await request(app).post("/api/userAuth/signup").send({
        fullName: "John Doe",
        username: "johndoe",
        password: "password123",
        confirmPassword: "password123",
        gender: "male",
      });

      const res = await request(app).post("/api/userAuth/signup").send({
        fullName: "John Doe",
        username: "johndoe",
        password: "password123",
        confirmPassword: "password123",
        gender: "male",
      });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error", "user name already exist");
    });
  });

  describe("User Login API", () => {
    beforeEach(async () => {
      await prisma.user.create({
        data: {
          fullName: "John Doe",
          username: "johndoe",
          password: await bcryptjs.hash("password123", 10), // Hashed password
          gender: "male",
          profilePic: "",
        },
      });
    });

    it("should successfully log in a user with correct credentials", async () => {
      const res = await request(app).post("/api/userAuth/login").send({
        username: "johndoe",
        password: "password123",
      });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("id");
      expect(res.body).toHaveProperty("username", "johndoe");
      expect(res.body).toHaveProperty("profilePic");
    });

    it("should return error if username does not exist", async () => {
      const res = await request(app).post("/api/userAuth/login").send({
        username: "unknownuser",
        password: "password123",
      });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error", "invalid credential");
    });

    it("should return error if password is incorrect", async () => {
      const res = await request(app).post("/api/userAuth/login").send({
        username: "johndoe",
        password: "wrongpassword",
      });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error", "invalid credential");
    });
  });
});

describe("User Logout API", () => {
  it("should successfully log out a user", async () => {
    const res = await request(app).post("/api/userAuth/logout");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "logged out successfully");
    expect(res.headers["set-cookie"]).toBeDefined();
  });
});
