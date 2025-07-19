import React, { useState } from 'react';

export default function UserInputCPU({
  processes,
  setProcesses,
  scheduleSpeed,
  setScheduleSpeed,
  onStart,
  setOnStart,
  selectedAlgo,
  quantum,
  setQuantum,
  output,
  setOutput,
}) {
  const [pid, setPid] = useState('');
  const [arrival, setArrival] = useState('');
  const [burst, setBurst] = useState('');
  const [priority, setPriority] = useState('1');

  const handleAddProcess = () => {
    if (pid && arrival !== '' && burst !== '' && priority !== '') {
      const newProcess = {
        pid,
        arrivalTime: parseInt(arrival),
        burstTime: parseInt(burst),
        priority: parseInt(priority),
      };
      setProcesses([...processes, newProcess]);
      setPid('');
      setArrival('');
      setBurst('');
      setPriority(1);
    }
  };

  const handleStart = () => {
    if (selectedAlgo) setOnStart(true);
  };

  const handleReset = () => {
    setProcesses([]);
    setOnStart(false);
    setOutput([]);
  };

  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      fontFamily: 'sans-serif'
    }}>
      <h3 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Input Processes</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          placeholder="PID"
          value={pid}
          onChange={(e) => setPid(e.target.value)}
          style={inputStyle}
        />
        <input
          placeholder="Arrival Time"
          type="number"
          value={arrival}
          onChange={(e) => setArrival(e.target.value)}
          style={inputStyle}
        />
        <input
          placeholder="Burst Time"
          type="number"
          value={burst}
          onChange={(e) => setBurst(e.target.value)}
          style={inputStyle}
        />
        <input
          placeholder="Priority"
          type="number"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          style={inputStyle}
        />

        <div style={{ marginTop: '10px' }}>
          <label style={labelStyle}>Schedule Speed (ms): </label>
          <input
            type="number"
            value={scheduleSpeed}
            onChange={(e) => setScheduleSpeed(Number(e.target.value))}
            min="1"
            max="1000"
            style={{ ...inputStyle, width: '100%' }}
          />
        </div>

        {selectedAlgo === 'Round Robin' && (
          <div>
            <label style={labelStyle}>Time Quantum: </label>
            <input
              type="number"
              value={quantum}
              onChange={(e) => setQuantum(Number(e.target.value))}
              min="1"
              style={inputStyle}
            />
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
          <button onClick={handleAddProcess} style={buttonStyle}>Add Process</button>
          <button onClick={handleStart} style={{ ...buttonStyle, backgroundColor: '#4caf50' }}>
            Start Scheduling
          </button>
          <button onClick={handleReset} style={{ ...buttonStyle, backgroundColor: '#f44336' }}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  padding: '6px 10px',
  fontSize: '12px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  outline: 'none',
};

const labelStyle = {
  fontWeight: 'bold',
  marginRight: '10px',
};

const buttonStyle = {
  padding: '6px 14px',
  fontSize: '14px',
  backgroundColor: '#2196f3',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};
