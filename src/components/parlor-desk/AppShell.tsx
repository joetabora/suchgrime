import { Outlet, useLocation } from "react-router-dom"
import { useBookingStore } from "../../hooks/useBookingStore"
import { Sidebar } from "./Sidebar"
import { TopBar } from "./TopBar"
import { AppointmentModal } from "./AppointmentModal"

const titles: Record<string, string> = {
  "/work/parlor-desk": "Dashboard",
  "/work/parlor-desk/appointments": "Appointments",
  "/work/parlor-desk/clients": "Clients",
}

export function AppShell() {
  const location = useLocation()
  const {
    modalOpen,
    editingAppointment,
    openModal,
    closeModal,
    addAppointment,
    updateAppointment,
  } = useBookingStore()

  const title = titles[location.pathname] ?? "Dashboard"

  function handleSave(data: Parameters<typeof addAppointment>[0]) {
    if (editingAppointment) {
      updateAppointment(editingAppointment.id, data)
    } else {
      addAppointment(data)
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-2.25rem)] pt-9">
      <Sidebar />
      <div className="ml-60 flex min-h-full flex-1 flex-col">
        <TopBar title={title} onNewAppointment={() => openModal()} />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>

      <AppointmentModal
        open={modalOpen}
        appointment={editingAppointment}
        onClose={closeModal}
        onSave={handleSave}
      />
    </div>
  )
}
