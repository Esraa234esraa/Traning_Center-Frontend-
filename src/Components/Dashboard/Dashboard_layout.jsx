import React from 'react';
import { Outlet } from 'react-router-dom'; // لو بتستخدم react-router v6
import Sidebar from '../Dashboard/SideNavBar'; // لو عندك مكون Sidebar خاص بالادمن

export default function AdminDashboardLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 md:pr-72 overflow-auto">
        <Outlet />
      </main>

    </div>
  );
}
