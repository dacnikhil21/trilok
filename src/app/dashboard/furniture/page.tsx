import { DashboardScreen } from "@/components/dashboard/DashboardScreen"
import { DASHBOARD_CONFIGS } from "@/lib/dashboard-configs"

export default function FurnitureDashboardPage() {
  return <DashboardScreen config={DASHBOARD_CONFIGS.furniture} />
}
