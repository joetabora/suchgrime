import { Routes, Route } from "react-router-dom"
import { ScrollToTop } from "./components/ScrollToTop"
import { AgencyHomePage } from "./pages/AgencyHomePage"
import { BlockAndBladePage } from "./pages/BlockAndBladePage"
import { DeadsetInkPage } from "./pages/DeadsetInkPage"
import { ParlorDeskPage } from "./pages/ParlorDeskPage"
import { DashboardView } from "./components/parlor-desk/views/DashboardView"
import { AppointmentsView } from "./components/parlor-desk/views/AppointmentsView"
import { ClientsView } from "./components/parlor-desk/views/ClientsView"

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
      <Route path="/" element={<AgencyHomePage />} />
      <Route path="/work/block-and-blade" element={<BlockAndBladePage />} />
      <Route path="/work/deadset-ink" element={<DeadsetInkPage />} />
      <Route path="/work/parlor-desk" element={<ParlorDeskPage />}>
        <Route index element={<DashboardView />} />
        <Route path="appointments" element={<AppointmentsView />} />
        <Route path="clients" element={<ClientsView />} />
      </Route>
      </Routes>
    </>
  )
}

export default App
