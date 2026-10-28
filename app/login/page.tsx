'use client';
import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handle = async (mode: 'login' | 'signup') => {
    setMsg('Please wait...');
    try {
      if (mode === 'signup') await createUserWithEmailAndPassword(auth, email.trim(), password);
      else await signInWithEmailAndPassword(auth, email.trim(), password);
      window.location.href = '/';
    } catch (e: any) {
      setMsg(e.code + ' | ' + e.message);
      alert(e.code);
    }
  };

  return (
    <div style={{ maxWidth: 320, margin: '80px auto', display: 'grid', gap: 8 }}>
      <h2>To-Do Login</h2>
      <input placeholder="Email" autoComplete="off" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" autoComplete="new-password" placeholder="Password (min 6)" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={() => handle('login')}>Log in</button>
      <button onClick={() => handle('signup')}>Sign up</button>
      <p style={{ color: 'crimson' }}>{msg}</p>
    </div>
  );
}