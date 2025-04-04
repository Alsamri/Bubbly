process.on("uncaughtException", (err) => {
    console.error("UNCAUGHT EXCEPTION!", err);
    process.exit(1);
});
process.on("unhandledRejection", (err) => {
    console.error("UNHANDLED REJECTION!", err);
});
import app from "./index.js";
const PORT = 9000;
try {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}
catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
}
