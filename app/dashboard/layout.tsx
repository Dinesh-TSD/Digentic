import { DashboardShell } from '@/components/shared/DashboardShell';
import { UserSidebar } from '@/components/user/UserSidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardShell role="user" sidebar={<UserSidebar />}>
      {children}
    </DashboardShell>
  );
}
