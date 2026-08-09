import { DashboardScreen } from "@/components/dashboard/DashboardScreen"
import { DASHBOARD_CONFIGS } from "@/lib/dashboard-configs"

export default function OthersDashboardPage() {
  return <DashboardScreen config={DASHBOARD_CONFIGS.others} />
}
