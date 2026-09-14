interface TagPillProps {
  label: string;
  variant?: 'default' | 'active' | 'outlined';
  onClick?: () => void;
}

export function TagPill({ label, variant = 'default', onClick }: TagPillProps) {
  const base = 'inline-flex items-center rounded-[6px] px-[7px] py-[1px] text-[12px] font-medium border transition-colors';

  if (variant === 'active') {
    return (
      <button onClick={onClick} className={`${base}`}
        style={{ background: 'rgba(255,140,0,0.10)', color: '#ff8c00', borderColor: '#ff8c00' }}
      >
        {label}
      </button>
    );
  }

  if (variant === 'outlined') {
    return (
      <span className={base}
        style={{ background: 'var(--dt-border)', color: '#ff8c00', borderColor: '#ff8c00' }}
      >
        {label}
      </span>
    );
  }

  return (
    <span className={base}
      style={{ background: 'var(--dt-border)', color: '#ff8c00', borderColor: '#ff8c00' }}
    >
      {label}
    </span>
  );
}
