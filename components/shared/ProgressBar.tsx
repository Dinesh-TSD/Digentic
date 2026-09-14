interface ProgressBarProps {
  value: number; // 0–100
  className?: string;
}

export function ProgressBar({ value, className = '' }: ProgressBarProps) {
  return (
    <div
      className={`h-1 overflow-hidden rounded-full ${className}`}
      style={{ background: 'var(--dt-border)' }}
    >
      <div
        className="h-1 rounded-full transition-all duration-300 ease-out"
        style={{
          width: `${Math.min(100, Math.max(0, value))}%`,
          background: 'linear-gradient(90deg, #ff8c00, #ff6b35)',
        }}
      />
    </div>
  );
}
