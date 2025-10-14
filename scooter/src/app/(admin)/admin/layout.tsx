import { AdminSidebar } from "@/components/admin-sidebar"
import { ConfirmationProvider } from '@/components/use-confirm';
export default function DashboardLayout({children}: {children: React.ReactNode}) {

    return (
    <div className="min-h-screen bg-muted/30">
      <AdminSidebar />
   
      <main className="lg:pl-64">
        <div className="container py-8">
          <ConfirmationProvider>
                {children}
          </ConfirmationProvider>
          </div>
      </main>
    </div>
  )
   
}