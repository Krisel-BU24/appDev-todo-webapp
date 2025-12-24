// Suggested Tech Stack: Node.js, Express.js, MongoDB, JWT Auth

import express from "express"
import dotenv from "dotenv";
import cors from "cors"
import bcrypt from "bcrypt"

import { connectDb, getDB } from "./config/db.js";

// load env
dotenv.config();

// 
const saltRounds = 10;


// server 
const app = express()
const port = process.env.PORT || 3000;

app.use(cors({
    origin: "http://localhost:5173", // Allow your React app
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json())
// allows communication between front and back end 
// app.use(cors())

app.post("/api/check-user", async (req, res) => {
    try {
        const database = getDB();
        const users = database.collection("users");

        // match the user
        const user = await users.findOne({userName: req.body.username})

        if (user) {
            // sign in ❌ login ✅
            res.json({ exists: true });
        } else {
            // sign in ✅ login ❌
            res.json({ exists: false });
        }

    } catch (error) {
        res.status(500).json({ error: "Database error" });
    }
})


// when the form is submit this will be called 
app.post("/auth/register", async (req, res) => {
    const {username, password} = req.body;

    const name = username;
    const pass = password;


    const hashedPassword = await bcrypt.hash(pass, saltRounds)
    const newUser = {
        userName: name,
        passWord: hashedPassword,
        task: []
    }
    try {
        const database =  getDB();

        database.collection("taskXuser").insertOne(newUser);

        res.status(201).json({ message: "User registered" });

    } catch (err) {
        res.status(500).json({ error: "Database error" });
    }
})

// todo: create a method for getting 

async function startServer() {
    await connectDb()
    app.listen(port, () => {
        console.log(`listening at http://localhost:${port}`);
    })
}


startServer()

