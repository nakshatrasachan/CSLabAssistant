import React, { useState } from 'react';

export default function UserInputMemory({
  pages,
  setPages,
  frameCount,
  setFrameCount,
  scheduleSpeed,
  setScheduleSpeed,
  onStart,
  setOnStart,
  setOutput,
}) {
  const [pageInput, setPageInput] = useState('');

  const handleAddPages = () => {
    const parsedPages = pageInput.split(',').map((p) => parseInt(p.trim())).filter(p => !isNaN(p));
    setPages(parsedPages);
  };

  const handleStart = () => {
    if (pages.length && frameCount > 0) {
      setOnStart(true);
    } else {
      alert("Please provide both pages and frame count.");
    }
  };

  const handleReset = () => {
    setPages([]);
    setOnStart(false);
    setOutput([]);
    setPageInput('');
  };

  return (
    <div style={containerStyle}>
      <h3>Memory Paging Input</h3>
      <label>Pages (comma separated):</label>
      <input
        type="text"
        value={pageInput}
        onChange={(e) => setPageInput(e.target.value)}
        style={inputStyle}
      />
      <button onClick={handleAddPages} style={buttonStyle}>Add Pages</button>

      <label>Frame Count:</label>
      <input
        type="number"
        value={frameCount}
        onChange={(e) => setFrameCount(Number(e.target.value))}
        style={inputStyle}
        min="1"
      />

      <label>Speed (ms):</label>
      <input
        type="number"
        value={scheduleSpeed}
        onChange={(e) => setScheduleSpeed(Number(e.target.value))}
        style={inputStyle}
        min="100"
      />

      <div style={{ marginTop: '15px' }}>
        <button onClick={handleStart} style={{ ...buttonStyle, backgroundColor: '#4caf50' }}>Start</button>
        <button onClick={handleReset} style={{ ...buttonStyle, backgroundColor: '#f44336' }}>Reset</button>
      </div>
    </div>
  );
}

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};

const inputStyle = {
  padding: '5px',
  border: '1px solid #ccc',
  borderRadius: '4px',
};

const buttonStyle = {
  padding: '6px',
  marginTop: '5px',
  border: 'none',
  borderRadius: '4px',
  backgroundColor: '#2196f3',
  color: 'white',
  cursor: 'pointer',
};
