import { useState, useEffect, useRef, useCallback } from "react";
import AlgorithmSelector from "@/components/AlgorithmSelector";
import DataInputPanel from "@/components/DataInputPanel";
import AIExplainer from "@/components/AIExplainer";
import { Play, Pause, RotateCcw, Zap } from "lucide-react";

// ── Sorting algorithms that yield step-by-step states ──────────────────────
function* bubbleSortGen(arr: number[]) {
  const a = [...arr];
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a.length - i - 1; j++) {
      yield { array: [...a], comparing: [j, j + 1], sorted: [] as number[] };
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
      }
    }
  }
  yield {
    array: [...a],
    comparing: [] as number[],
    sorted: a.map((_, i) => i),
  };
}

function* selectionSortGen(arr: number[]) {
  const a = [...arr];
  for (let i = 0; i < a.length; i++) {
    let minIdx = i;
    for (let j = i + 1; j < a.length; j++) {
      yield {
        array: [...a],
        comparing: [minIdx, j],
        sorted: Array.from({ length: i }, (_, k) => k),
      };
      if (a[j] < a[minIdx]) minIdx = j;
    }
    if (minIdx !== i) {
      [a[i], a[minIdx]] = [a[minIdx], a[i]];
    }
  }
  yield {
    array: [...a],
    comparing: [] as number[],
    sorted: a.map((_, i) => i),
  };
}

function* insertionSortGen(arr: number[]) {
  const a = [...arr];
  for (let i = 1; i < a.length; i++) {
    let j = i;
    while (j > 0 && a[j - 1] > a[j]) {
      yield { array: [...a], comparing: [j - 1, j], sorted: [] as number[] };
      [a[j - 1], a[j]] = [a[j], a[j - 1]];
      j--;
    }
  }
  yield {
    array: [...a],
    comparing: [] as number[],
    sorted: a.map((_, i) => i),
  };
}

function linearSearchGen(arr: number[], target: number) {
  function* gen() {
    for (let i = 0; i < arr.length; i++) {
      yield {
        array: [...arr],
        comparing: [i],
        found: arr[i] === target ? i : -1,
      };
      if (arr[i] === target) return;
    }
    yield { array: [...arr], comparing: [] as number[], found: -1 };
  }
  return gen();
}

function binarySearchGen(arr: number[], target: number) {
  const sorted = [...arr].sort((a, b) => a - b);
  function* gen() {
    let lo = 0,
      hi = sorted.length - 1;
    while (lo <= hi) {
      const mid = Math.floor((lo + hi) / 2);
      yield {
        array: sorted,
        comparing: [mid],
        lo,
        hi,
        found: sorted[mid] === target ? mid : -1,
      };
      if (sorted[mid] === target) return;
      else if (sorted[mid] < target) lo = mid + 1;
      else hi = mid - 1;
    }
    yield { array: sorted, comparing: [] as number[], lo: 0, hi: 0, found: -1 };
  }
  return gen();
}

interface Step {
  array: number[];
  comparing: number[];
  sorted?: number[];
  found?: number;
}

const SPEEDS = { slow: 800, medium: 400, fast: 100 };

export default function AlgorithmVisualizer() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("bubble-sort");
  const [inputData, setInputData] = useState<number[]>([
    38, 27, 43, 3, 9, 82, 10,
  ]);
  const [currentStep, setCurrentStep] = useState<Step>({
    array: [38, 27, 43, 3, 9, 82, 10],
    comparing: [],
  });
  const [isRunning, setIsRunning] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [speed, setSpeed] = useState<"slow" | "medium" | "fast">("medium");
  const [stepCount, setStepCount] = useState(0);
  const generatorRef = useRef<Generator<Step> | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const buildGenerator = useCallback(
    (data: number[], algo: string): Generator<Step> => {
      const target = Math.max(...data);
      switch (algo) {
        case "bubble-sort":
          return bubbleSortGen(data) as Generator<Step>;
        case "selection-sort":
          return selectionSortGen(data) as Generator<Step>;
        case "insertion-sort":
          return insertionSortGen(data) as Generator<Step>;
        case "linear-search":
          return linearSearchGen(data, target) as Generator<Step>;
        case "binary-search":
          return binarySearchGen(data, target) as Generator<Step>;
        default:
          return bubbleSortGen(data) as Generator<Step>;
      }
    },
    [],
  );

  const reset = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsRunning(false);
    setIsDone(false);
    setStepCount(0);
    setCurrentStep({ array: [...inputData], comparing: [] });
    generatorRef.current = buildGenerator([...inputData], selectedAlgorithm);
  }, [inputData, selectedAlgorithm, buildGenerator]);

  useEffect(() => {
    reset();
  }, [selectedAlgorithm, inputData]);

  useEffect(() => {
    if (!isRunning || isDone) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      const gen = generatorRef.current;
      if (!gen) return;
      const result = gen.next();
      if (result.done || !result.value) {
        setIsDone(true);
        setIsRunning(false);
        clearInterval(timerRef.current!);
      } else {
        setCurrentStep(result.value);
        setStepCount((c) => c + 1);
      }
    }, SPEEDS[speed]);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, isDone, speed]);

  const maxVal = Math.max(...currentStep.array, 1);

  const getBarColor = (index: number) => {
    if (currentStep.found === index) return "bg-green-500";
    if (currentStep.found !== undefined && currentStep.found === -1 && isDone)
      return "bg-red-500/60";
    if (currentStep.sorted?.includes(index)) return "bg-green-500";
    if (currentStep.comparing.includes(index)) return "bg-yellow-400";
    return "bg-blue-500";
  };

  const isSortAlgo = [
    "bubble-sort",
    "selection-sort",
    "insertion-sort",
    "merge-sort",
    "quick-sort",
  ].includes(selectedAlgorithm);

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Left Panel */}
        <div className="lg:col-span-1 space-y-4">
          <AlgorithmSelector
            value={selectedAlgorithm}
            onChange={setSelectedAlgorithm}
          />
          <DataInputPanel data={inputData} onChange={setInputData} />

          {/* Speed */}
          <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
            <label className="block text-sm font-semibold mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-400" /> Speed
            </label>
            <div className="flex gap-2">
              {(["slow", "medium", "fast"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={`flex-1 py-1.5 rounded text-sm capitalize transition ${speed === s ? "bg-blue-600 text-white" : "bg-slate-700 hover:bg-slate-600"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex gap-2">
            <button
              onClick={() => {
                if (isDone) reset();
                setIsRunning((r) => !r);
              }}
              className="flex-1 bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition"
            >
              {isRunning ? (
                <>
                  <Pause className="w-4 h-4" /> Pause
                </>
              ) : isDone ? (
                <>
                  <RotateCcw className="w-4 h-4" /> Restart
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" /> Start
                </>
              )}
            </button>
            <button
              onClick={reset}
              className="bg-slate-700 hover:bg-slate-600 px-4 py-3 rounded-lg transition"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Stats */}
          <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 text-sm space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-400">Steps</span>
              <span className="text-white font-mono">{stepCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Elements</span>
              <span className="text-white font-mono">
                {currentStep.array.length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Status</span>
              <span
                className={
                  isDone
                    ? "text-green-400"
                    : isRunning
                      ? "text-yellow-400"
                      : "text-slate-400"
                }
              >
                {isDone ? "✅ Done" : isRunning ? "▶ Running" : "⏸ Paused"}
              </span>
            </div>
          </div>
        </div>

        {/* Visualization */}
        <div className="lg:col-span-2">
          <div
            className="bg-slate-800 rounded-lg border border-slate-700 p-6"
            style={{ minHeight: "420px" }}
          >
            <h3 className="text-sm font-semibold text-slate-400 mb-4 uppercase tracking-wide">
              {selectedAlgorithm.replace(/-/g, " ")} —{" "}
              {isSortAlgo ? "Sorting" : "Searching"}
            </h3>

            {/* Bar Chart */}
            <div className="flex items-end justify-center gap-1 h-64">
              {currentStep.array.map((val, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-1 flex-1"
                >
                  <span className="text-xs text-slate-400">{val}</span>
                  <div
                    className={`w-full rounded-t transition-all duration-200 ${getBarColor(i)}`}
                    style={{ height: `${(val / maxVal) * 220}px` }}
                  />
                  <span className="text-xs text-slate-500">{i}</span>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex gap-4 mt-4 text-xs text-slate-400 flex-wrap">
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded bg-blue-500 inline-block" />{" "}
                Default
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded bg-yellow-400 inline-block" />{" "}
                Comparing
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded bg-green-500 inline-block" />{" "}
                {isSortAlgo ? "Sorted" : "Found"}
              </span>
            </div>

            {isDone && (
              <div className="mt-4 p-3 bg-green-900/20 border border-green-600 rounded text-green-400 text-sm text-center">
                ✅{" "}
                {isSortAlgo
                  ? "Array sorted successfully!"
                  : `Search complete in ${stepCount} steps`}
              </div>
            )}
          </div>
        </div>

        {/* AI Explainer */}
        <div className="lg:col-span-1">
          <AIExplainer algorithm={selectedAlgorithm} steps={[]} />
        </div>
      </div>
    </div>
  );
}
