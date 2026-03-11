import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ARViewer from "@/components/ARViewer";
import { ArrowLeft, Info } from "lucide-react";

export default function ARExperience() {
  const { algorithmId } = useParams();
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    // Check if device supports AR
    const checkARSupport = async () => {
      // Check for WebXR support
      if ("xr" in navigator) {
        try {
          await (navigator as any).xr.isSessionSupported("immersive-ar");
        } catch (e) {
          // AR not fully supported
        }
      }
    };
    checkARSupport();
  }, []);

  const algorithmName =
    algorithmId?.replace("-", " ").toUpperCase() || "ALGORITHM";

  const algorithmDescriptions: { [key: string]: string } = {
    "bubble-sort":
      "Bubble sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
    "quick-sort":
      "Quick sort is a divide-and-conquer algorithm that picks a pivot element and partitions the array around it.",
    "merge-sort":
      "Merge sort is a stable sorting algorithm that divides the array in half, recursively sorts each half, then merges them back together.",
    "binary-search":
      "Binary search is an efficient algorithm for finding a target value within a sorted array by repeatedly dividing the search interval in half.",
    "linear-search":
      "Linear search examines each element of the array one by one until the target element is found or the end is reached.",
    "graph-traversal":
      "Graph traversal explores all vertices and edges of a graph using either BFS (breadth-first) or DFS (depth-first) methods.",
    "linked-list":
      "A linked list is a linear data structure where each element (node) contains a value and a reference to the next node.",
    dfs: "Depth-first search explores as far as possible along each branch before backtracking, using a stack data structure.",
    bfs: "Breadth-first search explores vertices in layers, visiting all neighbors before moving to the next level, using a queue.",
  };

  const description =
    algorithmDescriptions[algorithmId || ""] ||
    "Interactive 3D visualization of algorithm execution";

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between">
        <div>
          <Link
            to="/"
            className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            {algorithmName}
          </h1>
          <p className="text-slate-400">{description}</p>
        </div>
        <button
          onClick={() => setShowInfo(!showInfo)}
          className="bg-slate-800 hover:bg-slate-700 p-3 rounded-lg transition"
          title="More info"
        >
          <Info className="w-6 h-6 text-blue-400" />
        </button>
      </div>

      {/* Info Box */}
      {showInfo && (
        <div className="bg-blue-900/20 border border-blue-600 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-400 mb-3">
            About This Algorithm
          </h3>
          <p className="text-slate-300 mb-4">{description}</p>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-slate-400 mb-1">Time Complexity</p>
              <p className="text-blue-400 font-mono">O(n log n) avg</p>
            </div>
            <div>
              <p className="text-slate-400 mb-1">Space Complexity</p>
              <p className="text-blue-400 font-mono">O(n)</p>
            </div>
            <div>
              <p className="text-slate-400 mb-1">Type</p>
              <p className="text-blue-400 capitalize">
                {algorithmId?.split("-")[0]}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* AR Viewer */}
      <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
        <ARViewer algorithmId={algorithmId || ""} />
      </div>

      {/* Tips Section */}
      <div className="bg-slate-800 border border-slate-700 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Tips for Best Experience</h3>
        <ul className="space-y-2 text-slate-300">
          <li className="flex items-start gap-3">
            <span className="text-blue-400 font-bold">1.</span>
            <span>
              On mobile: Open this link on your phone to view the 3D
              visualization
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 font-bold">2.</span>
            <span>
              Use your device's built-in AR app or Chrome's WebAR for immersive
              experience
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 font-bold">3.</span>
            <span>
              Rotate and zoom the 3D view to understand the algorithm from
              different angles
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 font-bold">4.</span>
            <span>
              Good lighting helps AR mode perform better on mobile devices
            </span>
          </li>
        </ul>
      </div>

      {/* Related Algorithms */}
      <div className="bg-slate-800 border border-slate-700 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Related Algorithms</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {["bubble-sort", "quick-sort", "merge-sort"].map((algo) => (
            <Link
              key={algo}
              to={`/ar/${algo}`}
              className="bg-slate-700 hover:bg-slate-600 p-4 rounded-lg transition capitalize text-center"
            >
              {algo.replace("-", " ")}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
