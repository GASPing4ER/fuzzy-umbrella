"use client"

import UserDashboard from "@/components/user-dashboard/user-dashboard";

export default function ProfileLayout({ children }) {
  return (
    <div>
        <UserDashboard />
        {children}
    </div>
  )
}
