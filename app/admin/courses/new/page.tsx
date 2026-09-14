'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Upload, Plus, X } from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

let uid = 0;
const nextId = () => String(++uid);

export default function AdminNewCoursePage() {
  const [modules, setModules] = useState<Module[]>([
    { id: nextId(), title: '', lessons: [] },
  ]);

  const addModule = () => {
    setModules([...modules, { id: nextId(), title: '', lessons: [] }]);
  };

  const removeModule = (id: string) => {
    setModules(modules.filter((m) => m.id !== id));
  };

  const updateModuleTitle = (id: string, title: string) => {
    setModules(modules.map((m) => (m.id === id ? { ...m, title } : m)));
  };

  const addLesson = (moduleId: string) => {
    setModules(
      modules.map((m) =>
        m.id === moduleId
          ? { ...m, lessons: [...m.lessons, { id: nextId(), title: '' }] }
          : m
      )
    );
  };

  const removeLesson = (moduleId: string, lessonId: string) => {
    setModules(
      modules.map((m) =>
        m.id === moduleId
          ? { ...m, lessons: m.lessons.filter((l) => l.id !== lessonId) }
          : m
      )
    );
  };

  const updateLessonTitle = (moduleId: string, lessonId: string, title: string) => {
    setModules(
      modules.map((m) =>
        m.id === moduleId
          ? {
              ...m,
              lessons: m.lessons.map((l) =>
                l.id === lessonId ? { ...l, title } : l
              ),
            }
          : m
      )
    );
  };

  const inputStyle = { background: 'var(--dt-surface)', borderColor: 'var(--dt-border)', color: 'var(--dt-text)' };

  return (
    <>
      <PageHeader title="New course" subtitle="Create a new course" role="admin" />

      <div className="p-4 space-y-4">
        {/* Course title */}
        <div>
          <label className="mb-1 block text-[13px]" style={{ color: 'var(--dt-muted)' }}>Course title</label>
          <input type="text" placeholder="Enter course title..."
            className="w-full rounded-lg border px-3 py-2 text-[14px] outline-none transition-colors focus:border-[#ff8c00]"
            style={inputStyle} />
        </div>

        {/* Description */}
        <div>
          <label className="mb-1 block text-[13px]" style={{ color: 'var(--dt-muted)' }}>Description</label>
          <textarea rows={3} placeholder="Describe the course..."
            className="w-full rounded-lg border px-3 py-2 text-[14px] outline-none transition-colors focus:border-[#ff8c00] resize-none"
            style={inputStyle} />
        </div>

        {/* Price */}
        <div>
          <label className="mb-1 block text-[13px]" style={{ color: 'var(--dt-muted)' }}>Price ($)</label>
          <input type="number" placeholder="0.00"
            className="w-full rounded-lg border px-3 py-2 text-[14px] outline-none transition-colors focus:border-[#ff8c00]"
            style={inputStyle} />
        </div>

        {/* Thumbnail */}
        <div>
          <label className="mb-1 block text-[13px]" style={{ color: 'var(--dt-muted)' }}>Thumbnail</label>
          <div className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors hover:border-[#ff8c00]"
            style={{ borderColor: 'var(--dt-border)' }}>
            <Upload className="mb-2 h-8 w-8" style={{ color: 'var(--dt-muted)' }} />
            <span className="text-[14px]" style={{ color: 'var(--dt-muted)' }}>Upload thumbnail</span>
          </div>
        </div>

        {/* Modules */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-[13px]" style={{ color: 'var(--dt-muted)' }}>Modules</label>
            <button onClick={addModule}
              className="inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-[12px] font-semibold transition-colors hover:bg-[rgba(255,140,0,0.10)]"
              style={{ borderColor: '#ff8c00', color: '#ff8c00', background: 'transparent' }}>
              <Plus className="h-3 w-3" /> Add module
            </button>
          </div>

          <div className="space-y-3">
            {modules.map((mod, mi) => (
              <div key={mod.id} className="rounded-[10px] border p-3"
                style={{ background: 'var(--dt-surface)', borderColor: 'var(--dt-border)' }}>
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-[12px] font-semibold" style={{ color: '#ff8c00' }}>
                    Module {mi + 1}
                  </span>
                  <input type="text" value={mod.title} placeholder="Module title..."
                    onChange={(e) => updateModuleTitle(mod.id, e.target.value)}
                    className="flex-1 rounded-lg border px-2.5 py-1.5 text-[14px] outline-none transition-colors focus:border-[#ff8c00]"
                    style={inputStyle} />
                  {modules.length > 1 && (
                    <button onClick={() => removeModule(mod.id)}>
                      <X className="h-3.5 w-3.5" style={{ color: '#ff5733' }} />
                    </button>
                  )}
                </div>

                <div className="space-y-1.5 pl-3">
                  {mod.lessons.map((lesson, li) => (
                    <div key={lesson.id} className="flex items-center gap-2">
                      <span className="text-[12px]" style={{ color: 'var(--dt-muted)' }}>
                        {mi + 1}.{li + 1}
                      </span>
                      <input type="text" value={lesson.title} placeholder="Lesson title..."
                        onChange={(e) => updateLessonTitle(mod.id, lesson.id, e.target.value)}
                        className="flex-1 rounded-lg border px-2.5 py-1.5 text-[13px] outline-none transition-colors focus:border-[#ff8c00]"
                        style={inputStyle} />
                      <button onClick={() => removeLesson(mod.id, lesson.id)}>
                        <X className="h-3 w-3" style={{ color: 'var(--dt-muted)' }} />
                      </button>
                    </div>
                  ))}
                  <button onClick={() => addLesson(mod.id)}
                    className="text-[12px] font-medium transition-colors hover:text-[#ff6b35]"
                    style={{ color: '#ff8c00' }}>
                    + Add lesson
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="pt-2">
          <button className="rounded-lg px-4 py-2 text-[14px] font-semibold"
            style={{ background: 'linear-gradient(135deg, #ff8c00, #ff6b35)', color: '#0a0a0a' }}>
            Save course
          </button>
        </div>
      </div>
    </>
  );
}
