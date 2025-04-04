import express from "express";
const app = express();
app.get("/", (req, res) => res.send("Test OK"));
app.listen(9000, () => {
    console.log("Test server running on port 9000");
});
