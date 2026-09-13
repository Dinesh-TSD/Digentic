'use client';

import { notFound } from 'next/navigation';
import { use, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Lock,
  Play,
  BookOpen,
  MessageSquare,
  FileText,
  Download,
  Clock,
  Save,
  ThumbsUp,
  Send,
  X,
} from 'lucide-react';
import { COURSES } from '@/lib/courses-data';
import type { Lesson, Section } from '@/lib/courses-data';
import { SAMPLE_VIDEOS } from '@/lib/courses-data';
import { VideoPlayer } from '@/components/courses/VideoPlayer';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface Note {
  id: string;
  timestamp: string;
  text: string;
}

interface Question {
  id: string;
  author: string;
  avatar: string;
  text: string;
  votes: number;
  answers: number;
  instructorAnswered: boolean;
  date: string;
}

// ---------------------------------------------------------------------------
// Mock Q&A seed data
// ---------------------------------------------------------------------------
const SEED_QUESTIONS: Question[] = [
  {
    id: 'q1',
    author: 'Rahul V',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200',
    text: 'How do I handle context window limits when the document is very large?',
    votes: 14,
    answers: 3,
    instructorAnswered: true,
    date: 'Sep 02, 2025',
  },
  {
    id: 'q2',
    author: 'Priya S',
    avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=200',
    text: 'Is Pinecone necessary or can I use an open-source alternative like Chroma?',
    votes: 9,
    answers: 2,
    instructorAnswered: false,
    date: 'Sep 01, 2025',
  },
];

// ---------------------------------------------------------------------------
// Lesson sidebar item
// ---------------------------------------------------------------------------
function LessonItem({
  lesson,
  isActive,
  isCompleted,
  courseId,
}: {
  lesson: Lesson;
  isActive: boolean;
  isCompleted: boolean;
  courseId: string;
}) {
  const canPlay = lesson.preview || isCompleted;

  return (
    <Link
      href={canPlay ? `/courses/${courseId}/learn/${lesson.id}` : '#'}
      className={`group flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm transition-all ${
        isActive
          ? 'border-l-2 border-[#ff8c00] bg-[#ff8c00]/10 text-[#ff8c00]'
          : canPlay
          ? 'text-[#1a1a1a] hover:bg-[#f5f5f5] dark:text-[#f1f5f9] dark:hover:bg-[#1f1f1f]'
          : 'cursor-not-allowed opacity-50 text-[#666666] dark:text-[#94a3b8]'
      }`}
    >
      {/* State icon */}
      <span className="shrink-0">
        {isCompleted
          ? <CheckCircle2 className="h-4 w-4 text-[#ff8c00]" />
          : canPlay
          ? <Play className="h-3.5 w-3.5 text-[#ff8c00]" />
          : <Lock className="h-3.5 w-3.5" />
        }
      </span>

      <span className="flex-1 line-clamp-2 text-xs leading-snug">{lesson.title}</span>

      <span className={`shrink-0 text-[10px] tabular-nums ${isActive ? 'text-[#ff8c00]' : 'text-[#999] dark:text-[#64748b]'}`}>
        {lesson.duration}
      </span>
    </Link>
  );
}

// ---------------------------------------------------------------------------
// Section accordion in sidebar
// ---------------------------------------------------------------------------
function SidebarSection({
  section,
  currentLessonId,
  completedIds,
  courseId,
  defaultOpen,
}: {
  section: Section;
  currentLessonId: string;
  completedIds: Set<string>;
  courseId: string;
  defaultOpen: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const completedCount = section.lessons.filter((l) => completedIds.has(l.id)).length;

  return (
    <div>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-2 bg-[#f5f5f5] px-3 py-2.5 text-left transition-colors hover:bg-orange-50/50 dark:bg-[#111111] dark:hover:bg-[#ff8c00]/5"
      >
        <span className="flex-1 text-xs font-bold text-[#ff8c00] line-clamp-2">{section.title}</span>
        <span className="shrink-0 text-[10px] text-[#666666] dark:text-[#94a3b8]">
          {completedCount}/{section.lessons.length}
        </span>
        {open
          ? <ChevronUp className="h-3.5 w-3.5 shrink-0 text-[#ff8c00]" />
          : <ChevronDown className="h-3.5 w-3.5 shrink-0 text-[#ff8c00]" />
        }
      </button>
      {open && (
        <div className="py-1">
          {section.lessons.map((lesson) => (
            <LessonItem
              key={lesson.id}
              lesson={lesson}
              isActive={lesson.id === currentLessonId}
              isCompleted={completedIds.has(lesson.id)}
              courseId={courseId}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Below-video tabs: Notes | Q&A | Resources
// ---------------------------------------------------------------------------
type BottomTab = 'notes' | 'qa' | 'resources';

function NotesPanel({ lessonId }: { lessonId: string }) {
  const storageKey = `notes-${lessonId}`;
  const [notes, setNotes] = useState<Note[]>([]);
  const [draft, setDraft] = useState('');

  const saveNote = () => {
    if (!draft.trim()) return;
    const note: Note = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      text: draft.trim(),
    };
    setNotes((prev) => [note, ...prev]);
    setDraft('');
    // In production: persist to localStorage or backend
    void storageKey;
  };

  return (
    <div className="space-y-4">
      <h3 className="flex items-center gap-2 text-sm font-bold text-[#1a1a1a] dark:text-[#f1f5f9]">
        <FileText className="h-4 w-4 text-[#ff8c00]" />
        📝 My Notes
      </h3>
      <textarea
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        placeholder="Type a note for this lesson..."
        rows={4}
        className="w-full resize-none rounded-lg border border-[#e0e0e0] bg-[#f5f5f5] px-4 py-3 text-sm text-[#1a1a1a] placeholder-[#999] focus:border-[#ff8c00] focus:outline-none dark:border-[#1f1f1f] dark:bg-[#0a0a0a] dark:text-[#f1f5f9] dark:placeholder-[#64748b]"
      />
      <button
        onClick={saveNote}
        className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#ff8c00] to-[#ff6b35] px-4 py-2 text-sm font-semibold text-white transition-all hover:shadow-md hover:shadow-[#ff8c00]/20"
      >
        <Save className="h-4 w-4" />
        Save Note
      </button>

      {notes.length > 0 && (
        <div className="space-y-3">
          {notes.map((note) => (
            <div key={note.id} className="rounded-lg border border-[#e0e0e0] bg-white p-3 dark:border-[#1f1f1f] dark:bg-[#111111]">
              <span className="mb-1 block text-[10px] font-semibold text-[#ff8c00]">{note.timestamp}</span>
              <p className="text-sm text-[#444444] dark:text-[#94a3b8]">{note.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function QAPanel() {
  const [questions, setQuestions] = useState<Question[]>(SEED_QUESTIONS);
  const [askOpen, setAskOpen] = useState(false);
  const [questionText, setQuestionText] = useState('');

  const submitQuestion = () => {
    if (!questionText.trim()) return;
    const q: Question = {
      id: Date.now().toString(),
      author: 'You',
      avatar: 'https://ui-avatars.com/api/?name=You&background=ff8c00&color=fff',
      text: questionText.trim(),
      votes: 0,
      answers: 0,
      instructorAnswered: false,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };
    setQuestions((prev) => [q, ...prev]);
    setQuestionText('');
    setAskOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-sm font-bold text-[#1a1a1a] dark:text-[#f1f5f9]">
          <MessageSquare className="h-4 w-4 text-[#ff8c00]" />
          💬 Q&amp;A
        </h3>
        <button
          onClick={() => setAskOpen((o) => !o)}
          className="rounded-lg bg-gradient-to-r from-[#ff8c00] to-[#ff6b35] px-3 py-1.5 text-xs font-semibold text-white"
        >
          Ask Question
        </button>
      </div>

      {askOpen && (
        <div className="rounded-lg border border-[#e0e0e0] bg-white p-4 dark:border-[#1f1f1f] dark:bg-[#111111]">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-semibold text-[#1a1a1a] dark:text-[#f1f5f9]">New Question</span>
            <button onClick={() => setAskOpen(false)}><X className="h-4 w-4 text-[#666666]" /></button>
          </div>
          <textarea
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            placeholder="What's your question about this lesson?"
            rows={3}
            className="mb-3 w-full resize-none rounded-lg border border-[#e0e0e0] bg-[#f5f5f5] px-3 py-2 text-sm text-[#1a1a1a] focus:border-[#ff8c00] focus:outline-none dark:border-[#1f1f1f] dark:bg-[#0a0a0a] dark:text-[#f1f5f9]"
          />
          <button
            onClick={submitQuestion}
            className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-[#ff8c00] to-[#ff6b35] px-4 py-2 text-xs font-semibold text-white"
          >
            <Send className="h-3.5 w-3.5" />
            Submit
          </button>
        </div>
      )}

      <div className="space-y-3">
        {questions.map((q) => (
          <div key={q.id} className="rounded-lg border border-[#e0e0e0] bg-white p-4 dark:border-[#1f1f1f] dark:bg-[#111111]">
            <div className="mb-2 flex items-start gap-3">
              <Image src={q.avatar} alt={q.author} width={32} height={32}
                className="h-8 w-8 shrink-0 rounded-full object-cover" />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-[#1a1a1a] transition-colors hover:text-[#ff8c00] dark:text-[#f1f5f9]">{q.author}</span>
                  <span className="text-[10px] text-[#666666] dark:text-[#94a3b8]">{q.date}</span>
                  {q.instructorAnswered && (
                    <span className="rounded-full bg-[#ff8c00] px-2 py-0.5 text-[10px] font-bold text-white">
                      Instructor Answered
                    </span>
                  )}
                </div>
                <p className="text-sm text-[#444444] dark:text-[#94a3b8]">{q.text}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs text-[#666666] dark:text-[#94a3b8]">
              <button className="flex items-center gap-1 transition-colors hover:text-[#ff8c00]">
                <ThumbsUp className="h-3.5 w-3.5" />
                {q.votes}
              </button>
              <span className="rounded-full bg-[#ff8c00]/15 px-2 py-0.5 text-[10px] font-semibold text-[#ff8c00]">
                {q.answers} answers
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResourcesPanel({ courseId }: { courseId: string }) {
  const resources = [
    { name: 'Lesson Slides.pdf', size: '2.4 MB' },
    { name: 'Code Starter Files.zip', size: '1.1 MB' },
    { name: 'Cheat Sheet.pdf', size: '340 KB' },
  ];

  return (
    <div className="space-y-4">
      <h3 className="flex items-center gap-2 text-sm font-bold text-[#1a1a1a] dark:text-[#f1f5f9]">
        <Download className="h-4 w-4 text-[#ff8c00]" />
        Resources
      </h3>
      <div className="space-y-2">
        {resources.map((r) => (
          <a
            key={r.name}
            href="#"
            onClick={(e) => e.preventDefault()}
            className="flex items-center justify-between rounded-lg border border-[#e0e0e0] bg-white px-4 py-3 transition-all hover:border-[#ff8c00] dark:border-[#1f1f1f] dark:bg-[#111111]"
          >
            <div className="flex items-center gap-2.5">
              <FileText className="h-4 w-4 text-[#ff8c00]" />
              <span className="text-sm text-[#ff8c00]">{r.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#666666] dark:text-[#94a3b8]">{r.size}</span>
              <Download className="h-4 w-4 text-[#ff8c00]" />
            </div>
          </a>
        ))}
      </div>
      <a
        href="#"
        onClick={(e) => e.preventDefault()}
        className="flex items-center gap-2 rounded-lg bg-[#ff8c00] px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#ff6b35]"
      >
        <Download className="h-4 w-4" />
        Download All Materials
      </a>
      <p className="text-xs text-[#666666] dark:text-[#94a3b8]">
        Course ID: {courseId}
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function LearnPage({
  params,
}: {
  params: Promise<{ id: string; lesson: string }>;
}) {
  const { id: courseId, lesson: lessonId } = use(params);
  const course = COURSES.find((c) => c.id === courseId);
  if (!course) notFound();

  // Flatten all lessons
  const allLessons: { lesson: Lesson; section: Section }[] = course.curriculum.flatMap((s) =>
    s.lessons.map((l) => ({ lesson: l, section: s }))
  );

  const currentIndex = allLessons.findIndex((al) => al.lesson.id === lessonId);
  if (currentIndex === -1) notFound();

  const { lesson: currentLesson, section: currentSection } = allLessons[currentIndex];
  const prevItem = allLessons[currentIndex - 1] ?? null;
  const nextItem = allLessons[currentIndex + 1] ?? null;

  // Track completed (local state — use backend in production)
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [bottomTab, setBottomTab] = useState<BottomTab>('notes');
  const [progress, setProgress] = useState(0);

  const markComplete = () => {
    setCompleted((prev) => {
      const next = new Set(prev);
      next.add(lessonId);
      return next;
    });
  };

  const progressPercent = Math.round(((completed.size + 1) / allLessons.length) * 100);

  // Find which section contains current lesson for default-open
  const currentSectionId = currentSection.id;

  const videoUrl = currentLesson.videoUrl ?? SAMPLE_VIDEOS.short;

  return (
    <div className="flex h-[calc(100vh-64px)] flex-col bg-white dark:bg-[#0a0a0a]">

      {/* ── TOP NAV ── */}
      <div className="flex items-center gap-3 border-b border-[#e0e0e0] bg-white px-4 py-3 dark:border-[#1f1f1f] dark:bg-[#111111]">
        <Link href={`/courses/${courseId}`} className="flex items-center gap-1.5 text-sm text-[#666666] transition-colors hover:text-[#ff8c00] dark:text-[#94a3b8]">
          <ChevronLeft className="h-4 w-4" />
          Back to course
        </Link>
        <span className="hidden text-[#e0e0e0] dark:text-[#1f1f1f] sm:block">|</span>
        <span className="hidden truncate text-sm font-semibold text-[#1a1a1a] dark:text-[#f1f5f9] sm:block">
          {course.title}
        </span>
        <div className="ml-auto flex items-center gap-3">
          {/* Progress */}
          <div className="hidden items-center gap-2 sm:flex">
            <div className="h-1.5 w-32 overflow-hidden rounded-full bg-[#e0e0e0] dark:bg-[#1f1f1f]">
              <div className="h-full rounded-full bg-[#ff8c00]" style={{ width: `${progressPercent}%` }} />
            </div>
            <span className="text-xs font-semibold text-[#ff8c00]">{progressPercent}%</span>
          </div>
          {/* Sidebar toggle */}
          <button
            onClick={() => setSidebarOpen((o) => !o)}
            className="rounded-lg border border-[#e0e0e0] p-1.5 text-[#666666] transition-colors hover:border-[#ff8c00] hover:text-[#ff8c00] dark:border-[#1f1f1f] dark:text-[#94a3b8]"
            aria-label="Toggle lesson sidebar"
          >
            <BookOpen className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* ── MAIN AREA ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── VIDEO + BELOW ── */}
        <div className="flex flex-1 flex-col overflow-y-auto">

          {/* Video */}
          <div className="w-full bg-black">
            <div className="mx-auto max-w-5xl">
              <VideoPlayer
                url={videoUrl}
                title={currentLesson.title}
                onEnded={markComplete}
                onProgress={(p) => setProgress(Math.round(p * 100))}
              />
            </div>
          </div>

          {/* Lesson meta */}
          <div className="border-b border-[#e0e0e0] bg-[#f5f5f5] px-4 py-4 dark:border-[#1f1f1f] dark:bg-[#111111]">
            <div className="mx-auto max-w-5xl">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="text-lg font-extrabold">
                    <span className="bg-gradient-to-r from-[#ff8c00] to-[#ff6b35] bg-clip-text text-transparent">
                      {currentLesson.title}
                    </span>
                  </h1>
                  <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-[#666666] dark:text-[#94a3b8]">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-[#ff8c00]" />
                      {currentLesson.duration}
                    </span>
                    <span className="text-[#ff8c00] transition-colors hover:text-[#ff6b35] cursor-pointer font-medium">
                      {course.instructor.name}
                    </span>
                    <span>{progress}% watched</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {/* Prev */}
                  {prevItem && (
                    <Link
                      href={`/courses/${courseId}/learn/${prevItem.lesson.id}`}
                      className="flex items-center gap-1.5 rounded-lg border border-[#e0e0e0] px-3 py-2 text-xs font-medium text-[#666666] transition-all hover:border-[#ff8c00] hover:text-[#ff8c00] dark:border-[#1f1f1f] dark:text-[#94a3b8]"
                    >
                      <ChevronLeft className="h-3.5 w-3.5" />
                      Previous
                    </Link>
                  )}

                  {/* Mark complete */}
                  <button
                    onClick={markComplete}
                    className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-all ${
                      completed.has(lessonId)
                        ? 'bg-[#ff8c00]/15 text-[#ff8c00]'
                        : 'border border-[#ff8c00] text-[#ff8c00] hover:bg-[#ff8c00] hover:text-white'
                    }`}
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    {completed.has(lessonId) ? 'Completed' : 'Mark Complete'}
                  </button>

                  {/* Next */}
                  {nextItem && (
                    <Link
                      href={`/courses/${courseId}/learn/${nextItem.lesson.id}`}
                      className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-[#ff8c00] to-[#ff6b35] px-3 py-2 text-xs font-semibold text-white transition-all hover:shadow-md hover:shadow-[#ff8c00]/20"
                    >
                      Next
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Below video: Notes / Q&A / Resources */}
          <div className="flex-1 px-4 py-6">
            <div className="mx-auto max-w-5xl">
              {/* Tab switcher (mobile-friendly) */}
              <div className="mb-6 flex gap-1 rounded-xl border border-[#e0e0e0] bg-[#f5f5f5] p-1 dark:border-[#1f1f1f] dark:bg-[#111111]">
                {(
                  [
                    { id: 'notes', label: '📝 Notes' },
                    { id: 'qa', label: '💬 Q&A' },
                    { id: 'resources', label: '📥 Resources' },
                  ] as const
                ).map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => setBottomTab(id)}
                    className={`flex-1 rounded-lg py-2 text-xs font-semibold transition-all ${
                      bottomTab === id
                        ? 'bg-[#ff8c00] text-white shadow-sm'
                        : 'text-[#666666] hover:text-[#ff8c00] dark:text-[#94a3b8]'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {bottomTab === 'notes' && <NotesPanel lessonId={lessonId} />}
              {bottomTab === 'qa' && <QAPanel />}
              {bottomTab === 'resources' && <ResourcesPanel courseId={courseId} />}
            </div>
          </div>
        </div>

        {/* ── LESSON SIDEBAR ── */}
        {sidebarOpen && (
          <aside className="hidden w-80 shrink-0 overflow-y-auto border-l border-[#e0e0e0] bg-white dark:border-[#1f1f1f] dark:bg-[#0a0a0a] lg:flex lg:flex-col">
            {/* Sidebar header */}
            <div className="border-b border-[#e0e0e0] px-4 py-3 dark:border-[#1f1f1f]">
              <p className="text-xs font-bold text-[#1a1a1a] dark:text-[#f1f5f9]">Course Content</p>
              {/* Progress bar */}
              <div className="mt-2 flex items-center gap-2">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#e0e0e0] dark:bg-[#1f1f1f]">
                  <div className="h-full rounded-full bg-[#ff8c00] transition-all" style={{ width: `${progressPercent}%` }} />
                </div>
                <span className="text-xs font-bold text-[#ff8c00]">{progressPercent}%</span>
              </div>
              {/* Next lesson */}
              {nextItem && (
                <Link
                  href={`/courses/${courseId}/learn/${nextItem.lesson.id}`}
                  className="mt-2 flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-[#ff8c00] to-[#ff6b35] px-3 py-2 text-xs font-semibold text-white transition-all hover:shadow-md"
                >
                  Next: {nextItem.lesson.title.slice(0, 30)}…
                  <ChevronRight className="h-3.5 w-3.5 shrink-0" />
                </Link>
              )}
            </div>

            {/* Lesson list */}
            <div className="flex-1 divide-y divide-[#e0e0e0] dark:divide-[#1f1f1f]">
              {course.curriculum.map((section) => (
                <SidebarSection
                  key={section.id}
                  section={section}
                  currentLessonId={lessonId}
                  completedIds={completed}
                  courseId={courseId}
                  defaultOpen={section.id === currentSectionId}
                />
              ))}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
