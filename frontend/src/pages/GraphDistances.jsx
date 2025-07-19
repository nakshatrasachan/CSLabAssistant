import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import UserInputGraph from '../components/UserInputGraph';
import VisualizationGraph from '../components/VisualizationGraph';

export default function GraphDistances() {
  const navigate = useNavigate();

  // State management
  const [selectedAlgo, setSelectedAlgo] = useState('');
  const [nodes, setNodes] = useState([]); // Graph nodes
  const [edges, setEdges] = useState([]); // Graph edges
  const [searchSpeed, setSearchSpeed] = useState(1000); // Speed for algorithm visualization
  const [startNode, setStartNode] = useState('');
  const algorithmsArray = ["Dijkstra's Algorithm"]; // Supported algorithms

  const handleFavorite = () => {
    alert('Marked as Favorite! (can integrate with DB later)');
  };

  // Generate graph from user input
  const generateNewGraph = (newNodes, newEdges) => {
    setNodes(newNodes);
    setEdges(newEdges);
  };

  return (
    <div style={{ height: '90vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Navbar
        algorithms={algorithmsArray}
        selectedAlgo={selectedAlgo}
        setSelectedAlgo={setSelectedAlgo}
        onFavorite={handleFavorite}
      />
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', backgroundColor: '#f4f4f4', alignItems: 'center' }}>
        {/* Sidebar - User Input */}
        <div style={{ width: '280px', backgroundColor: '#fff', borderRight: '1px solid #ddd', padding: '20px' }}>
          <UserInputGraph 
            nodes={nodes}
            setNodes={setNodes}
            edges={edges}
            setEdges={setEdges}
            generateNewGraph={generateNewGraph} 
            startNode={startNode}
            setStartNode={setStartNode} 
            searchSpeed={searchSpeed}
            setSearchSpeed={setSearchSpeed} 
          />
        </div>
        {/* Visualization Area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px', overflow: 'hidden' }}>
          <VisualizationGraph 
            nodes={nodes} 
            edges={edges} 
            startNode={startNode}
            searchSpeed={searchSpeed} 
            setNodes={setNodes}
            setEdges={setEdges}
          />
        </div>
      </div>
    </div>
  );
}
