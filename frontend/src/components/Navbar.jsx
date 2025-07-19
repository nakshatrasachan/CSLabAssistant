import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ algorithms, selectedAlgo, setSelectedAlgo, onFavorite ,generateNewArray,generateNewGraph}) {
  const navigate = useNavigate();

  const handleBack = () => navigate('/dashboard');
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };
const handleAlgoSelect=(algo)=>{
  // setCancelSort(true); // signal cancel
  generateNewArray && generateNewArray();
  generateNewGraph && generateNewGraph();
  setSelectedAlgo(algo); // set new algorithm
  // setOnStart(false);
}
  return (
    <div style={{
      display: 'flex', 
      flexDirection: 'column',
      gap: '10px',
      paddingBottom: '10px',
      marginBottom: '20px',
      borderBottom: '1px solid lightgray'
    }}>
      {/* Top part */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>CS Lab Assistant</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={onFavorite}>⭐ Favorite</button>
          <button onClick={handleBack}>⬅️ Back</button>
          <button onClick={handleLogout}>🚪 Logout</button>
        </div>
      </div>

      {/* Algorithm selection */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {algorithms.map((algo, idx) => (
          <button 
            key={idx}
            onClick={()=>handleAlgoSelect(algo)}
            style={{
              backgroundColor: selectedAlgo === algo ? 'teal' : 'lightgray',
              color: selectedAlgo === algo ? 'white' : 'black',
              padding: '5px 10px',
              borderRadius: '5px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            {algo}
          </button>
        ))}
      </div>

      {/* Currently selected */}
      {selectedAlgo && (
        <p style={{ fontSize: '18px', color: 'teal', marginTop: '5px' }}>
          Visualizing: <strong>{selectedAlgo}</strong>
        </p>
      )}
    </div>
  );
}
