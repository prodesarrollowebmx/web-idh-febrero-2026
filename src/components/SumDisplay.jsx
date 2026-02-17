"use client";

import React from "react";
import { useSum } from "../context/SumContext";

export default function SumDisplay() {
  const { result, add, subtract } = useSum();
  return (
    <div className="mt-4 flex flex-col items-center gap-3">
      <div className="flex gap-3">
        <button
          onClick={() => add(2)}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Sumar 2
        </button>
        <button
          onClick={() => subtract(2)}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Restar 2
        </button>
      </div>
      <p className="text-lg text-center text-zinc-800 dark:text-zinc-200">
        Resultado: {result}
      </p>
    </div>
  );
}
