import request from "supertest";
import app from "../src/index";
import prisma from "../src/db/prisma";

describe("User Signup API", () => {
  beforeAll(async () => {
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

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
    // First request to create the user
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
