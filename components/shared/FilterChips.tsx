interface FilterChipsProps {
  items: string[];
  active: string;
  onChange: (item: string) => void;
}

export function FilterChips({ items, active, onChange }: FilterChipsProps) {
  return (
    <div className="flex flex-wrap gap-1.5 px-4 py-3">
      {items.map((item) => {
        const isActive = item === active;
        return (
          <button
            key={item}
            onClick={() => onChange(item)}
            className="rounded-full border px-[10px] py-[3px] text-[12px] font-medium transition-colors"
            style={
              isActive
                ? { background: 'rgba(255,140,0,0.10)', color: '#ff8c00', borderColor: '#ff8c00' }
                : { background: 'var(--dt-border)', color: 'var(--dt-muted)', borderColor: 'var(--dt-border)' }
            }
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}
