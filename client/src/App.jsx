import React from "react";

const App = () => {
  return (
    <div className="h-screen w-full bg-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-6xl font-black text-white">React + Vite Project</h1>
        <p className="text-gray-300">
          This was an automation script written by{" "}
          <span className="text-white tracking-wider">PRABANJAN</span>
        </p>
        <p className="text-sm text-gray-400">
          Follow more on Github:{" "}
          <a href="https://github.com/prabasjani" className="text-gray-300">
            github.com/prabasjani
          </a>
        </p>
      </div>
    </div>
  );
};

export default App;
