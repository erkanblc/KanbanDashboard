import React, { useState } from 'react';
import Column from './Column';
import { DragDropContext } from 'react-beautiful-dnd';

const initialTasks = [
  {
    id: '1',
    title: 'Tasarım toplantısı',
    description: 'UI/UX ekibi ile haftalık toplantı',
    priority: 'high',
    date: '2025-05-01',
    status: 'todo'
  },
  {
    id: '2',
    title: 'API bağlantısı kurulacak',
    description: 'Backend geliştirici ile endpointler test edilecek',
    priority: 'medium',
    date: '2025-05-03',
    status: 'inProgress'
  },
  {
    id: '3',
    title: 'Proje demosu',
    description: 'Yöneticiye sunum yapılacak',
    priority: 'low',
    date: '2025-05-05',
    status: 'done'
  },
];

const Board = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    date: '',
    status: 'todo'
  });
  const [showAddForm, setShowAddForm] = useState(false);

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceTasks = tasks.filter(task => task.status === source.droppableId);
    const destTasks = tasks.filter(task => task.status === destination.droppableId);
    
    const [movedTask] = sourceTasks.splice(source.index, 1);
    movedTask.status = destination.droppableId;
    destTasks.splice(destination.index, 0, movedTask);

    const newTasks = tasks.map(task => {
      if (task.status === source.droppableId) {
        return sourceTasks.shift() || task;
      }
      if (task.status === destination.droppableId) {
        return destTasks.shift() || task;
      }
      return task;
    });

    setTasks(newTasks);
  };

  const handleStatusChange = (taskId, newStatus) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const handleDelete = (taskId) => {
    const confirm = window.confirm("Bu görevi silmek istediğine emin misin?");
    if (confirm) {
      setTasks(prev => prev.filter(task => task.id !== taskId));
    }
  };

  const handleEdit = (taskId, updatedTask) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId ? { ...task, ...updatedTask } : task
      )
    );
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    const newTaskWithId = {
      ...newTask,
      id: Date.now().toString()
    };
    setTasks(prev => [...prev, newTaskWithId]);
    setNewTask({
      title: '',
      description: '',
      priority: 'medium',
      date: '',
      status: 'todo'
    });
    setShowAddForm(false);
  };

  const columns = [
    { id: 'todo', title: 'To Do' },
    { id: 'inProgress', title: 'In Progress' },
    { id: 'done', title: 'Done' },
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
          {showAddForm ? 'Formu Kapat' : 'Yeni Görev Ekle'}
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddTask} style={{
          background: '#fff',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          marginBottom: '20px',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Yeni Görev Ekle</h2>
          <div style={{ display: 'grid', gap: '10px', gridTemplateColumns: '1fr 1fr' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px' }}>Başlık</label>
              <input
                type="text"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
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
              <label style={{ display: 'block', marginBottom: '5px' }}>Açıklama</label>
              <input
                type="text"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
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
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
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
                value={newTask.date}
                onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
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
            Görev Ekle
          </button>
        </form>
      )}

      <DragDropContext onDragEnd={handleDragEnd}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          {columns.map(col => (
            <Column
              key={col.id}
              id={col.id}
              title={col.title}
              tasks={tasks.filter(task => task.status === col.id)}
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

export default Board;
