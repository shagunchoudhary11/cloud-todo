'use client';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { addTask, toggleTask, editTask, deleteTask, watchTasks, Task } from '@/lib/tasks';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [text, setText] = useState('');

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => {
      if (!u) window.location.href = '/login';
      else { setUser(u); setReady(true); }
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!user) return;
    const unsub = watchTasks(user.uid, (t: Task[]) => setTasks(t));
    return () => unsub();
  }, [user]);

  if (!ready || !user) return <p>Loading...</p>;

  return (
    <main style={{ maxWidth: 480, margin: '40px auto', padding: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>My Tasks</h1>
        <button onClick={() => signOut(auth).then(() => (window.location.href = '/login'))}>Logout</button>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <input style={{ flex: 1 }} placeholder="New task" value={text} onChange={e => setText(e.target.value)} />
        <button onClick={async () => { if (!text.trim()) return; await addTask(user.uid, text.trim()); setText(''); }}>Add</button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map(t => (
          <li key={t.id} style={{ display: 'flex', gap: 8, padding: '8px 0', alignItems: 'center' }}>
            <input type="checkbox" checked={t.completed} onChange={() => toggleTask(user.uid, t.id, !t.completed)} />
            <span style={{ flex: 1, textDecoration: t.completed ? 'line-through' : 'none' }}>{t.title}</span>
            <button onClick={() => { const n = prompt('Edit task', t.title); if (n && n.trim()) editTask(user.uid, t.id, n.trim()); }}>Edit</button>
            <button onClick={() => deleteTask(user.uid, t.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </main>
  );
}