import React, { useState } from 'react';
import { Plus, Check, Play, CircleAlert, Briefcase, Trash2, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Task } from '../types';

interface TaskTrackerProps {
  initialTasks: Task[];
}

export default function TaskTracker({ initialTasks }: TaskTrackerProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newPriority, setNewPriority] = useState<Task['priority']>('Trung bình');
  const [newAssignee, setNewAssignee] = useState('');

  // Handle task completion / progress change
  const handleTaskAction = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === taskId) {
          if (task.status === 'Hoàn thành') {
            return { ...task, status: 'Đang làm', progress: 50 };
          } else if (task.status === 'Đang làm') {
            return { ...task, status: 'Hoàn thành', progress: 100 };
          } else {
            return { ...task, status: 'Đang làm', progress: 10 };
          }
        }
        return task;
      })
    );
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTask: Task = {
      id: `T-${Math.floor(100 + Math.random() * 900)}`,
      title: newTitle,
      progress: 0,
      assignee: newAssignee.trim() || 'Thành viên mới',
      priority: newPriority,
      status: 'Đang làm',
    };

    setTasks((prev) => [...prev, newTask]);
    setNewTitle('');
    setNewAssignee('');
    setNewPriority('Trung bình');
    setShowForm(false);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  const getPriorityBadge = (priority: Task['priority']) => {
    switch (priority) {
      case 'Cao':
        return <span className="text-[10px] bg-rose-50 text-rose-600 border border-rose-100 font-bold px-2 py-0.5 rounded-full">Cao</span>;
      case 'Trung bình':
        return <span className="text-[10px] bg-indigo-50 text-indigo-600 border border-indigo-100 font-bold px-2 py-0.5 rounded-full">Trung bình</span>;
      case 'Thấp':
        return <span className="text-[10px] bg-neutral-100 text-neutral-600 border border-neutral-200 font-bold px-2 py-0.5 rounded-full">Thấp</span>;
    }
  };

  return (
    <div id="task-tracker-panel" className="bg-white border border-neutral-200/80 rounded-2xl p-6 shadow-sm flex flex-col h-full justify-between">
      <div>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-bold text-neutral-900 font-display">Mục tiêu & Dự án</h3>
            <p className="text-xs text-neutral-500 mt-1">Đầu việc thiết lập và tiến trình xử lý kỹ thuật</p>
          </div>
          <button
            id="add-task-btn"
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold transition"
          >
            <Plus className="w-3.5 h-3.5" /> Thêm mới
          </button>
        </div>

        {/* Create Form Container */}
        <AnimatePresence>
          {showForm && (
            <motion.form
              onSubmit={handleAddTask}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden bg-neutral-50/50 p-4 rounded-xl border border-neutral-200 mb-4 space-y-3"
            >
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-neutral-400 uppercase">Tên hạng mục đầu việc</label>
                <input
                  id="task-title-input"
                  type="text"
                  placeholder="Ghi việc cần xử trị..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full text-xs px-3 py-1.5 bg-white border border-neutral-200 rounded-lg outline-none focus:border-neutral-800"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase">Người thực hiện</label>
                  <input
                    type="text"
                    placeholder="Tên nhân sự..."
                    value={newAssignee}
                    onChange={(e) => setNewAssignee(e.target.value)}
                    className="w-full text-xs px-3 py-1.5 bg-white border border-neutral-200 rounded-lg outline-none focus:border-neutral-800"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase">Mức ưu tiên</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as Task['priority'])}
                    className="w-full text-xs px-2 py-1.5 bg-white border border-neutral-200 rounded-lg outline-none focus:border-neutral-800"
                  >
                    <option value="Cao">Cao</option>
                    <option value="Trung bình">Trung bình</option>
                    <option value="Thấp">Thấp</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2 justify-end pt-1">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-2.5 py-1 text-[11px] font-bold text-neutral-500 hover:text-neutral-800"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  id="save-task-submit"
                  className="px-3 py-1 text-[11px] font-bold bg-neutral-900 border border-neutral-900 text-white rounded-lg hover:bg-neutral-800"
                >
                  Xác nhận
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Milestones dynamic lists */}
        <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-1">
          <AnimatePresence initial={false}>
            {tasks.map((task) => (
              <motion.div
                key={task.id}
                id={`task-card-${task.id}`}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group border border-neutral-100 p-3.5 rounded-xl hover:border-neutral-200 hover:shadow-xs transition-colors flex flex-col justify-between"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    {/* Toggle Button */}
                    <button
                      id={`task-toggle-btn-${task.id}`}
                      onClick={() => handleTaskAction(task.id)}
                      className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-all border ${
                        task.status === 'Hoàn thành'
                          ? 'bg-emerald-500 border-emerald-500 text-white shadow-xs'
                          : 'bg-white border-neutral-300 text-transparent hover:border-indigo-500 group-hover:text-neutral-300'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </button>

                    <div>
                      <p
                        className={`text-xs font-semibold leading-relaxed transition-all ${
                          task.status === 'Hoàn thành'
                            ? 'text-neutral-400 line-through'
                            : 'text-neutral-800 group-hover:text-black'
                        }`}
                      >
                        {task.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1.5 text-[10px] text-neutral-400">
                        <span className="font-mono">{task.id}</span>
                        <span>•</span>
                        <span className="font-medium text-neutral-500">{task.assignee}</span>
                        <span>•</span>
                        {getPriorityBadge(task.priority)}
                      </div>
                    </div>
                  </div>

                  <button
                    id={`task-delete-btn-${task.id}`}
                    onClick={() => handleDeleteTask(task.id)}
                    className="text-neutral-300 hover:text-rose-500 p-1 rounded-md hover:bg-rose-50 transition opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Micro-Progress Bar wrapper */}
                <div className="mt-3">
                  <div className="flex justify-between items-center mb-1 text-[10px]">
                    <span
                      className={`font-semibold ${
                        task.status === 'Hoàn thành' ? 'text-emerald-500' : 'text-indigo-600'
                      }`}
                    >
                      {task.status}
                    </span>
                    <span className="font-mono font-bold text-neutral-600">{task.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${
                        task.status === 'Hoàn thành' ? 'bg-emerald-500' : 'bg-indigo-500'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${task.progress}%` }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="border-t border-neutral-100 pt-3 mt-4 flex items-center justify-between text-[11px] text-neutral-400">
        <span className="flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5" />
          Sprint: Q2-2026-06
        </span>
        <span className="font-mono text-xs">
          {tasks.filter((t) => t.status === 'Hoàn thành').length}/{tasks.length} Hoàn thành
        </span>
      </div>
    </div>
  );
}
