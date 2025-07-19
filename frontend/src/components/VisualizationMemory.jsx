import React, { useEffect, useState } from 'react';

export default function VisualizationMemory({
  selectedAlgo,
  scheduleSpeed,
  onStart,
  setOnStart,
  pages,
  frameCount,
  output,
  setOutput
}) {
  const [frames, setFrames] = useState([]);
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);

  useEffect(() => {
    if (onStart && pages.length && frameCount) {
      switch (selectedAlgo) {
        case 'FIFO': runFIFO(); break;
        case 'LRU': runLRU(); break;
        case 'MRU': runMRU(); break;
        case 'LFU': runLFU(); break;
        default: alert('Algorithm not implemented!');
      }
    }
    // eslint-disable-next-line
  }, [onStart]);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const runFIFO = async () => {
    const frameQueue = [];
    const seen = new Set();
    let hit = 0, miss = 0;

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];

      if (seen.has(page)) {
        hit++;
      } else {
        miss++;
        if (frameQueue.length === frameCount) {
          seen.delete(frameQueue.shift());
        }
        frameQueue.push(page);
        seen.add(page);
      }

      setFrames([...frameQueue]);
      setHits(hit);
      setMisses(miss);
      setOutput(prev => [...prev, { step: i + 1, page, frame: [...frameQueue], hit: seen.has(page) }]);
      await sleep(scheduleSpeed);
    }

    setOnStart(false);
  };

  const runLRU = async () => {
    const frameList = [];
    let hit = 0, miss = 0;

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      const index = frameList.indexOf(page);

      if (index !== -1) {
        frameList.splice(index, 1);
        hit++;
      } else {
        if (frameList.length === frameCount) frameList.shift();
        miss++;
      }

      frameList.push(page);

      setFrames([...frameList]);
      setHits(hit);
      setMisses(miss);
      setOutput(prev => [...prev, { step: i + 1, page, frame: [...frameList], hit: index !== -1 }]);
      await sleep(scheduleSpeed);
    }

    setOnStart(false);
  };

  const runMRU = async () => {
    const frameList = [];
    let hit = 0, miss = 0;

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      const index = frameList.indexOf(page);

      if (index !== -1) {
        frameList.splice(index, 1);
        hit++;
      } else {
        if (frameList.length === frameCount) frameList.pop();
        miss++;
      }

      frameList.push(page);

      setFrames([...frameList]);
      setHits(hit);
      setMisses(miss);
      setOutput(prev => [...prev, { step: i + 1, page, frame: [...frameList], hit: index !== -1 }]);
      await sleep(scheduleSpeed);
    }

    setOnStart(false);
  };

  const runLFU = async () => {
    const freq = {};
    const frameList = [];
    let hit = 0, miss = 0;

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      freq[page] = (freq[page] || 0) + 1;

      if (frameList.includes(page)) {
        hit++;
      } else {
        miss++;
        if (frameList.length === frameCount) {
          let minFreq = Math.min(...frameList.map(p => freq[p]));
          let toRemove = frameList.find(p => freq[p] === minFreq);
          frameList.splice(frameList.indexOf(toRemove), 1);
        }
        frameList.push(page);
      }

      setFrames([...frameList]);
      setHits(hit);
      setMisses(miss);
      setOutput(prev => [...prev, { step: i + 1, page, frame: [...frameList], hit: frameList.includes(page) }]);
      await sleep(scheduleSpeed);
    }

    setOnStart(false);
  };

  return (
    <div>
      <h3>{selectedAlgo} Visualization</h3>
      <p><strong>Page Hits:</strong> {hits} | <strong>Page Faults:</strong> {misses}</p>
      <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
        {frames.map((page, i) => (
          <div key={i} style={{ padding: '10px', border: '1px solid #999', borderRadius: '6px', backgroundColor: '#e0f7fa' }}>
            {page}
          </div>
        ))}
      </div>
    </div>
  );
}
