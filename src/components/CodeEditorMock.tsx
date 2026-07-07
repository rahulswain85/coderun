const codeLines = [
  {
    num: 1,
    content: (
      <>
        <span className="text-purple-400">def</span>{" "}
        <span className="text-amber-300">two_sum</span>
        <span className="text-gray-300">(nums, target):</span>
      </>
    ),
  },
  {
    num: 2,
    content: (
      <>
        <span className="text-gray-500"> </span>
        <span className="text-gray-400"># Hash map for O(n) lookup</span>
      </>
    ),
  },
  {
    num: 3,
    content: (
      <>
        <span className="text-gray-500"> </span>
        <span className="text-blue-300">seen</span>{" "}
        <span className="text-pink-400">=</span>{" "}
        <span className="text-amber-300">{"{}"}</span>
      </>
    ),
  },
  {
    num: 4,
    content: (
      <>
        <span className="text-gray-500"> </span>
        <span className="text-purple-400">for</span>{" "}
        <span className="text-blue-300">i</span>
        <span className="text-gray-300">,</span>{" "}
        <span className="text-blue-300">num</span>{" "}
        <span className="text-purple-400">in</span>{" "}
        <span className="text-amber-300">enumerate</span>
        <span className="text-gray-300">(nums):</span>
      </>
    ),
  },
  {
    num: 5,
    content: (
      <>
        <span className="text-gray-500"> </span>
        <span className="text-blue-300">complement</span>{" "}
        <span className="text-pink-400">=</span>{" "}
        <span className="text-blue-300">target</span>{" "}
        <span className="text-pink-400">-</span>{" "}
        <span className="text-blue-300">num</span>
      </>
    ),
  },
  {
    num: 6,
    content: (
      <>
        <span className="text-gray-500"> </span>
        <span className="text-purple-400">if</span>{" "}
        <span className="text-blue-300">complement</span>{" "}
        <span className="text-purple-400">in</span>{" "}
        <span className="text-blue-300">seen</span>
        <span className="text-gray-300">:</span>
      </>
    ),
  },
  {
    num: 7,
    content: (
      <>
        <span className="text-gray-500"> </span>
        <span className="text-purple-400">return</span>{" "}
        <span className="text-gray-300">[</span>
        <span className="text-blue-300">seen</span>
        <span className="text-gray-300">[</span>
        <span className="text-blue-300">complement</span>
        <span className="text-gray-300">],</span>{" "}
        <span className="text-blue-300">i</span>
        <span className="text-gray-300">]</span>
      </>
    ),
  },
  {
    num: 8,
    content: (
      <>
        <span className="text-gray-500"> </span>
        <span className="text-blue-300">seen</span>
        <span className="text-gray-300">[</span>
        <span className="text-blue-300">num</span>
        <span className="text-gray-300">]</span>{" "}
        <span className="text-pink-400">=</span>{" "}
        <span className="text-blue-300">i</span>
      </>
    ),
  },
];

export const CodeEditorMockup = () => {
  return (
    <div
      className="relative w-full max-w-4xl p-16 pt-0 mx-auto"
      style={{ perspective: "1200px" }}
    >
      {/* Glow behind editor */}
      <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-amber-500/20 rounded-3xl blur-2xl opacity-60 dark:opacity-40" />

      <div className="relative bg-gray-900 dark:bg-gray-950 rounded-2xl shadow-2xl shadow-gray-900/30 dark:shadow-black/50 border border-gray-700/30 overflow-hidden">
        {/* Title bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-gray-800/80 dark:bg-gray-900/80 border-b border-gray-700/30">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-xs text-gray-500 font-medium code-line">
            two_sum.py
          </span>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-[10px] font-semibold bg-green-500/20 text-green-400 rounded-md border border-green-500/20">
              ✓ Accepted
            </span>
          </div>
        </div>

        {/* Code content */}
        <div className="px-4 py-4 overflow-x-auto">
          {codeLines.map((line, i) => (
            <div
              key={line.num}
              className="flex items-center gap-4 py-[3px] code-line text-[13px] leading-6"
            >
              <span className="text-gray-600 select-none w-4 text-right text-xs">
                {line.num}
              </span>
              <span>{line.content}</span>
            </div>
          ))}
          <div
            className="flex items-center gap-4 py-[3px] code-line text-[13px] leading-6"
          >
            <span className="text-gray-600 select-none w-4 text-right text-xs">
              9
            </span>
            <span className="w-[2px] h-4 bg-indigo-400 animate-blink" />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800/50 border-t border-gray-700/20">
          <div className="flex items-center gap-4">
            <span className="text-[10px] text-gray-500 code-line">
              Runtime: <span className="text-green-400">4ms</span>
            </span>
            <span className="text-[10px] text-gray-500 code-line">
              Memory: <span className="text-green-400">16.2 MB</span>
            </span>
          </div>
          <span className="text-[10px] text-gray-500 code-line">
            Beats 99.1%
          </span>
        </div>
      </div>
    </div>
  );
};
