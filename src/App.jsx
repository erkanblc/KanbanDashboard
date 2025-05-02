import React, { useState } from 'react';
import Board from './components/Board';
import CarRepairBoard from './components/CarRepairBoard';

const App = () => {
  const [activeBoard, setActiveBoard] = useState('general');

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <nav style={{
        background: '#333',
        padding: '15px 20px',
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <button
          onClick={() => setActiveBoard('general')}
          style={{
            padding: '10px 20px',
            background: activeBoard === 'general' ? '#4CAF50' : '#666',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            transition: 'all 0.3s ease'
          }}
        >
          Genel Kanban
        </button>
        <button
          onClick={() => setActiveBoard('car')}
          style={{
            padding: '10px 20px',
            background: activeBoard === 'car' ? '#4CAF50' : '#666',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            transition: 'all 0.3s ease',
            border: '2px solid #4CAF50'
          }}
        >
          🚗 Araba Tamir Kanban
        </button>
      </nav>
      {activeBoard === 'general' ? <Board /> : <CarRepairBoard />}
    </div>
  );
};

export default App; 