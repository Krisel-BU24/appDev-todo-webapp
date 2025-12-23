// Suggested Tech Stack: Node.js, Express.js, MongoDB, JWT Auth

import express from "express"
import dotenv from "dotenv";
import cors from "cors "

import { connectDb, getDB } from "./config/db";

// load env
dotenv.config();

// server 
const express = require('express');
const app = express()
const port = process.env.PORT || 3000;


app.use(express.json())
// allows communication between front and back end 
app.use(cors())

app.post("/api/check-user", async (req, res) => {
    try {
        const database = getDB();
        const users = database.collection("users");

        // match the user
        const user = await users.findOne({username: req.body.username})

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
async function startServer() {
    await connectDb()
    app.listen(port, () => {
        console.log(`listening at http://localhost:${port}`);
    })
}


startServer()

