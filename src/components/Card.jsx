import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';

const priorityColors = {
  low: 'lightgreen',
  medium: 'orange',
  high: 'red',
};

const Card = ({ task, index, onStatusChange, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTask, setEditTask] = useState(task);

  const handleSave = () => {
    onEdit(task.id, editTask);
    setIsEditing(false);
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            background: '#fff',
            padding: '12px',
            borderRadius: '6px',
            marginBottom: '10px',
            boxShadow: snapshot.isDragging ? '0 5px 10px rgba(0,0,0,0.2)' : '0 2px 5px rgba(0,0,0,0.1)',
            transform: snapshot.isDragging ? 'scale(1.02)' : 'none',
            transition: 'all 0.2s ease',
            ...provided.draggableProps.style
          }}
        >
          {isEditing ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <input
                value={editTask.title}
                onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
                style={{
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #ddd'
                }}
              />
              <input
                value={editTask.description}
                onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
                style={{
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #ddd'
                }}
              />
              <select
                value={editTask.priority}
                onChange={(e) => setEditTask({ ...editTask, priority: e.target.value })}
                style={{
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #ddd'
                }}
              >
                <option value="low">Düşük</option>
                <option value="medium">Orta</option>
                <option value="high">Yüksek</option>
              </select>
              <input
                type="date"
                value={editTask.date}
                onChange={(e) => setEditTask({ ...editTask, date: e.target.value })}
                style={{
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #ddd'
                }}
              />
              <button 
                onClick={handleSave}
                style={{
                  padding: '8px',
                  background: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Kaydet
              </button>
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ fontSize: '16px' }}>{task.title}</strong>
                <span style={{
                  backgroundColor: priorityColors[task.priority],
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  color: 'white',
                  fontWeight: 'bold'
                }}>
                  {task.priority.toUpperCase()}
                </span>
              </div>
              <p style={{ fontSize: '14px', margin: '8px 0' }}>{task.description}</p>
              {task.date && (
                <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
                  📅 {new Date(task.date).toLocaleDateString('tr-TR')}
                </p>
              )}
              <div style={{ marginTop: '8px' }}>
                <select
                  value={task.status}
                  onChange={(e) => onStatusChange(task.id, e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: '4px',
                    border: '1px solid #ddd',
                    background: '#f8f8f8'
                  }}
                >
                  <option value="todo">To Do</option>
                  <option value="inProgress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </div>
              <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
                <button 
                  onClick={() => setIsEditing(!isEditing)}
                  style={{
                    padding: '6px 12px',
                    background: '#2196F3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    flex: 1
                  }}
                >
                  {isEditing ? 'İptal' : 'Düzenle'}
                </button>
                <button 
                  onClick={() => onDelete(task.id)}
                  style={{
                    padding: '6px 12px',
                    background: '#f44336',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    flex: 1
                  }}
                >
                  Sil
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default Card;
