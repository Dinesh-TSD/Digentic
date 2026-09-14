import { FileText, Heart, FilePen, GraduationCap } from 'lucide-react';
import { StatCard } from '@/components/shared/StatCard';
import { BarChart } from '@/components/admin/BarChart';
import { DraftCard } from '@/components/admin/DraftCard';
import { PageHeader } from '@/components/shared/PageHeader';

export default function AdminOverviewPage() {
  return (
    <>
      <PageHeader title="Overview" role="admin" />

      <div className="p-4">
        {/* Stat Cards */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          <StatCard value="128" label="Total posts" icon={FileText} />
          <StatCard value="3.2k" label="Total likes" icon={Heart} />
          <StatCard value="6" label="Drafts" icon={FilePen} />
          <StatCard value="14" label="Courses" icon={GraduationCap} />
        </div>

        {/* Bar Chart */}
        <div className="mb-4">
          <BarChart />
        </div>

        {/* Recent Drafts */}
        <div className="mb-4">
          <h2 className="mb-2 px-1 text-[14px] font-semibold" style={{ color: 'var(--dt-text)' }}>
            Recent drafts
          </h2>
          <DraftCard title="Building RAG pipelines with LangChain" time="2 hours ago" tag="AI" />
          <DraftCard title="Next.js 15 middleware patterns" time="5 hours ago" tag="Next.js" />
          <DraftCard title="MongoDB aggregation recipes" time="Yesterday" tag="MERN" />
        </div>
      </div>
    </>
  );
}
