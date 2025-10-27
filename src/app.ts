import compression from "compression";
import cors from "cors";
import express from "express";
import { prisma } from "./config/db";

const app = express();

// Middleware
app.use(cors()); // Enables Cross-Origin Resource Sharing
app.use(compression()); // Compresses response bodies for faster delivery
app.use(express.json()); // Parse incoming JSON requests

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Default route for testing
app.get("/test", async (_req, res) => {
  console.log("first");
  try {
    const rsc = await prisma.user.create({
      data: {
        email: "test@example.com1",
      },
    });
    console.log("User created:", rsc);
    res.json(rsc);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("Error creating user");
  }
});

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

export default app;
