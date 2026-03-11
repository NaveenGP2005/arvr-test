import { Link } from "react-router-dom";
import { Code2, Zap } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-slate-900 border-b border-slate-700 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 text-2xl font-bold">
          <Code2 className="w-8 h-8 text-blue-500" />
          <span>CodeCraft AR</span>
        </Link>

        <nav className="flex items-center gap-8">
          <Link to="/" className="hover:text-blue-400 transition">
            Home
          </Link>
          <Link to="/visualizer" className="hover:text-blue-400 transition">
            Visualizer
          </Link>
          <a href="#docs" className="hover:text-blue-400 transition">
            Docs
          </a>
        </nav>

        <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg flex items-center gap-2 transition">
          <Zap className="w-4 h-4" />
          Launch AR
        </button>
      </div>
    </header>
  );
}
