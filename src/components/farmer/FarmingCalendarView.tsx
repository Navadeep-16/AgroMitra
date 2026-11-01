import React, { useState } from 'react';
import { CropActivity } from '../../types/farm';
import { useLanguage } from '../../context/LanguageContext';
import { useNotification } from '../../context/NotificationContext';
import { CalendarDays, CheckCircle2, Circle, Clock, Plus, Filter, AlertCircle } from 'lucide-react';

interface FarmingCalendarViewProps {
  activities: CropActivity[];
  onToggleActivity: (id: string) => void;
  onAddActivity: (activity: CropActivity) => void;
}

export const FarmingCalendarView: React.FC<FarmingCalendarViewProps> = ({ 
  activities, 
  onToggleActivity, 
  onAddActivity 
}) => {
  const { t, language } = useLanguage();
  const { showToast } = useNotification();
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState<CropActivity['category']>('Fertilization');
  const [scheduledDay, setScheduledDay] = useState(45);

  const filtered = activities.filter(act => {
    if (filter === 'pending') return !act.completed;
    if (filter === 'completed') return act.completed;
    return true;
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !dueDate) {
      showToast('error', 'Please fill all required fields');
      return;
    }

    const newAct: CropActivity = {
      id: `act-${Date.now()}`,
      cropId: 'crop-1',
      farmId: 'farm-1',
      title,
      titleTe: title,
      scheduledDay: Number(scheduledDay),
      dueDate,
      category,
      completed: false
    };

    onAddActivity(newAct);
    showToast('success', 'Activity Scheduled', `${title} added to farming calendar.`);
    setTitle('');
    setDueDate('');
    setShowAddModal(false);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
              <CalendarDays className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-900">{t('farmingCalendar')}</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Dynamic crop phenology tasks generated from sowing date: <strong>25 June 2026</strong> (Cotton Bollgard II).
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Filter pills */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl text-xs font-semibold">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-xl transition ${filter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'}`}
            >
              All ({activities.length})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-3 py-1.5 rounded-xl transition ${filter === 'pending' ? 'bg-white text-emerald-900 shadow-xs font-bold' : 'text-slate-600'}`}
            >
              Pending ({activities.filter(a => !a.completed).length})
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-3 py-1.5 rounded-xl transition ${filter === 'completed' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'}`}
            >
              Completed ({activities.filter(a => a.completed).length})
            </button>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add Custom Task</span>
          </button>
        </div>
      </div>

      {/* Activities Timeline List */}
      <div className="space-y-3">
        {filtered.map(act => (
          <div
            key={act.id}
            onClick={() => onToggleActivity(act.id)}
            className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
              act.completed
                ? 'bg-slate-50/80 border-slate-200 text-slate-400 opacity-80'
                : 'bg-white border-slate-200 hover:border-emerald-400 shadow-xs'
            }`}
          >
            <div className="flex items-center gap-3">
              <button
                type="button"
                className={`w-6 h-6 rounded-lg flex items-center justify-center transition shrink-0 ${
                  act.completed ? 'bg-emerald-600 text-white' : 'border-2 border-slate-300 text-transparent hover:border-emerald-500'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
              </button>

              <div>
                <span className={`text-xs font-bold block ${act.completed ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                  {language === 'te' ? act.titleTe : act.title}
                </span>
                <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-0.5">
                  <span className="font-mono font-semibold text-emerald-800">Day {act.scheduledDay}</span>
                  <span>•</span>
                  <span>Due: {act.dueDate}</span>
                  <span>•</span>
                  <span className="bg-slate-100 px-2 py-0.5 rounded-md font-medium text-slate-600">
                    {act.category}
                  </span>
                </div>
                {act.notes && (
                  <p className="text-[11px] text-slate-600 mt-1 italic">
                    Note: {act.notes}
                  </p>
                )}
              </div>
            </div>

            <div className="text-right shrink-0">
              {act.completed ? (
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                  Done
                </span>
              ) : (
                <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg">
                  Action Required
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Custom Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-emerald-700" />
              <span>Schedule Farm Activity</span>
            </h3>

            <form onSubmit={handleAddSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Activity Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Foliar Boron Spray"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Task Category
                </label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value as CropActivity['category'])}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                >
                  <option value="Fertilization">Fertilization & Fertigation</option>
                  <option value="Pest Scouting">Pest Scouting & Spraying</option>
                  <option value="Irrigation">Irrigation Management</option>
                  <option value="Weeding">Weeding & Intercultivation</option>
                  <option value="Harvest">Picking & Harvest</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Scheduled Day
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="160"
                    value={scheduledDay}
                    onChange={e => setScheduledDay(Number(e.target.value))}
                    className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    required
                    value={dueDate}
                    onChange={e => setDueDate(e.target.value)}
                    className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl shadow-xs transition"
                >
                  Add to Calendar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

