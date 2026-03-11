import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve static files from React build
app.use(express.static(path.join(__dirname, "../dist")));

// POST /api/explain
app.post("/api/explain", async (req, res) => {
  try {
    const { algorithm } = req.body;

    const explanations = {
      "bubble-sort":
        "Bubble Sort repeatedly compares adjacent elements and swaps them if out of order. Time: O(n²). Space: O(1).",
      "quick-sort":
        "Quick Sort picks a pivot and partitions the array around it, then recursively sorts each side. Time: O(n log n) avg. Space: O(log n).",
      "merge-sort":
        "Merge Sort divides the array in half, sorts each half, then merges them. Time: O(n log n). Space: O(n).",
      "binary-search":
        "Binary Search halves the sorted search space each step by comparing with the middle. Time: O(log n). Space: O(1).",
      "linear-search":
        "Linear Search checks each element one by one until the target is found. Time: O(n). Space: O(1).",
      bfs: "Breadth-First Search explores a graph level by level using a queue. Time: O(V+E).",
      dfs: "Depth-First Search explores as far as possible down each branch using a stack. Time: O(V+E).",
      "linked-list":
        "Linked List stores nodes with data and a pointer to the next node. Insert: O(1). Search: O(n).",
      "graph-traversal":
        "Graph Traversal visits all vertices using BFS or DFS strategies.",
    };

    const explanation =
      explanations[algorithm] ||
      `${algorithm} is an important algorithm. Select a specific one to learn more.`;

    res.json({ explanation, timestamp: new Date().toISOString() });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to generate explanation" });
  }
});

// GET /api/health
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Serve React app for all other routes (MUST be last)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
