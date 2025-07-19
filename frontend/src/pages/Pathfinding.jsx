import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import UserInputPath from '../components/UserInputPath';
import VisualizationPath from '../components/VisualizationPath';

export default function Pathfinding() {
  const navigate = useNavigate();

  // 💡 Added essential state
  const [selectedAlgo, setSelectedAlgo] = useState('');
  const [graph, setGraph] = useState([]);
  const [rows, setRows] = useState(20);
  const [cols, setCols] = useState(40);
const [searchSpeed, setSearchSpeed] = useState(100);
    const [onStart,setOnStart] = useState(false);
  const algorithmsarray = ['BFS', 'DFS','Greedy Search Algorithm','A* Search Algorithm'];
 
  const handleFavorite = () => {
    alert('Marked as Favorite! (can integrate with DB later)');
  };

  // 🔄 Generate grid
  const generateNewGraph = () => {
    const newGrid = Array.from({ length: rows }, (_, row) =>
      Array.from({ length: cols }, (_, col) => ({
        row,
        col,
        isStart: row === 5 && col === 5,
        isEnd: row === 5 && col === 35,
        isWall: false,
        visited: false,
        distance: Infinity,
        previousNode: null
      }))
    );
    setGraph(newGrid);
  };

  useEffect(() => {
    generateNewGraph();
  }, [rows, cols]);

  return (
    <div style={{
      height: '90vh',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      fontFamily: 'sans-serif'
    }}>
      <Navbar
        algorithms={algorithmsarray}
        selectedAlgo={selectedAlgo}
        setSelectedAlgo={setSelectedAlgo}
        onFavorite={handleFavorite}
        generateNewGraph={generateNewGraph}
      />

      <div style={{
        flex: 1,
        display: 'flex',
        overflow: 'hidden',
        backgroundColor: '#f4f4f4',
        alignItems: 'center'
      }}>
        {/* Sidebar */}
        <div style={{
          width: '280px',
          backgroundColor: '#fff',
          borderRight: '1px solid #ddd',
          padding: '20px',
          overflowY: 'auto',
          boxShadow: '2px 0 5px rgba(0,0,0,0.05)'
        }}>
          <UserInputPath
            rows={rows}
            cols={cols}
            setRows={setRows}
            setCols={setCols}
            selectedAlgo={selectedAlgo}
            generateNewGraph={generateNewGraph}
            searchSpeed={searchSpeed}
            setSearchSpeed={setSearchSpeed}
            setOnStart={setOnStart}
          />
        </div>

        {/* Visualization Area */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: '20px',
          overflow: 'hidden'
        }}>
          <VisualizationPath
            graph={graph}
            setGraph={setGraph}
            rows={rows}
            cols={cols}
            selectedAlgo={selectedAlgo}
            searchSpeed={searchSpeed}
            onStart={onStart}
            setOnStart={setOnStart}
            />

        </div>
      </div>
    </div>
  );
}
