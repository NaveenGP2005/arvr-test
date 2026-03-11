import { Link } from "react-router-dom";
import { ArrowRight, Zap, Brain, Eye, Code } from "lucide-react";

export default function Home() {
  const algorithms = [
    { name: "Bubble Sort", id: "bubble-sort", icon: Zap },
    { name: "Binary Search", id: "binary-search", icon: Brain },
    { name: "DFS/BFS", id: "graph-traversal", icon: Eye },
    { name: "Linked Lists", id: "linked-list", icon: Code },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-20">
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Step Into Your Code
        </h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          Visualize algorithms and data structures in AR. Watch sorting
          algorithms rearrange 3D blocks in your room. Understand complexity
          with AI-powered explanations.
        </p>

        <div className="flex gap-4 justify-center pt-8">
          <Link
            to="/visualizer"
            className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition"
          >
            Start Visualizing
            <ArrowRight className="w-4 h-4" />
          </Link>
          <button className="border border-slate-400 hover:border-blue-400 px-8 py-3 rounded-lg transition">
            Learn More
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8">
        <div className="bg-slate-800 p-8 rounded-lg border border-slate-700">
          <Eye className="w-8 h-8 text-blue-400 mb-4" />
          <h3 className="text-xl font-bold mb-2">Visual Learning</h3>
          <p className="text-slate-400">
            Watch algorithms execute in real-time with animated 3D
            visualizations
          </p>
        </div>
        <div className="bg-slate-800 p-8 rounded-lg border border-slate-700">
          <Brain className="w-8 h-8 text-cyan-400 mb-4" />
          <h3 className="text-xl font-bold mb-2">AI Explanations</h3>
          <p className="text-slate-400">
            Get instant explanations powered by Groq API about every step
          </p>
        </div>
        <div className="bg-slate-800 p-8 rounded-lg border border-slate-700">
          <Zap className="w-8 h-8 text-yellow-400 mb-4" />
          <h3 className="text-xl font-bold mb-2">AR Experience</h3>
          <p className="text-slate-400">
            Experience algorithms in augmented reality on your mobile device
          </p>
        </div>
      </section>

      {/* Algorithms Grid */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold">Available Algorithms</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {algorithms.map((algo) => {
            const Icon = algo.icon;
            return (
              <Link
                key={algo.id}
                to={`/ar/${algo.id}`}
                className="bg-slate-800 hover:bg-slate-700 p-6 rounded-lg border border-slate-700 hover:border-blue-500 transition group"
              >
                <Icon className="w-6 h-6 text-blue-400 mb-3 group-hover:text-cyan-400 transition" />
                <h3 className="font-semibold text-lg mb-2">{algo.name}</h3>
                <p className="text-sm text-slate-400">Visualize in AR</p>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
