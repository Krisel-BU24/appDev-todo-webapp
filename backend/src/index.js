import 'dotenv/config'; // Loads variables immediately
import express from 'express';
import jwt from "jsonwebtoken";
import cors from "cors";
import bcrypt from "bcrypt";

import { connectDb } from "./config/db.js";
import { auth } from "./middleware/auth.js";
import User from "./model/user.js";

const app = express();
// Use the dynamic PORT provided by Render, or fallback to 3000 for local dev
const port = process.env.PORT || 10000; 
const saltRounds = 10;

// Middleware
app.use(cors({
    // Replace with your actual Vercel/Render frontend URL once live
    origin: ["http://localhost:5173", "https://your-frontend-link.vercel.app"], 
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());

// --- ROUTES (Your routes remain the same) ---
app.post("/api/check-user", async (req, res) => { /* ... */ });
app.post("/auth/register", async (req, res) => { /* ... */ });
app.post("/auth/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ userName: username });
        if (!user) return res.status(401).json({ error: "Invalid credentials" });

        const match = await bcrypt.compare(password, user.passWord);
        if (!match) return res.status(401).json({ error: "Invalid credentials" });

        // Ensure your Render Environment Variables include JWT_KEY
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_KEY, 
            { expiresIn: "1h" }
        );

        res.json({ token, username: user.userName });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/api/tasks", auth, async (req, res) => { /* ... */ });
app.post("/api/task/add", auth, async (req, res) => { /* ... */ });
app.delete("/api/tasks/delete", auth, async (req, res) => { /* ... */ });
app.patch("/api/tasks/:taskId/resolve", auth, async (req, res) => { /* ... */ });

// Start Server
async function startServer() {
    await connectDb();
    app.listen(port, () => {
        console.log(`🚀 Server listening at port ${port}`);
    });
}

startServer();
