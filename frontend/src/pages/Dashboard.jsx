import React from "react";
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  const topics = [
    { name: "Sorting Visualizer", path: "/visualize/sorting" },
    { name: "Pathfinding Algorithms", path: "/visualize/pathfinding" },
    { name: "Graph Traversal (BFS/DFS)", path: "/visualize/graph" },
    { name: "CPU Scheduling Algorithms", path: "/visualize/cpu-scheduling" },
    { name: "Memory Paging Algorithms", path: "/visualize/memory-paging" }
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>CS Lab Assistant</h1>
        <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
      </div>
      <p style={styles.subtitle}>Select a topic to visualize:</p>

      <div style={styles.grid}>
        {topics.map((topic, index) => (
          <div 
            key={index}
            onClick={() => handleNavigate(topic.path)}
            style={styles.card}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#e3f2fd"}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#ffffff"}
          >
            {topic.name}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '40px',
    fontFamily: 'Segoe UI, sans-serif',
    background: 'linear-gradient(to right, #dfe9f3, #ffffff)',
    minHeight: '100vh',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: '18px',
    marginBottom: '20px',
    color: '#555',
  },
  logoutButton: {
    padding: '10px 16px',
    fontSize: '14px',
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
  },
  card: {
    padding: '20px',
    borderRadius: '10px',
    border: '1px solid #ddd',
    textAlign: 'center',
    cursor: 'pointer',
    backgroundColor: '#fff',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    fontWeight: '500',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  },
};
