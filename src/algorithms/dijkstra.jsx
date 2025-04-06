const dijkstra = async (
  grid,
  start,
  end,
  setAnimatedVisits,
  setAnimatedDistance,
  delay
) => {
  const rows = grid.length;
  const cols = grid[0].length;

  const distances = Array.from({ length: rows }, () =>
    Array(cols).fill(Infinity)
  );
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  const previous = Array.from({ length: rows }, () => Array(cols).fill(null));
  const priorityQueue = [[start[0], start[1], 0]];
  const neighbours = [
    [-1, 0], // Top
    [1, 0], // Bottom
    [0, -1], // Left
    [0, 1], // Right
  ];

  distances[start[0]][start[1]] = 0;

  while (priorityQueue.length > 0) {
    priorityQueue.sort((a, b) => a[2] - b[2]);

    const [currRow, currCol, currDistance] = priorityQueue.shift();

    if (visited[currRow][currCol]) continue;
    visited[currRow][currCol] = true;

    setAnimatedVisits((prevVisits) =>
      new Set(prevVisits).add(`${currRow}-${currCol}`)
    );

    await delay(80);

    if (currRow === end[0] && currCol === end[1]) {
      const backtracePath = [];
      let [traceRow, traceCol] = end;

      while (previous[traceRow][traceCol]) {
        backtracePath.push([traceRow, traceCol]);
        [traceRow, traceCol] = previous[traceRow][traceCol];
      }

      backtracePath.push(start);
      backtracePath.reverse();
      setAnimatedDistance(backtracePath);
      return currDistance;
    }

    for (const [dr, dc] of neighbours) {
      const newRow = currRow + dr;
      const newCol = currCol + dc;

      if (
        newRow >= 0 &&
        newCol >= 0 &&
        newRow < rows &&
        newCol < cols &&
        !visited[newRow][newCol]
      ) {
        const newDistance = currDistance + grid[newRow][newCol];

        if (newDistance < distances[newRow][newCol]) {
          distances[newRow][newCol] = newDistance;
          previous[newRow][newCol] = [currRow, currCol];
          priorityQueue.push([newRow, newCol, newDistance]);
        }
      }
    }
  }

  return -1;
};

export default dijkstra;
