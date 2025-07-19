import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import UserInputMemory from '../components/UserInputMemory';
import VisualizationMemory from '../components/VisualizationMemory';

export default function MemoryPaging() {
    const [selectedAlgo, setSelectedAlgo] = useState('');
    const [scheduleSpeed, setScheduleSpeed] = useState(1000);
    const [onStart, setOnStart] = useState(false);
    const [output, setOutput] = useState([]);
  
    const [pages, setPages] = useState([]);
    const [frameCount, setFrameCount] = useState(3);
  
    const algorithmsArray = ['FIFO', 'LRU', 'MRU', 'LFU'];
  
    return (
      <div style={{ height: '90vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar
          algorithms={algorithmsArray}
          selectedAlgo={selectedAlgo}
          setSelectedAlgo={setSelectedAlgo}
          onFavorite={() => alert("Marked as favorite")}
        />
  
        <div style={{ flex: 1, display: 'flex', backgroundColor: '#f4f4f4' }}>
          <div style={{ width: '280px', backgroundColor: '#fff', borderRight: '1px solid #ddd', padding: '20px' }}>
            <UserInputMemory
              pages={pages}
              setPages={setPages}
              frameCount={frameCount}
              setFrameCount={setFrameCount}
              scheduleSpeed={scheduleSpeed}
              setScheduleSpeed={setScheduleSpeed}
              onStart={onStart}
              setOnStart={setOnStart}
              output={output}
              setOutput={setOutput}
            />
          </div>
  
          <div style={{ flex: 1, padding: '20px' }}>
            <VisualizationMemory
              selectedAlgo={selectedAlgo}
              scheduleSpeed={scheduleSpeed}
              onStart={onStart}
              setOnStart={setOnStart}
              pages={pages}
              frameCount={frameCount}
              output={output}
              setOutput={setOutput}
            />
          </div>
        </div>
      </div>
    );
  }
  