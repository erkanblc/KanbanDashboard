import React from 'react';
import Board from './components/Board';
import CarRepairBoard from './components/CarRepairBoard';
function App() {
  return (
    <div className="App">
      <h1 style={{ textAlign: 'center' }}>🟢 Kanban Board </h1>
      <Board />
      {/*  <CarRepairBoard /> */}
    </div>
  );
}

export default App;
