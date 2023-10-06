import React, { useState, useEffect } from 'react';
import * as C from './App.styles';
import { Item } from './types/Item';
import { ListItem } from './components/ListItem';
import { AddArea } from './components/AddArea';

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, doc, updateDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyANkosBw7VHRum9pewUMXuozHNWjUOOzUk",
  authDomain: "task-list-p3.firebaseapp.com",
  projectId: "task-list-p3",
};

const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);

const saveTaskToFirestore = async (task: Item) => {
  try {
    const docRef = await addDoc(collection(firestore, 'tasks'), task);
    console.log('Tarefa adicionada com ID:', docRef.id);
    return docRef.id; // Retorna o ID gerado pelo Firestore
  } catch (error) {
    console.error('Erro ao adicionar tarefa:', error);
    throw new Error('Erro ao adicionar tarefa');
  }
};

const updateTaskInFirestore = async (id: string, done: boolean, newName?: string) => {
  const taskRef = doc(firestore, 'tasks', id);
  const updates: { [key: string]: any } = { done };
  if (newName) {
    updates.name = newName;
  }
  await updateDoc(taskRef, updates);
};

const App = () => {
  const [list, setList] = useState<Item[]>([]);
  const [completedList, setCompletedList] = useState<Item[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const taskCollection = collection(firestore, 'tasks');
      const snapshot = await taskCollection.get();
      const tasks: Item[] = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setList(tasks.filter((task) => task.category === 'to-do'));
      setCompletedList(tasks.filter((task) => task.category === 'completed'));
    };

    fetchData();
  }, []);

  const handleAddTask = async (taskName: string) => {
    const newTask: Item = {
      name: taskName,
      done: false,
      category: 'to-do',
      priority: list.length + 1,
    };

    try {
      const docId = await saveTaskToFirestore(newTask);
      setList((prevList) => [...prevList, { ...newTask, id: docId }]);
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
    }
  };

  const handleTaskChange = async (id: string, done: boolean, newName?: string) => {
    setList((prevList) => {
      return prevList.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, done, category: done ? 'completed' : 'to-do' };
          return updatedItem;
        }
        return item;
      });
    });

    if (done) {
      setCompletedList((prevCompletedList) => [...prevCompletedList, list.find((item) => item.id === id)]);
      setList((prevList) => prevList.filter((item) => item.id !== id));
    }

    try {
      await updateTaskInFirestore(id, done, newName); // Atualize o nome no Firestore
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
    }
  };

  const handleEditTask = (id: string, newName: string) => {
    setList((prevList) =>
      prevList.map((item) => (item.id === id ? { ...item, name: newName } : item))
    );

    // Atualize o nome diretamente no Firestore
    updateTaskInFirestore(id, false, newName);
  };

  return (
    <C.Container>
      <C.Area>
        <C.Header>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span>Lista de Estudos (React)</span>
          </div>
        </C.Header>

        <AddArea onEnter={handleAddTask} />

        <C.Content>
          <h2>A fazer</h2>
          {list.map((item) => (
            <ListItem key={item.id} item={item} onTaskChange={handleTaskChange} onEdit={handleEditTask} category="to-do" />
          ))}
        </C.Content>

        <hr style={{ margin: '20px 0' }} />

        <C.Content>
          <h2>Concluídas</h2>
          {completedList.map((item) => (
            <ListItem
              key={item.id}
              item={item}
              onTaskChange={handleTaskChange}
              onEdit={handleEditTask}
              category="completed"
            />
          ))}
        </C.Content>
      </C.Area>

      <div>
        <a style={{ height: '50px', display: 'flex', justifyContent: 'center' }} href="https://www.portao3.com.br">
          <img src="./Images/portao3.jpg" alt="Descrição da imagem" />
        </a>
      </div>
    </C.Container>
  );
};

export default App;
