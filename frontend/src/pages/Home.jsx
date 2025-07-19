import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h1 style={styles.title}>Welcome to <span style={{ color: '#1976d2' }}>CS Lab Assistant</span></h1>
        <p style={styles.tagline}>
          Your personal interactive portal to master core Computer Science concepts through visualization.
        </p>

        <div style={styles.buttonContainer}>
          <button onClick={handleLogin} style={styles.buttonLogin}>Login</button>
          <button onClick={handleSignup} style={styles.buttonSignup}>Sign Up</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    background: 'linear-gradient(to right, #e3f2fd, #ffffff)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Segoe UI, sans-serif',
    padding: '20px',
  },
  box: {
    textAlign: 'center',
    backgroundColor: '#fff',
    padding: '50px',
    borderRadius: '12px',
    boxShadow: '0 6px 18px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    width: '100%',
  },
  title: {
    fontSize: '36px',
    marginBottom: '15px',
    color: '#333',
  },
  tagline: {
    fontSize: '18px',
    color: '#555',
    marginBottom: '30px',
    lineHeight: '1.5',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
  },
  buttonLogin: {
    padding: '12px 28px',
    fontSize: '16px',
    backgroundColor: '#1976d2',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  buttonSignup: {
    padding: '12px 28px',
    fontSize: '16px',
    backgroundColor: '#4caf50',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};
