import React from 'react';
import * as C from './styles';
import { Item } from '../../types/Item';


type Props = {
  item: Item;
  onTaskChange: (id: number, done: boolean) => void;
  onEdit: (id: number, newName: string) => void;
  category: string;
};

export const ListItem = ({ item, onTaskChange, onEdit, category }: Props) => {
  const [isChecked, setIsChecked] = React.useState(item.done);
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedName, setEditedName] = React.useState(item.name);

  React.useEffect(() => {
    setIsChecked(item.done);
  }, [item.done]);

  const handleTaskCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setIsChecked(checked);
    onTaskChange(item.id, checked);
  };

  const handleEdit = () => {
    if (category === 'to-do') {
      setIsEditing(true);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedName(item.name);
  };

  const handleSaveEdit = () => {
    onEdit(item.id, editedName);
    setIsEditing(false);
  };

  return (
    <C.Container done={isChecked}>
      {category === 'to-do' && (
        <>
          <input type="checkbox" checked={isChecked} onChange={handleTaskCheckboxChange} />
          {isEditing ? (
            <div style={{ display: 'flex' }}>
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                style={{
                  border: '0px',
                  background: 'transparent',
                  outline: '0',
                  color: '#FFF',
                  fontSize: '18px',
                  flex: '1',
                  width: '70%',
                }}
                placeholder="Editar tarefa"
              />
              <button
                onClick={handleSaveEdit}
                style={{
                  backgroundColor: 'transparent',
                  border: '1px solid #FFF',
                  padding: '5px 10px',
                  color: '#FFF',
                  cursor: 'pointer',
                }}
              >
                Salvar
              </button>
              <button
                onClick={handleCancelEdit}
                style={{
                  backgroundColor: 'transparent',
                  border: '1px solid #FFF',
                  padding: '5px 10px',
                  color: '#FFF',
                  cursor: 'pointer',
                }}
              >
                Cancelar
              </button>
            </div>
          ) : (
            <>
              <label style={{ textDecoration: item.done ? 'line-through' : 'none', marginRight: '10px' }}>
                {item.name}
              </label>
              <button
                onClick={handleEdit}
                disabled={item.done}
                style={{
                  backgroundColor: 'transparent',
                  border: '1px solid #FFF',
                  padding: '5px 10px',
                  color: '#FFF',
                  cursor: 'pointer',
                }}
              >
                Editar
              </button>
            </>
          )}
        </>
      )}
      {category === 'completed' && (
        <label style={{ textDecoration: item.done ? 'line-through' : 'none' }}>{item.name}</label>
      )}
    </C.Container>
  );
};