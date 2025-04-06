import React, { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import dijkstra from "../algorithms/Dijkstra";

const DynamicGrid = ({ isStartVisualise, setIsStartVisualise }) => {
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);
  const [gridMatrix, setGridMatrix] = useState([]);
  const [animatedVisits, setAnimatedVisits] = useState(new Set());
  const [animatedDistance, setAnimatedDistance] = useState(new Array());

  const start = [15, 25];
  const end = [20, 20];

  useEffect(() => {
    const cellSize = 25;
    setRows(Math.floor(window.innerHeight / cellSize));
    setCols(Math.floor(window.innerWidth / cellSize));
  }, []);

  useEffect(() => {
    setGridMatrix(
      Array.from({ length: rows }, (_, row) =>
        Array.from({ length: cols }, (_, col) => row + col)
      )
    );
  }, [rows, cols]);

  useEffect(() => {
    if (isStartVisualise) {
      handlePathFindingAlgorithms();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStartVisualise]);

  const delay = useCallback(
    (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
    []
  );

  const handlePathFindingAlgorithms = useCallback(() => {
    dijkstra(
      gridMatrix,
      start,
      end,
      setAnimatedVisits,
      setAnimatedDistance,
      delay
    );
    setIsStartVisualise(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStartVisualise]);

  // const handleOnClickCell = (row, col) => {
  // }

  return (
    <div
      className="grid w-full h-full p-8"
      style={{
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
      }}
    >
      {gridMatrix.map((rowArray, row) =>
        rowArray.map((_, col) => {
          const isVisited = animatedVisits.has(`${row}-${col}`);
          const isVisitedDistance = animatedDistance.some(
            (distance) => distance[0] === row && distance[1] === col
          );

          return (
            <div
              key={`${row}-${col}`}
              className={cn(
                "flex justify-center items-center border border-gray-400 transition-all duration-100",
                isVisited && "bg-amber-300",
                isVisitedDistance && "bg-green-300",
                row === start[0] && col === start[1] && "bg-blue-400",
                row === end[0] && col === end[1] && "bg-red-400"
              )}
              // onClick={() => handleOnClickCell(row, col)}
            />
          );
        })
      )}
    </div>
  );
};

export default DynamicGrid;
