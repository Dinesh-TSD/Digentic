interface PageHeaderProps {
  title: string;
  subtitle?: string;
  role?: 'admin' | 'user';
  actions?: React.ReactNode;
}

export function PageHeader({ title, subtitle, role, actions }: PageHeaderProps) {
  return (
    <div
      className="flex items-center justify-between border-b px-4 py-3"
      style={{ borderColor: 'var(--dt-border)', background: 'var(--dt-bg)' }}
    >
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-[15px] font-semibold" style={{ color: 'var(--dt-text)' }}>
            {title}
          </h1>
          {role && (
            <span
              className="rounded-full border px-[10px] py-[3px] text-[12px] font-medium"
              style={{ background: 'rgba(255,140,0,0.10)', borderColor: '#ff8c00', color: '#ff8c00' }}
            >
              {role === 'admin' ? 'Admin' : 'User'}
            </span>
          )}
        </div>
        {subtitle && (
          <p className="mt-0.5 text-[13px]" style={{ color: 'var(--dt-muted)' }}>
            {subtitle}
          </p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
