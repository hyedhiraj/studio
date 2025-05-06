
import { KaizenMethodologies } from '@/components/kaizen/kaizen-methodologies';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { SidebarInset } from '@/components/ui/sidebar';

export default function Home() {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-col flex-1 min-h-screen">
          <main className="flex-1 p-4 md:p-8">
            <KaizenMethodologies />
          </main>
        </div>
      </SidebarInset>
    </div>
  );
}
