import { db } from '@/lib/firebase';
import {
  addDoc, collection, deleteDoc, doc, onSnapshot,
  orderBy, query, serverTimestamp, updateDoc,
} from 'firebase/firestore';

export type Task = { id: string; title: string; completed: boolean };

const col = (uid: string) => collection(db, `users/${uid}/tasks`);

export const addTask = (uid: string, title: string) =>
  addDoc(col(uid), { title, completed: false, createdAt: serverTimestamp() });

export const editTask = (uid: string, id: string, title: string) =>
  updateDoc(doc(db, `users/${uid}/tasks/${id}`), { title });

export const toggleTask = (uid: string, id: string, completed: boolean) =>
  updateDoc(doc(db, `users/${uid}/tasks/${id}`), { completed });

export const deleteTask = (uid: string, id: string) =>
  deleteDoc(doc(db, `users/${uid}/tasks/${id}`));

export const watchTasks = (uid: string, cb: (t: Task[]) => void) =>
  onSnapshot(query(col(uid), orderBy('createdAt', 'desc')), snap =>
    cb(snap.docs.map(d => ({ id: d.id, ...(d.data() as Omit<Task, 'id'>) })))
  );