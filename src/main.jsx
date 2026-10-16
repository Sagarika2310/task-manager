import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Check, CheckSquare, Plus, Trash2, CircleCheck, ListTodo, Clock3, Sprout, Sparkles } from 'lucide-react';
import './styles.css';

const STORAGE_KEY = 'jtronix-task-tracker-v1';
const FILTERS = ['All', 'Pending', 'Completed'];

function Stat({ className, icon, label, value }) {
  return <div className={`stat ${className}`}><div className="stat-icon">{icon}</div><div className="stat-label">{label}</div><div className="stat-number">{value}</div></div>;
}
function Empty({ title, text, action, actionLabel }) {
  return <div className="empty"><div className="empty-icon"><Sprout size={23}/></div><h3>{title}</h3><p>{text}</p>{action && <button className="text-button" onClick={action}>{actionLabel || 'Try again'}</button>}</div>;
}
function App() {
  const [tasks, setTasks] = useState(() => {
    try { const saved = localStorage.getItem(STORAGE_KEY); const parsed = saved ? JSON.parse(saved) : []; return Array.isArray(parsed) ? parsed.filter(t => t && typeof t.id === 'string' && typeof t.title === 'string').map(t => ({...t, completed: Boolean(t.completed)})) : []; }
    catch { return []; }
  });
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('All');
  const [error, setError] = useState('');
  useEffect(() => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)); } catch { setError('Your browser could not save changes.'); } }, [tasks]);

  function addTask(event) {
    event.preventDefault();
    const title = input.trim();
    if (!title) { setError('Add a task first — even a small step counts!'); return; }
    setTasks(current => [{ id: `${Date.now()}-${Math.random()}`, title, completed: false }, ...current]);
    setInput('');
    setError('');
  }
  function toggleTask(id) { setTasks(current => current.map(task => task.id === id ? { ...task, completed: !task.completed } : task)); }
  function deleteTask(id) { setTasks(current => current.filter(task => task.id !== id)); }
  const completed = tasks.filter(task => task.completed).length;
  const pending = tasks.length - completed;
  const progress = tasks.length ? Math.round(completed / tasks.length * 100) : 0;
  const visibleTasks = tasks.filter(task => filter === 'All' || (filter === 'Completed' ? task.completed : !task.completed));
  const controls = <div className="filters" role="group" aria-label="Filter tasks">
    {FILTERS.map(option => {
      const count = option === 'All' ? tasks.length : option === 'Completed' ? completed : pending;
      return <button key={option} type="button" className={`filter ${filter === option ? 'active' : ''}`} onClick={() => setFilter(option)} aria-pressed={filter === option}>
        {option}<span className="filter-count">{count}</span>
      </button>;
    })}
  </div>;

  return <div className="app-shell">
    <header className="topbar">
      <a className="brand" href="#" aria-label="Task Tracker home"><span className="brand-mark"><CheckSquare size={20} strokeWidth={2.5}/></span><span>little steps<span className="brand-accent">.</span></span></a>
      <div className="top-note"><span className="sun-dot"/> A little progress every day</div>
    </header>
    <main className="main">
      <section className="hero">
        <span className="decor left">✳</span><span className="decor right">✦</span>
        
        <h1>Make today<br/>a little more <em>meaningful.</em></h1>
        <p>Make a list, mark your wins, and keep moving at your own pace.</p>
      </section>
      <section className="panel" aria-label="Task tracker">
        <div className="panel-heading"><div><div className="overline">A FRESH PAGE</div><h2>What’s on your mind?</h2></div><div className="happy-note"><Sprout size={17}/> You’re doing great</div></div>
        <div className="stats">
            <Stat className="stat-total" icon={<ListTodo size={16}/>} label="Total tasks" value={tasks.length}/>
            <Stat className="stat-completed" icon={<CircleCheck size={16}/>} label="Completed" value={completed}/>
            <Stat className="stat-pending" icon={<Clock3 size={16}/>} label="Pending" value={pending}/>
          </div>
          <div className="progress"><div className="progress-copy"><span>Look how far you’ve come</span><strong>{progress}% complete</strong></div><div className="progress-track" role="progressbar" aria-label="Overall progress" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100"><div className="progress-fill" style={{width: `${progress}%`}}/></div></div>
        <form className="add-form" onSubmit={addTask} noValidate>
          <label className="sr-only" htmlFor="new-task">Add a new task</label>
          <div className="input-wrap"><Plus size={18}/><input id="new-task" type="text" value={input} onChange={event => { setInput(event.target.value); if (error) setError(''); }} placeholder="One thing you’d like to get done…" maxLength={180}/></div>
          <button className="add-button" type="submit"><Plus size={17}/><span>Add task</span></button>
        </form>
        {error && <p className="error" role="alert">{error}</p>}
        <div className="list-heading"><div><div className="overline">YOUR LIST</div><h2>Tasks <span className="count">{visibleTasks.length}</span></h2></div>{controls}</div>
          {visibleTasks.length ? <ul className="task-list">{visibleTasks.map(task => <li className={`task-item ${task.completed ? 'is-complete' : ''}`} key={task.id}><button className={`task-check ${task.completed ? 'checked' : ''}`} type="button" onClick={() => toggleTask(task.id)} aria-label={`${task.completed ? 'Mark pending' : 'Mark completed'}: ${task.title}`} aria-pressed={task.completed}>{task.completed && <Check size={14}/>}</button><span className="task-title">{task.title}</span><span className={`status ${task.completed ? 'status-done' : 'status-pending'}`}>{task.completed ? 'Completed' : 'Pending'}</span><button className="delete" type="button" onClick={() => deleteTask(task.id)} aria-label={`Delete ${task.title}`} title="Delete task"><Trash2 size={15}/></button></li>)}</ul> : <Empty title={tasks.length ? `No ${filter.toLowerCase()} tasks right now.` : 'A fresh start.'} text={tasks.length ? 'Switch filters to see the rest of your list.' : 'Add a task and celebrate every bit of progress.'} action={tasks.length ? () => setFilter('All') : null} actionLabel="Show all tasks" />}
        <div className="footer"><span><span className="footer-dot"/> Autosave</span><span>{tasks.length} {tasks.length === 1 ? 'task' : 'tasks'} on your list</span></div>
      </section>
      <footer className="page-footer"><span>Small steps add up to big things.</span><strong>Make space to grow ✿</strong></footer>
    </main>
  </div>;
}
createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
