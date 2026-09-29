// "use client";

// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { FaChartPie, FaUsers, FaShieldAlt, FaFileAlt, FaCogs, FaListAlt } from 'react-icons/fa';

// export default function AdminSidebar() {
//   const pathname = usePathname();

//   const menuItems = [
//     { name: 'Dashboard', href: '/dashboard/admin', icon: <FaChartPie /> },
//     { name: 'Users', href: '/dashboard/admin/users', icon: <FaUsers /> },
//     { name: 'Roles', href: '/dashboard/admin/roles', icon: <FaShieldAlt /> },
//     { name: 'Reports', href: '/dashboard/admin/reports', icon: <FaFileAlt /> },
//     { name: 'Requests', href: '/dashboard/admin/requests', icon: <FaListAlt /> },
//     { name: 'Audit Logs', href: '/dashboard/admin/audit-logs', icon: <FaCogs /> },
//   ];

//   return (
//     <aside className="w-64 bg-white border-r border-slate-100 min-h-screen p-6 hidden md:block">
//       <div className="mb-8">
//         <h2 className="text-xl font-bold text-slate-800">Admin Panel</h2>
//         <p className="text-xs text-slate-400">Management Dashboard</p>
//       </div>
//       <nav className="space-y-2">
//         {menuItems.map((item) => {
//           const isActive = pathname === item.href;
//           return (
//             <Link
//               key={item.name}
//               href={item.href}
//               className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-colors ${
//                 isActive
//                   ? 'bg-red-50 text-red-600 font-semibold'
//                   : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
//               }`}
//             >
//               <span className="text-lg">{item.icon}</span>
//               {item.name}
//             </Link>
//           );
//         })}
//       </nav>
//     </aside>
//   );
// }