'use client';

const barData = [
  { day: 'Mon', value: 45 },
  { day: 'Tue', value: 62 },
  { day: 'Wed', value: 38 },
  { day: 'Thu', value: 80 },
  { day: 'Fri', value: 55 },
  { day: 'Sat', value: 70 },
  { day: 'Sun', value: 90, isToday: true },
];

const maxValue = Math.max(...barData.map((d) => d.value));

export function BarChart() {
  return (
    <div
      className="rounded-[10px] border p-4"
      style={{ background: 'var(--dt-surface)', borderColor: 'var(--dt-border)' }}
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[14px] font-semibold" style={{ color: 'var(--dt-text)' }}>
          Page views — last 7 days
        </span>
      </div>
      <div className="flex items-end gap-2" style={{ height: 140 }}>
        {barData.map((item) => {
          const height = (item.value / maxValue) * 100;
          return (
            <div key={item.day} className="flex flex-1 flex-col items-center gap-1.5">
              <div className="w-full flex-1 flex items-end">
                <div
                  className="w-full rounded-t transition-all"
                  style={{
                    height: `${height}%`,
                    background: item.isToday ? '#ff8c00' : 'var(--dt-border)',
                  }}
                />
              </div>
              <span
                className="text-[12px]"
                style={{ color: item.isToday ? '#ff8c00' : 'var(--dt-muted)' }}
              >
                {item.day}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
