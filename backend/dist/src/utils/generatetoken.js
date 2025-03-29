import jwt from "jsonwebtoken";
const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_secret, {
        expiresIn: "7d",
    });
    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true, //prevent xss
        sameSite: "strict", // preven csrf attack
        secure: process.env.NODE_ENV !== "development",
    });
};
export default generateToken;
