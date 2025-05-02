import React from 'react';
import CarRepairCard from './CarRepairCard';
import { Droppable } from 'react-beautiful-dnd';

const CarRepairColumn = ({ id, title, repairs, onStatusChange, onDelete, onEdit }) => {
  return (
    <Droppable droppableId={id}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{
            background: snapshot.isDraggingOver ? '#e0e0e0' : '#f1f1f1',
            borderRadius: '8px',
            padding: '16px',
            width: '350px',
            minHeight: '500px',
            transition: 'background-color 0.2s ease',
          }}
        >
          <h3 style={{ textAlign: 'center', marginBottom: '16px' }}>{title}</h3>
          <div style={{ minHeight: '100px' }}>
            {repairs.map((repair, index) => (
              <CarRepairCard
                key={repair.id}
                repair={repair}
                index={index}
                onStatusChange={onStatusChange}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default CarRepairColumn; 