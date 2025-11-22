import React, { useState, useMemo } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import Card from "../components/Card";
import Button from "../components/Button";

function TaskForm({ onAdd }) {
  const [text, setText] = useState("");
  const handle = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd({ text: text.trim() });
    setText("");
  };
  return (
    <form onSubmit={handle} className="flex gap-2">
      <input value={text} onChange={(e)=>setText(e.target.value)} className="flex-1 px-3 py-2 rounded border" placeholder="New task..." />
      <Button type="submit">Add</Button>
    </form>
  );
}

export default function TasksPage() {
  const [tasks, setTasks] = useLocalStorage("plp_tasks", []);
  const [filter, setFilter] = useState("all");

  const addTask = ({ text }) => {
    setTasks(prev => [{ id: Date.now(), text, completed: false }, ...prev]);
  };

  const toggle = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const remove = (id) => setTasks(prev => prev.filter(t => t.id !== id));

  const filtered = useMemo(() => {
    if (filter === "active") return tasks.filter(t => !t.completed);
    if (filter === "completed") return tasks.filter(t => t.completed);
    return tasks;
  }, [tasks, filter]);

  return (
    <div className="space-y-4">
      <Card title="Task Manager">
        <TaskForm onAdd={addTask} />
        <div className="mt-3 flex gap-2">
          <Button variant="secondary" onClick={()=>setFilter("all")}>All</Button>
          <Button variant="secondary" onClick={()=>setFilter("active")}>Active</Button>
          <Button variant="secondary" onClick={()=>setFilter("completed")}>Completed</Button>
        </div>

        <ul className="mt-4 space-y-2">
          {filtered.length === 0 && <p className="text-sm text-gray-500">No tasks.</p>}
          {filtered.map(task => (
            <li key={task.id} className="flex items-center justify-between gap-3 bg-gray-50 dark:bg-gray-800 p-3 rounded">
              <div className="flex items-center gap-3">
                <input type="checkbox" checked={task.completed} onChange={()=>toggle(task.id)} />
                <span className={task.completed ? "line-through text-gray-400" : ""}>{task.text}</span>
              </div>
              <div className="flex gap-2">
                <Button variant="danger" onClick={()=>remove(task.id)}>Delete</Button>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
