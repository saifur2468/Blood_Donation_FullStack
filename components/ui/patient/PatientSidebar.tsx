// "use client";

// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { FaChartPie, FaFileMedical, FaPlusCircle, FaCreditCard, FaUser } from 'react-icons/fa';

// export default function PatientSidebar() {
//   const pathname = usePathname();

//   const menuItems = [
//     { name: 'Dashboard', href: '/dashboard', icon: <FaChartPie /> },
//     { name: 'My Requests', href: '/dashboard/patient/my-requests', icon: <FaFileMedical /> },
//     { name: 'Create Request', href: '/dashboard/patient/create-request', icon: <FaPlusCircle /> },
//     { name: 'Payment History', href: '/dashboard/patient/payments', icon: <FaCreditCard /> },
//     { name: 'My Profile', href: '/dashboard/profile', icon: <FaUser /> },
//   ];

//   return (
//     <aside className="w-64 bg-white border-r border-slate-100 min-h-screen p-6 hidden md:block">
//       <div className="mb-8">
//         <h2 className="text-xl font-bold text-slate-800">Patient Panel</h2>
//         <p className="text-xs text-slate-400">Blood Request Dashboard</p>
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