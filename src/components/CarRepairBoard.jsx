import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import CarRepairColumn from './CarRepairColumn';

const initialRepairs = [
  {
    id: '1',
    carModel: 'Toyota Corolla',
    licensePlate: '34 ABC 123',
    problem: 'Motor arızası',
    priority: 'high',
    date: '2024-03-15',
    status: 'beklemede',
    customer: 'Ahmet Yılmaz',
    phone: '0555 123 4567'
  },
  {
    id: '2',
    carModel: 'Honda Civic',
    licensePlate: '06 XYZ 789',
    problem: 'Fren sistemi bakımı',
    priority: 'medium',
    date: '2024-03-16',
    status: 'tamirde',
    customer: 'Mehmet Demir',
    phone: '0532 987 6543'
  },
  {
    id: '3',
    carModel: 'Volkswagen Golf',
    licensePlate: '35 DEF 456',
    problem: 'Yağ değişimi',
    priority: 'low',
    date: '2024-03-17',
    status: 'tamamlandı',
    customer: 'Ayşe Kaya',
    phone: '0541 234 5678'
  }
];

const CarRepairBoard = () => {
  const [repairs, setRepairs] = useState(initialRepairs);
  const [newRepair, setNewRepair] = useState({
    carModel: '',
    licensePlate: '',
    problem: '',
    priority: 'medium',
    date: '',
    status: 'beklemede',
    customer: '',
    phone: ''
  });
  const [showAddForm, setShowAddForm] = useState(false);

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceRepairs = repairs.filter(repair => repair.status === source.droppableId);
    const destRepairs = repairs.filter(repair => repair.status === destination.droppableId);
    
    const [movedRepair] = sourceRepairs.splice(source.index, 1);
    movedRepair.status = destination.droppableId;
    destRepairs.splice(destination.index, 0, movedRepair);

    const newRepairs = repairs.map(repair => {
      if (repair.status === source.droppableId) {
        return sourceRepairs.shift() || repair;
      }
      if (repair.status === destination.droppableId) {
        return destRepairs.shift() || repair;
      }
      return repair;
    });

    setRepairs(newRepairs);
  };

  const handleStatusChange = (repairId, newStatus) => {
    setRepairs(prev =>
      prev.map(repair =>
        repair.id === repairId ? { ...repair, status: newStatus } : repair
      )
    );
  };

  const handleDelete = (repairId) => {
    const confirm = window.confirm("Bu tamir kaydını silmek istediğinize emin misiniz?");
    if (confirm) {
      setRepairs(prev => prev.filter(repair => repair.id !== repairId));
    }
  };

  const handleEdit = (repairId, updatedRepair) => {
    setRepairs(prev =>
      prev.map(repair =>
        repair.id === repairId ? { ...repair, ...updatedRepair } : repair
      )
    );
  };

  const handleAddRepair = (e) => {
    e.preventDefault();
    const newRepairWithId = {
      ...newRepair,
      id: Date.now().toString()
    };
    setRepairs(prev => [...prev, newRepairWithId]);
    setNewRepair({
      carModel: '',
      licensePlate: '',
      problem: '',
      priority: 'medium',
      date: '',
      status: 'beklemede',
      customer: '',
      phone: ''
    });
    setShowAddForm(false);
  };

  const columns = [
    { id: 'beklemede', title: 'Beklemede' },
    { id: 'tamirde', title: 'Tamirde' },
    { id: 'tamamlandı', title: 'Tamamlandı' },
  ];

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          style={{
            padding: '10px 20px',
            background: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          {showAddForm ? 'Formu Kapat' : 'Yeni Tamir Kaydı Ekle'}
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddRepair} style={{
          background: '#fff',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          marginBottom: '20px',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Yeni Tamir Kaydı Ekle</h2>
          <div style={{ display: 'grid', gap: '10px', gridTemplateColumns: '1fr 1fr' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px' }}>Araç Modeli</label>
              <input
                type="text"
                value={newRepair.carModel}
                onChange={(e) => setNewRepair({ ...newRepair, carModel: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #ddd'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px' }}>Plaka</label>
              <input
                type="text"
                value={newRepair.licensePlate}
                onChange={(e) => setNewRepair({ ...newRepair, licensePlate: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #ddd'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px' }}>Arıza</label>
              <input
                type="text"
                value={newRepair.problem}
                onChange={(e) => setNewRepair({ ...newRepair, problem: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #ddd'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px' }}>Öncelik</label>
              <select
                value={newRepair.priority}
                onChange={(e) => setNewRepair({ ...newRepair, priority: e.target.value })}
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #ddd'
                }}
              >
                <option value="low">Düşük</option>
                <option value="medium">Orta</option>
                <option value="high">Yüksek</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px' }}>Tarih</label>
              <input
                type="date"
                value={newRepair.date}
                onChange={(e) => setNewRepair({ ...newRepair, date: e.target.value })}
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #ddd'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px' }}>Müşteri Adı</label>
              <input
                type="text"
                value={newRepair.customer}
                onChange={(e) => setNewRepair({ ...newRepair, customer: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #ddd'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px' }}>Telefon</label>
              <input
                type="text"
                value={newRepair.phone}
                onChange={(e) => setNewRepair({ ...newRepair, phone: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #ddd'
                }}
              />
            </div>
          </div>
          <button
            type="submit"
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              background: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'block',
              margin: '20px auto'
            }}
          >
            Tamir Kaydı Ekle
          </button>
        </form>
      )}

      <DragDropContext onDragEnd={handleDragEnd}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          {columns.map(col => (
            <CarRepairColumn
              key={col.id}
              id={col.id}
              title={col.title}
              repairs={repairs.filter(repair => repair.status === col.id)}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default CarRepairBoard; 