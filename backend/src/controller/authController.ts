import { Request, Response } from "express";
import prisma from "../db/prisma.js";
import bcryptjs from "bcryptjs";
import generateToken from "../utils/generatetoken.js";
export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      return res.status(400).json({ error: "invalid credential" });
    }
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "invalid credential" });
    }
    generateToken(user.id, res);
    res.status(200).json({
      id: user.id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error: any) {
    console.error("login error:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
export const logout = async (req: Request, res: Response) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "logged out successfully" });
  } catch (error: any) {
    console.error("logout error:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const signup = async (req: Request, res: Response) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    if (!fullName || !username || !password || !confirmPassword || !gender) {
      return res.status(400).json({ error: "please fill in all fields" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "passwords dont match" });
    }
    const user = await prisma.user.findUnique({ where: { username } });

    if (user) {
      return res.status(400).json({ error: "user name already exist" });
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const girlProfileImg = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    const boyProfileImg = `https://avatar.iran.liara.run/public/boy?username=${username}`;

    const newUser = await prisma.user.create({
      data: {
        fullName,
        username,
        password: hashedPassword,
        gender,
        profilePic: gender === "female" ? girlProfileImg : boyProfileImg,
      },
    });

    if (newUser) {
      generateToken(newUser.id, res);
      res.status(201).json({
        id: newUser.id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "invalid user input" });
    }
  } catch (error: any) {
    console.error("Signup error:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const userStatus = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    res.status(200).json({
      id: user.id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error: any) {
    console.error("userStatus error:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
