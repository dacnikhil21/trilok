import { DashboardScreen } from "@/components/dashboard/DashboardScreen"
import { DASHBOARD_CONFIGS } from "@/lib/dashboard-configs"

export default function RentalDashboardPage() {
  return <DashboardScreen config={DASHBOARD_CONFIGS.rental} />
}
