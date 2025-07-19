import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import UserInputCPU from '../components/UserInputCPU';
import VisualizationCPU from '../components/VisualizationCPU';

export default function CPUScheduling() {
  const [selectedAlgo, setSelectedAlgo] = useState('');
  const [processes, setProcesses] = useState([]);
  const [scheduleSpeed, setScheduleSpeed] = useState(1000); // Delay in ms
  const [onStart,setOnStart] = useState(false);
  const [quantum, setQuantum] = useState(2);
  const [output, setOutput] = useState([]);
  const algorithmsArray = ['FCFS', 'SJF', 'SRTF', 'Round Robin', 'Priority Scheduling'];

  const handleFavorite = () => {
    alert('Marked as Favorite! (can integrate with DB later)');
  };

  return (
    <div style={{ height: '90vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Navbar
        algorithms={algorithmsArray}
        selectedAlgo={selectedAlgo}
        setSelectedAlgo={setSelectedAlgo}
        onFavorite={handleFavorite}
      />
      <div style={{ flex: 1, display: 'flex', backgroundColor: '#f4f4f4' }}>
        {/* Sidebar - User Input */}
        <div style={{ width: '280px', backgroundColor: '#fff', borderRight: '1px solid #ddd', padding: '20px' }}>
          <UserInputCPU
            processes={processes}
            setProcesses={setProcesses}
            scheduleSpeed={scheduleSpeed}
            setScheduleSpeed={setScheduleSpeed}
            onStart={onStart}
            setOnStart={setOnStart}
            selectedAlgo={selectedAlgo}
            quantum={quantum}
            setQuantum={setQuantum}
            output={output}
            setOutput={setOutput}
          />
        </div>

        {/* Visualization Area */}
        <div style={{ flex: 1, padding: '20px' }}>
          <VisualizationCPU
            processes={processes}
            selectedAlgo={selectedAlgo}
            scheduleSpeed={scheduleSpeed}
            onStart={onStart}
            setOnStart={setOnStart}
            quantum={quantum}
            setQuantum={setQuantum}
            output={output}
            setOutput={setOutput}
          />
        </div>
      </div>
    </div>
  );
}
