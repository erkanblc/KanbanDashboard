import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';

const priorityColors = {
  low: 'lightgreen',
  medium: 'orange',
  high: 'red',
};

const CarRepairCard = ({ repair, index, onStatusChange, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editRepair, setEditRepair] = useState(repair);

  const handleSave = () => {
    onEdit(repair.id, editRepair);
    setIsEditing(false);
  };

  return (
    <Draggable draggableId={repair.id} index={index}>
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
                value={editRepair.carModel}
                onChange={(e) => setEditRepair({ ...editRepair, carModel: e.target.value })}
                placeholder="Araç Modeli"
                style={{
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #ddd'
                }}
              />
              <input
                value={editRepair.licensePlate}
                onChange={(e) => setEditRepair({ ...editRepair, licensePlate: e.target.value })}
                placeholder="Plaka"
                style={{
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #ddd'
                }}
              />
              <input
                value={editRepair.customer}
                onChange={(e) => setEditRepair({ ...editRepair, customer: e.target.value })}
                placeholder="Müşteri Adı"
                style={{
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #ddd'
                }}
              />
              <input
                value={editRepair.phone}
                onChange={(e) => setEditRepair({ ...editRepair, phone: e.target.value })}
                placeholder="Telefon"
                style={{
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #ddd'
                }}
              />
              <input
                value={editRepair.problem}
                onChange={(e) => setEditRepair({ ...editRepair, problem: e.target.value })}
                placeholder="Arıza"
                style={{
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #ddd'
                }}
              />
              <select
                value={editRepair.priority}
                onChange={(e) => setEditRepair({ ...editRepair, priority: e.target.value })}
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
                value={editRepair.date}
                onChange={(e) => setEditRepair({ ...editRepair, date: e.target.value })}
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
                <strong style={{ fontSize: '16px' }}>{repair.carModel}</strong>
                <span style={{
                  backgroundColor: priorityColors[repair.priority],
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  color: 'white',
                  fontWeight: 'bold'
                }}>
                  {repair.priority.toUpperCase()}
                </span>
              </div>
              <p style={{ fontSize: '14px', margin: '8px 0' }}>
                <strong>Plaka:</strong> {repair.licensePlate}
              </p>
              <p style={{ fontSize: '14px', margin: '8px 0' }}>
                <strong>Müşteri:</strong> {repair.customer}
              </p>
              <p style={{ fontSize: '14px', margin: '8px 0' }}>
                <strong>Telefon:</strong> {repair.phone}
              </p>
              <p style={{ fontSize: '14px', margin: '8px 0' }}>
                <strong>Arıza:</strong> {repair.problem}
              </p>
              {repair.date && (
                <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
                  📅 {new Date(repair.date).toLocaleDateString('tr-TR')}
                </p>
              )}
              <div style={{ marginTop: '8px' }}>
                <select
                  value={repair.status}
                  onChange={(e) => onStatusChange(repair.id, e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: '4px',
                    border: '1px solid #ddd',
                    background: '#f8f8f8'
                  }}
                >
                  <option value="beklemede">Beklemede</option>
                  <option value="tamirde">Tamirde</option>
                  <option value="tamamlandı">Tamamlandı</option>
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
                  onClick={() => onDelete(repair.id)}
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

export default CarRepairCard; 