import React from 'react';
import { LayoutDashboard, BookOpen, FileText, LineChart, UserCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const tabs = [
  { name: 'Dashboard', icon: <LayoutDashboard />, color: '#F0DD63', path: '/dashboard' },
  { name: 'My Bookings', icon: <BookOpen />, color: '#D1DC80', path: '/my-bookings' },
  { name: 'Accounts', icon: <FileText />, color: '#E0959A', path: '/accounts' },
  { name: 'Sales', icon: <LineChart />, color: '#BE94C3', path: '/sales' },
  { name: 'User Management', icon: <UserCircle />, color: '#ACA171', path: '/user-management' },
  { name: 'My Profile', icon: <UserCircle />, color: '#DCA171', path: '/my-profile' },
];

const DashboardHeader = () => {
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <div className="flex justify-around items-center p-2 md:flex-row flex-col md:ml-[100px] md:mr-[100px] lg:ml-[300px] lg:mr-[300px]">
      {tabs.map((tab) => (
        <div
          key={tab.name}
          className="flex flex-col items-center cursor-pointer text-center text-gray-800 hover:text-black transition-colors"
          onClick={() => navigateTo(tab.path)}
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mb-0.5"
            style={{ backgroundColor: tab.color }}
          >
            <span className="text-white text-2xl">{tab.icon}</span>
          </div>
          <span className="text-sm font-medium">{tab.name}</span>
        </div>
      ))}
    </div>
  );
};

export default DashboardHeader;
