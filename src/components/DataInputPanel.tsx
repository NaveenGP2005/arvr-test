import { useState } from "react";

interface DataInputPanelProps {
  data: number[];
  onChange: (data: number[]) => void;
}

export default function DataInputPanel({
  data,
  onChange,
}: DataInputPanelProps) {
  const [input, setInput] = useState(data.join(", "));

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleApply = () => {
    const numbers = input
      .split(",")
      .map((s) => parseInt(s.trim()))
      .filter((n) => !isNaN(n));

    if (numbers.length > 0) {
      onChange(numbers);
    }
  };

  const generateRandom = () => {
    const random = Array.from({ length: 10 }, () =>
      Math.floor(Math.random() * 100),
    );
    onChange(random);
    setInput(random.join(", "));
  };

  return (
    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
      <label className="block text-sm font-semibold mb-2">Input Data</label>
      <textarea
        value={input}
        onChange={handleChange}
        placeholder="Enter numbers separated by commas..."
        className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white focus:outline-none focus:border-blue-500 mb-4 text-sm h-24"
      />

      <div className="space-y-2">
        <button
          onClick={handleApply}
          className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition text-sm"
        >
          Apply
        </button>
        <button
          onClick={generateRandom}
          className="w-full bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded transition text-sm"
        >
          Random
        </button>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-700">
        <p className="text-xs text-slate-400 mb-2">Current Data:</p>
        <p className="text-sm font-mono bg-slate-900 p-2 rounded overflow-x-auto">
          [{data.join(", ")}]
        </p>
      </div>
    </div>
  );
}
