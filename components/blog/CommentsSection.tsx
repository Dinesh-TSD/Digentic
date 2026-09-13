'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, MessageSquare, Check, Send } from 'lucide-react';

interface Comment {
  id: string;
  name: string;
  date: string;
  text: string;
  avatar: string;
}

const MOCK_COMMENTS: Comment[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    date: 'Aug 20, 2025',
    text: 'Fantastic article! The breakdown of agents vs chains finally clicked for me after reading this.',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    id: '2',
    name: 'Michael Chen',
    date: 'Aug 18, 2025',
    text: 'The code examples are spot-on. Saved me hours of digging through docs. Would love a follow-up on multi-agent systems.',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
];

const inputClass =
  'w-full rounded-lg border border-[#e0e0e0] bg-[#f5f5f5] px-4 py-2.5 text-sm text-[#1a1a1a] placeholder-[#666666] focus:border-[#ff8c00] focus:outline-none transition-colors dark:bg-[#0a0a0a] dark:border-[#1f1f1f] dark:text-[#f1f5f9] dark:placeholder-[#94a3b8] dark:focus:border-[#ff8c00]';

export function CommentsSection() {
  const [comments, setComments] = useState<Comment[]>(MOCK_COMMENTS);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    const newComment: Comment = {
      id: String(Date.now()),
      name: name.trim(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      text: text.trim(),
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=ff8c00&color=fff`,
    };
    setComments((prev) => [...prev, newComment]);
    setName('');
    setEmail('');
    setText('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="mt-12">
      <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-[#1a1a1a] dark:text-[#f1f5f9]">
        <MessageSquare className="h-5 w-5 text-[#ff8c00]" />
        <span>Comments</span>
        <span className="ml-1 rounded-full bg-[#ff8c00]/20 px-2 py-0.5 text-sm font-semibold text-[#ff8c00]">
          {comments.length}
        </span>
      </h2>

      {/* Existing comments */}
      <div className="mb-8 space-y-4">
        {comments.map((comment) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-4 rounded-lg border border-[#e0e0e0] bg-white p-4 dark:border-[#1f1f1f] dark:bg-[#111111]"
          >
            <Image
              src={comment.avatar}
              alt={comment.name}
              width={40}
              height={40}
              className="h-10 w-10 flex-shrink-0 rounded-full object-cover"
            />
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold text-[#1a1a1a] dark:text-[#f1f5f9]">{comment.name}</span>
                <span className="flex items-center gap-1 text-xs text-[#666666] dark:text-[#94a3b8]">
                  <Calendar className="h-3 w-3" />
                  {comment.date}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-[#444444] dark:text-[#94a3b8]">{comment.text}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Comment form */}
      <div className="rounded-lg border border-[#e0e0e0] bg-white p-6 dark:border-[#1f1f1f] dark:bg-[#111111]">
        <h3 className="mb-4 text-base font-semibold text-[#1a1a1a] dark:text-[#f1f5f9]">Leave a Comment</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#666666] dark:text-[#94a3b8]">
                Name <span className="text-[#ff8c00]">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#666666] dark:text-[#94a3b8]">
                Email{' '}
                <span className="text-xs text-[#666666]">(won&apos;t be published)</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={inputClass}
              />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[#666666] dark:text-[#94a3b8]">
              Comment <span className="text-[#ff8c00]">*</span>
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Share your thoughts..."
              required
              rows={4}
              className={`${inputClass} resize-none`}
            />
          </div>
          <button
            type="submit"
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#ff8c00] to-[#ff6b35] px-6 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-[#ff8c00]/20"
          >
            {submitted ? (
              <>
                <Check className="h-4 w-4" />
                Posted!
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Post Comment
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
