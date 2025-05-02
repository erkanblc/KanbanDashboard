import React from 'react';
import Card from './Card';
import { Droppable } from 'react-beautiful-dnd';

const priorityOrder = { high: 0, medium: 1, low: 2 };

const Column = ({ id, title, tasks, onStatusChange, onDelete, onEdit }) => {
  const sortedTasks = [...tasks].sort((a, b) => {
    const isInProgress = id === 'inProgress';
    if (isInProgress) {
      if (a.date !== b.date) return a.date.localeCompare(b.date || '');
      return a.title.localeCompare(b.title);
    } else {
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      if (a.date !== b.date) return a.date.localeCompare(b.date || '');
      return a.title.localeCompare(b.title);
    }
  });

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
            width: '300px',
            minHeight: '500px',
            transition: 'background-color 0.2s ease',
          }}
        >
          <h3 style={{ textAlign: 'center', marginBottom: '16px' }}>{title}</h3>
          <div style={{ minHeight: '100px' }}>
            {sortedTasks.map((task, index) => (
              <Card
                key={task.id}
                task={task}
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

export default Column;
