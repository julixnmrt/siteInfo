import React, { useState } from 'react';
import { Input, Button, Checkbox, Typography, Space, message } from 'antd';
import { PlusOutlined, DeleteOutlined, MenuOutlined } from '@ant-design/icons';

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import '../styles/TodoList.css';

const { Text } = Typography;

// ÉLÉMENT INDIVIDUEL (Draggable avec poignée)
const DraggableItem = ({ item, index, onDelete, onToggle }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
    backgroundColor: '#f5f7fa',
    borderRadius: 8,
    padding: '6px 12px',
    marginBottom: 8,
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  };

  return (
    <div ref={setNodeRef} style={style}>
      <span
        {...attributes}
        {...listeners}
        style={{
          cursor: 'grab',
          marginRight: 12,
          color: '#999',
          fontSize: 16,
        }}
      >
        <MenuOutlined />
      </span>
      <Checkbox checked={item.done} onChange={() => onToggle(index)} style={{ marginRight: 8 }} />
      <Text delete={item.done} style={{ flex: 1, fontSize: 14 }}>
        {item.text}
      </Text>
      <Button
        type="text"
        icon={<DeleteOutlined />}
        danger
        onClick={() => onDelete(index)}
        style={{ marginLeft: 8 }}
      />
    </div>
  );
};

// LISTE PRINCIPALE
const TodoList = () => {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState('');

  const sensors = useSensors(useSensor(PointerSensor));

  const handleAdd = () => {
    if (input.trim() === '') {
      message.warning('Entrez une tâche');
      return;
    }
    setItems([...items, { id: `${Date.now()}`, text: input.trim(), done: false }]);
    setInput('');
  };

  const handleToggle = (index) => {
    const updated = [...items];
    updated[index].done = !updated[index].done;
    setItems(updated);
  };

  const handleDelete = (index) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over?.id);
      setItems((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <div className="todo-container">
      <Space.Compact style={{ width: '100%', marginBottom: 12 }}>
        <Input
          placeholder="Nouvelle tâche"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onPressEnter={handleAdd}
          className="ant-input"
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd} />
      </Space.Compact>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map((item) => item.id)} strategy={verticalListSortingStrategy}>
          {items.length === 0 ? (
            <Text type="secondary">Aucune tâche</Text>
          ) : (
            items.map((item, index) => (
              <DraggableItem
                key={item.id}
                item={item}
                index={index}
                onDelete={handleDelete}
                onToggle={handleToggle}
              />
            ))
          )}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default TodoList;
