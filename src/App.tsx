import React, { useState } from 'react';
import * as C from './App.styles';
import { Item } from './types/Item';
import { ListItem } from './components/ListItem';
import { AddArea } from './components/AddArea';

const App = () => {
  const [list, setList] = useState<Item[]>([]);
  const [completedList, setCompletedList] = useState<Item[]>([]);

  const handleAddTask = (taskName: string) => {
    const newTask: Item = {
      id: list.length + 1,
      name: taskName,
      done: false,
      category: 'to-do',
      priority: list.length + 1,
    };
    setList((prevList) => [...prevList, newTask]);
  };

  const handleTaskChange = (id: number, done: boolean) => {
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
      const completedTask = list.find((item) => item.id === id);
      if (completedTask) {
        setCompletedList((prevCompletedList) => [...prevCompletedList, completedTask]);
        setList((prevList) => prevList.filter((item) => item.id !== id));
      }
    }
  };

  const handleEditTask = (id: number, newName: string) => {
    setList((prevList) =>
      prevList.map((item) => (item.id === id ? { ...item, name: newName } : item))
    );
  };

  // Correção: Removido onPriorityChange do ListItem, pois não é usado
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
          {list.map((item, index) => (
            <ListItem
              key={index}
              item={item}
              onTaskChange={handleTaskChange}
              onEdit={handleEditTask}
              category="to-do"
            />
          ))}
        </C.Content>

        <hr style={{ margin: '20px 0' }} />

        <C.Content>
          <h2>Concluídas</h2>
          {completedList.map((item, index) => (
            <ListItem
              key={index}
              item={item}
              onTaskChange={handleTaskChange}
              onEdit={handleEditTask}
              category="completed"
            />
          ))}
        </C.Content>
      </C.Area>

      <div style={{ height: '50px', display: 'flex', justifyContent: 'center' }}>
        <img src="./Images/portao3.jpg" alt="Descrição da imagem" />
      </div>
    </C.Container>
  );
};

export default App;
