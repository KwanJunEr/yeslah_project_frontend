import Link from 'next/link'
import { BarChart2, Home, Phone, Settings, Users, MessageSquare } from 'lucide-react';

const navItems = [
  { icon: Home, label: 'Dashboard', href: '/dashboard' },
  { icon: Phone, label: 'Vishing Attempts', href: '/dashboard/vishing' },
  { icon: MessageSquare, label: 'Smishing Attempts', href: '/dashboard/smishing' }, // New Smishing Page
  { icon: Users, label: 'Employees', href: '/dashboard/employees' },
  { icon: BarChart2, label: 'Reports', href: '/dashboard/reports' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
]

export default function DashboardSidebar() {
  return (
    <aside className="w-64 bg-white dark:bg-gray-800 shadow-sm">
      <nav className="mt-5 px-2">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <item.icon className="mr-4 h-6 w-6" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
