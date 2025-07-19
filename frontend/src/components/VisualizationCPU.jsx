import React, { useEffect, useState } from 'react';
import '../styles/gantt.css';

export default function VisualizationCPU({ processes, selectedAlgo, scheduleSpeed, onStart, setOnStart,quantum,setQuantum,output,setOutput }) {


  useEffect(() => {
    if (!onStart || !processes.length || !selectedAlgo) return;

    switch (selectedAlgo) {
      case 'FCFS':
        runFCFS();
        break;
      case 'SJF':
        runSJF();
        break;
      case 'SRTF':
        runSRTF();
        break;
      case 'Priority Scheduling':
        runPriority();
        break;
      case 'Round Robin':
        runRoundRobin(quantum); // default time quantum
        break;
      default:
        alert('Algorithm not implemented yet!');
        setOnStart(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onStart]);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const runFCFS = async () => {
    const sorted = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
    let time = 0;
    const result = [];

    for (const p of sorted) {
      if (time < p.arrivalTime) time = p.arrivalTime;
      const startTime = time;
      const endTime = time + p.burstTime;

      result.push({ ...p, startTime, endTime });
      setOutput([...result]);
      await sleep(scheduleSpeed);
      time = endTime;
    }

    setOnStart(false);
  };

  const runSJF = async () => {
    const processesCopy = [...processes];
    const result = [];
    let time = 0;
    const readyQueue = [];

    while (processesCopy.length || readyQueue.length) {
      while (processesCopy.length && processesCopy[0].arrivalTime <= time) {
        readyQueue.push(processesCopy.shift());
      }

      if (readyQueue.length === 0) {
        time = processesCopy[0].arrivalTime;
        continue;
      }

      readyQueue.sort((a, b) => a.burstTime - b.burstTime);
      const current = readyQueue.shift();

      const startTime = time;
      const endTime = time + current.burstTime;

      result.push({ ...current, startTime, endTime });
      setOutput([...result]);
      await sleep(scheduleSpeed);
      time = endTime;
    }

    setOnStart(false);
  };
//   const runSRTF = async() => {
//     const queue = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
//     const readyQueue = [];
//     const result = [];
//     let time = 0;

//     const remainingTimes = {};
//     queue.forEach((p) => {
//       remainingTimes[p.pid] = p.burstTime;
//     });

//     while(queue.length > 0 || readyQueue.length > 0){
//         while(queue && queue[0].arrivalTime<=time){
//             readyQueue.push(queue[0]);
//             queue.shift();
//         }
//         if(readyQueue.length===0){
//             time = queue[0].arrivalTime;
//             continue;
//         }
//         readyQueue.sort((a,b)=>remainingTimes[a.pid]-remainingTimes[b.pid]);
//         let startTime=time;
//         while(time<queue[0].arrivalTime){
//             time++;
//             remainingTimes[readyQueue[0].pid]--;
//             if(remainingTimes[readyQueue[0].pid]===0){
//                 readyQueue.shift();
//             }
//         }
//         let endTime=time;
//         result.push([...readyQueue[0]],startTime,endTime);
//         setOutput([...result]);
//         await sleep(scheduleSpeed);
//     }
// }
const runSRTF = async () => {
    const queue = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
    const readyQueue = [];
    const result = [];
    const remainingTimes = {};
    const isStarted = {};
    const startTimes = {};
  
    queue.forEach((p) => {
      remainingTimes[p.pid] = p.burstTime;
      isStarted[p.pid] = false;
    });
  
    let time = 0;
    let currentProcess = null;
  
    while (queue.length > 0 || readyQueue.length > 0 || currentProcess) {
      // Move arrived processes to readyQueue
      while (queue.length > 0 && queue[0].arrivalTime <= time) {
        readyQueue.push(queue.shift());
      }
  
      if (currentProcess && remainingTimes[currentProcess.pid] === 0) {
        // If current process finished
        result.push({
          pid: currentProcess.pid,
          startTime: startTimes[currentProcess.pid],
          endTime: time,
        });
        currentProcess = null;
      }
  
      if (!currentProcess && readyQueue.length > 0) {
        // Pick the one with least remaining time
        readyQueue.sort((a, b) => remainingTimes[a.pid] - remainingTimes[b.pid]);
        currentProcess = readyQueue.shift();
  
        if (!isStarted[currentProcess.pid]) {
          startTimes[currentProcess.pid] = time;
          isStarted[currentProcess.pid] = true;
        }
      }
  
      if (currentProcess) {
        remainingTimes[currentProcess.pid]--;
        time++;
        setOutput([...result, {
          pid: currentProcess.pid,
          startTime: startTimes[currentProcess.pid],
          endTime: time
        }]); // Partial update for visualization
        await sleep(scheduleSpeed);
      } else {
        time++; // Idle time
      }
    }
  
    setOnStart(false);
  };
  
  const runPriority = async () => {
    const processesCopy = [...processes];
    const result = [];
    let time = 0;
    const readyQueue = [];

    while (processesCopy.length || readyQueue.length) {
      while (processesCopy.length && processesCopy[0].arrivalTime <= time) {
        readyQueue.push(processesCopy.shift());
      }

      if (readyQueue.length === 0) {
        time = processesCopy[0].arrivalTime;
        continue;
      }

      readyQueue.sort((a, b) => a.priority - b.priority);
      const current = readyQueue.shift();

      const startTime = time;
      const endTime = time + current.burstTime;

      result.push({ ...current, startTime, endTime });
      setOutput([...result]);
      await sleep(scheduleSpeed);
      time = endTime;
    }

    setOnStart(false);
  };

  const runRoundRobin = async (quantum) => {
    const queue = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
    const readyQueue = [];
    const result = [];
    let time = 0;

    const remainingTimes = {};
    queue.forEach((p) => {
      remainingTimes[p.pid] = p.burstTime;
    });

    while (queue.length || readyQueue.length) {
      while (queue.length && queue[0].arrivalTime <= time) {
        readyQueue.push(queue.shift());
      }

      if (readyQueue.length === 0) {
        time = queue[0].arrivalTime;
        continue;
      }

      const current = readyQueue.shift();
      const runTime = Math.min(quantum, remainingTimes[current.pid]);
      const startTime = time;
      const endTime = time + runTime;

      result.push({ ...current, startTime, endTime });
      setOutput([...result]);
      await sleep(scheduleSpeed);

      remainingTimes[current.pid] -= runTime;
      time = endTime;

      if (remainingTimes[current.pid] > 0) {
        while (queue.length && queue[0].arrivalTime <= time) {
          readyQueue.push(queue.shift());
        }
        readyQueue.push(current);
      }
    }

    setOnStart(false);
  };

  return (
    <div>
      <h3>{selectedAlgo} Gantt Chart</h3>
      <h4>Process List</h4>
      <ul>
        {processes.map((p, i) => (
          <li key={i}>
            <strong>{p.pid}</strong>: Arrival = {p.arrivalTime}, Burst = {p.burstTime}, Priority = {p.priority}
          </li>
        ))}
      </ul>
      <div className="gantt-container">
        {output.map((p, i) => (
          <div
            key={i}
            className="gantt-block"
            style={{ width: `${(p.endTime - p.startTime) * 30}px` }}
          >
            <span className="gantt-label">{p.pid}</span>
            <span className="gantt-time start">{p.startTime}</span>
            <span className="gantt-time end">{p.endTime}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
