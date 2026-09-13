'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  SkipBack,
  SkipForward,
} from 'lucide-react';

interface VideoPlayerProps {
  url: string;
  title?: string;
  onEnded?: () => void;
  onProgress?: (played: number) => void;
}

function fmt(s: number) {
  if (!s || isNaN(s)) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${String(sec).padStart(2, '0')}`;
}

export function VideoPlayer({ url, title, onEnded, onProgress }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hideRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [canPlay, setCanPlay] = useState(false);
  const [loading, setLoading] = useState(true);

  // ── play / pause ─────────────────────────────────────────────────────────
  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v || !canPlay) return;
    if (v.paused) {
      v.play().catch((e) => setError(`Playback error: ${e.message}`));
    } else {
      v.pause();
    }
  }, [canPlay]);

  // ── skip ─────────────────────────────────────────────────────────────────
  const skip = useCallback((secs: number) => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = Math.max(0, Math.min(v.currentTime + secs, v.duration || 0));
  }, []);

  // ── volume / mute ────────────────────────────────────────────────────────
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    setMuted(val === 0);
    if (videoRef.current) videoRef.current.volume = val;
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    const next = !muted;
    setMuted(next);
    v.muted = next;
  };

  // ── seek ─────────────────────────────────────────────────────────────────
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = videoRef.current;
    if (!v || !duration) return;
    const t = parseFloat(e.target.value) * duration;
    v.currentTime = t;
    setCurrentTime(t);
  };

  // ── fullscreen ───────────────────────────────────────────────────────────
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const onFsChange = () => setFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  // ── control-bar auto-hide ─────────────────────────────────────────────────
  const resetHide = useCallback(() => {
    setShowControls(true);
    if (hideRef.current) clearTimeout(hideRef.current);
    hideRef.current = setTimeout(() => {
      if (videoRef.current && !videoRef.current.paused) setShowControls(false);
    }, 3000);
  }, []);

  // ── keyboard shortcuts ───────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!containerRef.current) return;
      if (document.activeElement !== document.body &&
          !containerRef.current.contains(document.activeElement)) return;
      if (e.code === 'Space') { e.preventDefault(); togglePlay(); }
      if (e.code === 'ArrowRight') { e.preventDefault(); skip(10); }
      if (e.code === 'ArrowLeft')  { e.preventDefault(); skip(-10); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [togglePlay, skip]);

  // ── sync volume to element when url changes ───────────────────────────────
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.volume = volume;
    v.muted = muted;
    // Reset state for new source
    setCurrentTime(0);
    setDuration(0);
    setBuffered(0);
    setPlaying(false);
    setCanPlay(false);
    setError(null);
    setLoading(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return (
    <div
      ref={containerRef}
      className="group relative w-full overflow-hidden rounded-xl bg-black"
      style={{ aspectRatio: '16/9' }}
      onMouseMove={resetHide}
      onMouseLeave={() => !videoRef.current?.paused && setShowControls(false)}
      tabIndex={0}
    >
      {/* ── Native video element ── */}
      <video
        ref={videoRef}
        src={url}
        className="h-full w-full object-contain"
        playsInline
        preload="metadata"
        onCanPlay={() => { setCanPlay(true); setLoading(false); }}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => {
          const v = e.currentTarget;
          setCurrentTime(v.currentTime);
          if (v.buffered.length > 0) {
            setBuffered(v.buffered.end(v.buffered.length - 1) / (v.duration || 1));
          }
          onProgress?.(v.duration > 0 ? v.currentTime / v.duration : 0);
        }}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onEnded={() => { setPlaying(false); onEnded?.(); }}
        onError={(e) => {
          const code = (e.currentTarget as HTMLVideoElement).error?.code;
          const msgs: Record<number, string> = {
            1: 'Playback aborted.',
            2: 'Network error.',
            3: 'Decode error.',
            4: 'Source not supported.',
          };
          setError(msgs[code ?? 0] ?? 'Unknown error.');
        }}
      />

      {/* ── Loading spinner ── */}
      {loading && !error && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/40">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-[#ff8c00]" />
        </div>
      )}

      {/* ── Error state ── */}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/80">
          <p className="text-sm font-semibold text-red-400">{error}</p>
          <p className="text-xs text-white/50">Check the video URL or try a different source.</p>
        </div>
      )}

      {/* ── Big play button (paused, no error, loaded) ── */}
      {!playing && !error && !loading && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center"
          aria-label="Play"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#ff8c00]/90 shadow-lg shadow-[#ff8c00]/40 backdrop-blur-sm transition-transform hover:scale-105">
            <Play className="h-7 w-7 translate-x-0.5 text-white" fill="white" />
          </div>
        </button>
      )}

      {/* ── Controls overlay ── */}
      {!error && (
        <div
          className={`absolute inset-x-0 bottom-0 flex flex-col gap-2 bg-gradient-to-t from-black/85 via-black/50 to-transparent px-4 pb-4 pt-12 transition-opacity duration-300 ${
            showControls || !playing ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
        >
          {/* Title */}
          {title && (
            <p className="line-clamp-1 text-sm font-semibold text-white/90">{title}</p>
          )}

          {/* Seek bar */}
          <div className="relative flex h-5 items-center">
            {/* Buffered */}
            <div
              className="pointer-events-none absolute left-0 h-1 rounded-full bg-white/25"
              style={{ width: `${buffered * 100}%` }}
            />
            <input
              type="range"
              min={0}
              max={1}
              step={0.001}
              value={duration > 0 ? currentTime / duration : 0}
              onChange={handleSeek}
              className="relative z-10 h-1 w-full cursor-pointer appearance-none rounded-full bg-white/20 accent-[#ff8c00]"
              aria-label="Seek"
            />
          </div>

          {/* Button row */}
          <div className="flex items-center gap-3">
            <button onClick={() => skip(-10)} className="text-white/70 transition-colors hover:text-[#ff8c00]" aria-label="Skip back 10s">
              <SkipBack className="h-4 w-4" />
            </button>

            <button
              onClick={togglePlay}
              disabled={!canPlay}
              className="text-[#ff8c00] transition-transform hover:scale-110 disabled:opacity-40"
              aria-label={playing ? 'Pause' : 'Play'}
            >
              {playing
                ? <Pause className="h-5 w-5" fill="currentColor" />
                : <Play  className="h-5 w-5 translate-x-0.5" fill="currentColor" />
              }
            </button>

            <button onClick={() => skip(10)} className="text-white/70 transition-colors hover:text-[#ff8c00]" aria-label="Skip forward 10s">
              <SkipForward className="h-4 w-4" />
            </button>

            <span className="min-w-[90px] text-xs tabular-nums text-white/60">
              {fmt(currentTime)} / {fmt(duration)}
            </span>

            <div className="flex-1" />

            {/* Volume */}
            <div className="flex items-center gap-1.5">
              <button onClick={toggleMute} className="text-white/70 transition-colors hover:text-[#ff8c00]" aria-label={muted ? 'Unmute' : 'Mute'}>
                {muted || volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={muted ? 0 : volume}
                onChange={handleVolumeChange}
                className="h-1 w-16 cursor-pointer accent-[#ff8c00]"
                aria-label="Volume"
              />
            </div>

            {/* Fullscreen */}
            <button onClick={toggleFullscreen} className="text-white/70 transition-colors hover:text-[#ff8c00]" aria-label="Toggle fullscreen">
              {fullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
            </button>
          </div>
        </div>
      )}

      {/* Keyboard hint */}
      {showControls && !error && (
        <div className="pointer-events-none absolute right-3 top-3 rounded-lg bg-black/60 px-2.5 py-1.5 text-[10px] text-[#ff8c00]">
          Space · ← −10s · → +10s
        </div>
      )}
    </div>
  );
}
