import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import AdminSidebar from './_components/AdminSidebar'
import AdminTopbar from './_components/AdminTopbar'

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  const userEmail = user.email ?? ''

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Desktop sidebar — always visible on lg+ */}
      <div className="hidden lg:flex">
        <AdminSidebar userEmail={userEmail} open={true} />
      </div>

      {/* Right panel: topbar + scrollable content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar: handles mobile sidebar + breadcrumb + user */}
        <AdminTopbar userEmail={userEmail} />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
