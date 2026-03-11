interface AlgorithmSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function AlgorithmSelector({
  value,
  onChange,
}: AlgorithmSelectorProps) {
  const algorithms = [
    { id: "bubble-sort", label: "Bubble Sort" },
    { id: "selection-sort", label: "Selection Sort" },
    { id: "insertion-sort", label: "Insertion Sort" },
    { id: "binary-search", label: "Binary Search" },
    { id: "linear-search", label: "Linear Search" },
    { id: "bfs", label: "BFS (Graph)" },
    { id: "dfs", label: "DFS (Graph)" },
    { id: "linked-list", label: "Linked List" },
  ];

  return (
    <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
      <label className="block text-sm font-semibold mb-3">Algorithm</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm"
      >
        {algorithms.map((algo) => (
          <option key={algo.id} value={algo.id}>
            {algo.label}
          </option>
        ))}
      </select>
    </div>
  );
}
