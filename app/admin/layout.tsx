import { DashboardShell } from '@/components/shared/DashboardShell';
import { AdminSidebar } from '@/components/admin/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardShell role="admin" sidebar={<AdminSidebar />}>
      {children}
    </DashboardShell>
  );
}
