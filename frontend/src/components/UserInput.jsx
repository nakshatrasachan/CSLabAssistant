import React from 'react';

export default function UserInput({
  arraySize,
  setArraySize,
  sortingSpeed,
  setSortingSpeed,
  onGenerateArray,
  setOnStart,
  selectedAlgo
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
      <h2 style={{ marginBottom: '16px', color: '#333' }}>Sorting Controls</h2>

      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>Array Size</label>
        <input
          type="number"
          value={arraySize}
          onChange={(e) => setArraySize(Number(e.target.value))}
          min="5"
          max="100"
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
        <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>Sorting Speed (ms delay)</label>
        <input
          type="number"
          value={sortingSpeed}
          onChange={(e) => setSortingSpeed(Number(e.target.value))}
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

      <button
        onClick={onGenerateArray}
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
        New Array
      </button>

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
        Start Sorting
      </button>
    </div>
  );
}
