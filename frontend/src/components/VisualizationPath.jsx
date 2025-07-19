import React, { useEffect } from 'react';

export default function VisualizationPath({ graph,setGraph, rows, cols, selectedAlgo, searchSpeed, onStart,setOnStart }) {
  useEffect(() => {
    if (onStart) {
      if (selectedAlgo === "BFS") {
        runBFS();
      } else if (selectedAlgo === "DFS") {
        runDFS();
      }else if (selectedAlgo === "A* Search Algorithm") {
        runAstar();
      }else if (selectedAlgo === "Greedy Search Algorithm") {
        runGreedy();
      } else {
        alert("Pathfinding algorithm not implemented yet!");
      }
    }
    // eslint-disable-next-line
  }, [onStart]);
 // 🚀 Handle wall, start, end setting
 const handleCellClick = (node) => {
    const newGraph = [...graph];
    const { row, col } = node;
    if (node.isStart || node.isEnd) return;

    newGraph[row][col].isWall = !newGraph[row][col].isWall;
    setGraph(newGraph);
  };

  const handleRightClick = (e, node) => {
    e.preventDefault();
    const { row, col } = node;
  
    const newGraph = graph.map(r => r.map(n => ({ ...n })));
  
    if (e.shiftKey) {
      // Set END node
      for (let r of newGraph) {
        for (let n of r) {
          if (n.isEnd) n.isEnd = false;
        }
      }
      newGraph[row][col].isEnd = true;
    } else {
      // Set START node
      for (let r of newGraph) {
        for (let n of r) {
          if (n.isStart) n.isStart = false;
        }
      }
      newGraph[row][col].isStart = true;
    }
  
    setGraph(newGraph);
  };
  
  const getNeighbors = (node, grid) => {
    const { row, col } = node;
    const neighbors = [];
  
    if (row > 0) neighbors.push(grid[row - 1][col]);     // up
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]); // down
    if (col > 0) neighbors.push(grid[row][col - 1]);     // left
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]); // right
  
    return neighbors;
  }
  const heuristic=(a, b)=> {
    return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
  }
  const reconstructPath = (endNode, newGraph) => {
    let current = endNode;
    while (current.previousNode) {
      const { row, col } = current;
      newGraph[row][col].isPath = true;
      current = current.previousNode;
    }
    setGraph([...newGraph]);
  }
  
  //BFS 
  async function runBFS() {
    const newGraph = [...graph];
    const queue = [];
    const visited = new Set();
  
    let startNode, endNode;
    for (let row of newGraph) {
      for (let node of row) {
        if (node.isStart) startNode = node;
        if (node.isEnd) endNode = node;
      }
    }
  
    if (!startNode || !endNode) return;
  
    queue.push(startNode);
    visited.add(`${startNode.row}-${startNode.col}`);
  
    while (queue.length > 0) {
      const current = queue.shift();
      const { row, col } = current;
  
      if (current !== startNode && current !== endNode) {
        newGraph[row][col].visited = true;
        setGraph([...newGraph]);
        await sleep(searchSpeed);
      }
  
      if (current === endNode) break;
  
      for (let neighbor of getNeighbors(current, newGraph)) {
        const key = `${neighbor.row}-${neighbor.col}`;
        if (!visited.has(key) && !neighbor.isWall) {
          visited.add(key);
          neighbor.previousNode = current;
          queue.push(neighbor);
        }
      }
    }
    setOnStart(false);
  }

  //DFS
  async function runDFS() {
    const newGraph = [...graph];
    const stack = [];
    const visited = new Set();
  
    let startNode, endNode;
    for (let row of newGraph) {
      for (let node of row) {
        if (node.isStart) startNode = node;
        if (node.isEnd) endNode = node;
      }
    }
  
    if (!startNode || !endNode) return;
  
    stack.push(startNode);
  
    while (stack.length > 0) {
      const current = stack.pop();
      const key = `${current.row}-${current.col}`;
  
      if (visited.has(key)) continue;
      visited.add(key);
  
      const { row, col } = current;
      if (current !== startNode && current !== endNode) {
        newGraph[row][col].visited = true;
        setGraph([...newGraph]);
        await sleep(searchSpeed);
      }
  
      if (current === endNode) break;
  
      for (let neighbor of getNeighbors(current, newGraph)) {
        const neighborKey = `${neighbor.row}-${neighbor.col}`;
        if (!visited.has(neighborKey) && !neighbor.isWall) {
          neighbor.previousNode = current;
          stack.push(neighbor);
        }
      }
    }
    setOnStart(false);
  }
  //Greedy Search
  async function runGreedy() {
    const newGraph = [...graph];
    let startNode, endNode;
  
     // Set start and end nodes
  for (let row of newGraph) {
    for (let node of row) {
      if (node.isStart) {
        startNode = node;
        
      }
      if (node.isEnd) {
        endNode = node;
      }
    }
  }

  if (!startNode || !endNode) return;

  // Now calculate heuristic for the start node after both are initialized
  startNode.f = heuristic(startNode, endNode); // f = h

  
    const openSet = [startNode];
    const closedSet = [];
  
    while (openSet.length > 0) {
      openSet.sort((a, b) => a.f - b.f);
      const current = openSet.shift();
  
      if (current === endNode) {
        reconstructPath(current, newGraph);
        setOnStart(false);
        return;
      }
  
      const { row, col } = current;
      if (current !== startNode && current !== endNode) {
        newGraph[row][col].visited = true;
        setGraph([...newGraph]);
        await sleep(searchSpeed);
      }
  
      closedSet.push(current);
  
      for (let neighbor of getNeighbors(current, newGraph)) {
        if (closedSet.includes(neighbor) || neighbor.isWall) continue;
      
  
        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor);
        } 
  
        neighbor.previousNode = current;
        neighbor.f = heuristic(neighbor, endNode);
      }
    }
    
  }
  //A*
  async function runAstar() {
    const newGraph = [...graph];
    let startNode, endNode;
  
      // Set start and end nodes
  for (let row of newGraph) {
    for (let node of row) {
      if (node.isStart) {
        startNode = node;
        startNode.g = 0; // g is 0 for the start node
      }
      if (node.isEnd) {
        endNode = node;
      }
    }
  }

  if (!startNode || !endNode) return;

  // Now calculate heuristic for the start node after both are initialized
  startNode.f = startNode.g + heuristic(startNode, endNode); // f = g + h

  
    const openSet = [startNode];
    const closedSet = [];
  
    while (openSet.length > 0) {
      openSet.sort((a, b) => a.f - b.f);
      const current = openSet.shift();
  
      if (current === endNode) {
        reconstructPath(current, newGraph);
        setOnStart(false);
        return;
      }
  
      const { row, col } = current;
      if (current !== startNode && current !== endNode) {
        newGraph[row][col].visited = true;
        setGraph([...newGraph]);
        await sleep(searchSpeed);
      }
  
      closedSet.push(current);
  
      for (let neighbor of getNeighbors(current, newGraph)) {
        if (closedSet.includes(neighbor) || neighbor.isWall) continue;
  
        const tentativeG = current.g + 1;
  
        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor);
        } else if (tentativeG >= neighbor.g) {
          continue;
        }
  
        neighbor.previousNode = current;
        neighbor.g = tentativeG;
        neighbor.f = neighbor.g + heuristic(neighbor, endNode);
      }
    }
    
  }
  
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${cols}, 20px)`,
      gridTemplateRows: `repeat(${rows}, 20px)`,
      gap: '1px',
    }}>
      {graph.map((row, rowIndex) =>
        row.map((node, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            style={{
              width: '20px',
              height: '20px',
              backgroundColor: node.isStart
                ? 'green'
                : node.isEnd
                ? 'red'
                : node.isWall
                ? '#333'
                : node.visited
                ? '#87cefa'
                : 'white',
              border: '1px solid #ccc',
              cursor: 'pointer'
            }}
            onClick={() => handleCellClick(node)}
            onContextMenu={(e) => handleRightClick(e, node)}
          />
        ))
      )}
    </div>
  );
}
 