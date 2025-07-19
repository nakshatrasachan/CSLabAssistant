import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import UserInput from '../components/UserInput';
import Visualization from '../components/Visualization';

export default function Sorting() {
  const navigate = useNavigate();
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(10);
  const [sortingSpeed, setSortingSpeed] = useState(100);
  const [selectedAlgo, setSelectedAlgo] = useState('');
  const [onStart, setOnStart] = useState(false);
  const [cancelSort, setCancelSort] = useState(false);

  const handleFavorite = () => {
    alert('Marked as Favorite! (can integrate with DB later)');
  };

  const algorithmsarray = ['Selection Sort', 'Insertion Sort', 'Quick Sort', 'Bubble Sort', 'Merge Sort'];

  const generateNewArray = () => {
    const newArr = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 300) + 10);
    setArray(newArr);
  };

  useEffect(() => {
    generateNewArray();
    // eslint-disable-next-line
  }, [arraySize]);

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
        setCancelSort={setCancelSort}
        generateNewArray={generateNewArray}
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
          <UserInput
            arraySize={arraySize}
            setArraySize={setArraySize}
            sortingSpeed={sortingSpeed}
            setSortingSpeed={setSortingSpeed}
            onGenerateArray={generateNewArray}
            setOnStart={setOnStart}
            selectedAlgo={selectedAlgo}
          />
        </div>

        {/* Main Visualization Area */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: '20px',
          overflow: 'hidden',
          height: '400px'
        }}>
          <Visualization
            array={array}
            selectedAlgo={selectedAlgo}
            setArray={setArray}
            onStart={onStart}
            setOnStart={setOnStart}
            sortingSpeed={sortingSpeed}
            cancelSort={cancelSort}
            setCancelSort={setCancelSort}
          />
        </div>
      </div>
    </div>
  );
}
