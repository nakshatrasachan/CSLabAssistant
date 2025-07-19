import React from 'react';

export default function UserInputPath({
  rows,cols,setRows,setCols,
  selectedAlgo,generateNewGraph,searchSpeed,
  setSearchSpeed,setOnStart
}) {
  const handleStart = () => {
    setOnStart(true);
  };

  return (
    <div
      style={{
        border: '1px solid #ddd',
        borderRadius: '12px',
        padding: '24px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
        margin : '60rm 0'
      }}
    >
      <h2 style={{ marginBottom: '16px', color: '#333' }}>Search Controls</h2>

      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>Rows</label>
        <input
          type="number"
          value={rows}
          onChange={(e) => setRows(Math.min(20, Math.max(5, Number(e.target.value))))}
          min="5"
          max="20"
          style={{
            width: '90%',
            padding: '8px 12px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            outline: 'none',
            fontSize: '14px'
          }}
        />
      </div>
     
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>Columns</label>
        <input
          type="number"
          value={cols}
          onChange={(e) => setCols(Math.min(56, Math.max(10, Number(e.target.value))))}
          min="10"
          max="56"
          style={{
            width: '90%',
            padding: '8px 12px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            outline: 'none',
            fontSize: '14px'
          }}
        />
      </div>
     

      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>Search Speed (ms delay)</label>
        <input
          type="number"
          value={searchSpeed}
          onChange={(e) => setSearchSpeed(Number(e.target.value))}
          min="10"
          max="1000"
          style={{
            width: '90%',
            padding: '8px 12px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            outline: 'none',
            fontSize: '14px'
          }}
        />
      </div>
{/* 
      <button
        onClick={generateNewGraph}
        style={{
          backgroundColor: '#0e7490',
          color: 'white',
          border: 'none',
          padding: '10px 16px',
          borderRadius: '8px',
          marginRight: '10px',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '14px',
          marginBottom: '2px'
        }}
      >
        New Graph
      </button> */}

      <button
        disabled={!selectedAlgo}
        onClick={handleStart}
        style={{
          backgroundColor: selectedAlgo ? '#15803d' : '#a1a1aa',
          color: 'white',
          border: 'none',
          padding: '10px 16px',
          borderRadius: '8px',
          cursor: selectedAlgo ? 'pointer' : 'not-allowed',
          fontWeight: 'bold',
          fontSize: '14px'
        }}
      >
        Start Searching
      </button>
    </div>
  );
}
