import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import type { Todo } from './types';

const STORAGE_KEY = 'todos';

function makeId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [draft, setDraft] = useState('');
  const [ready, setReady] = useState(false);

  // Load saved todos once on start
  useEffect(() => {
    void (async () => {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (raw) {
        try {
          setTodos(JSON.parse(raw) as Todo[]);
        } catch {
          setTodos([]);
        }
      }
      setReady(true);
    })();
  }, []);

  // Save whenever the list changes (after first load)
  useEffect(() => {
    if (!ready) return;
    void AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos, ready]);

  const addTodo = useCallback(() => {
    const text = draft.trim();
    if (!text) return;

    setTodos((current) => [{ id: makeId(), text, done: false }, ...current]);
    setDraft('');
  }, [draft]);

  const toggleTodo = useCallback((id: string) => {
    setTodos((current) =>
      current.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)),
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos((current) => current.filter((todo) => todo.id !== id));
  }, []);

  const remaining = todos.filter((todo) => !todo.done).length;

  return {
    todos,
    draft,
    setDraft,
    remaining,
    addTodo,
    toggleTodo,
    deleteTodo,
  };
}
