import React, { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import dijkstra from "../algorithms/Dijkstra";

const DynamicGrid = ({ isStartVisualise, setIsStartVisualise }) => {
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);
  const [gridMatrix, setGridMatrix] = useState([]);
  const [animatedVisits, setAnimatedVisits] = useState(new Set());
  const [animatedDistance, setAnimatedDistance] = useState(new Array());
  const [dragging, setDragging] = useState(null);
  const [start, setStart] = useState([15, 25]);
  const [end, setEnd] = useState([18, 28]);
  const cellSize = 25;

  useEffect(() => {
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

  const handleMouseDown = (type) => {
    setDragging(type);
  };

  const handleMouseUp = () => {
    setDragging(null);
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    console.log(e);
    const gridBounds = e.target.closest(".parent-grid").getBoundingClientRect();
    const x = Math.floor((e.clientX - gridBounds.left) / cellSize);
    const y = Math.floor((e.clientY - gridBounds.top) / cellSize);

    if (dragging == "start") {
      setStart([y, x]);
    } else if (dragging == "end") {
      setEnd([y, x]);
    }
  };

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

  return (
    <div
      className="parent-grid grid w-full h-full p-8"
      style={{
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {gridMatrix.map((rowArray, row) =>
        rowArray.map((_, col) => {
          const isVisited = animatedVisits.has(`${row}-${col}`);
          const isVisitedDistance = animatedDistance.some(
            (distance) => distance[0] === row && distance[1] === col
          );

          const isStart = row === start[0] && col === start[1];
          const isEnd = row === end[0] && col === end[1];

          return (
            <div
              key={`${row}-${col}`}
              className={cn(
                "flex justify-center items-center border border-gray-400 transition-all duration-100",
                isVisited && "bg-amber-300",
                isVisitedDistance && "bg-green-400",
                isStart && "bg-blue-500",
                isEnd && "bg-red-500"
              )}
              onMouseDown={() =>
                isStart
                  ? handleMouseDown("start")
                  : isEnd
                  ? handleMouseDown("end")
                  : null
              }
            />
          );
        })
      )}
    </div>
  );
};

export default DynamicGrid;
