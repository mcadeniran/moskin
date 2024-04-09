import ChartWidget from '@/components/layout/AdminComponents/ChartWidget';
import StatCardWidget from '@/components/layout/AdminComponents/StatCardWidget';
import TransactionWidget from '@/components/layout/AdminComponents/TransactionWidget';
import React from 'react';
import {MdPeople} from 'react-icons/md';
import {LuView, LuLineChart, LuUsers2} from "react-icons/lu";

const stats = [
  {
    title: 'Total Users',
    icon: <LuUsers2 size={24} />,
    value: '1,597',
    percentage: 9.6,
  },
  {
    title: 'Total Visits',
    icon: <LuView size={24} />,
    value: '19,550',
    percentage: -4,
  },
  {
    title: 'Total Sales',
    icon: <LuLineChart size={24} />,
    value: '₦876,000',
    percentage: 13,
  }
];

export default function Admin() {
  return (
    <div className=''>
      <div className="grid grid-cols-3 gap-5">
        {
          stats.map(stat => (
            <StatCardWidget key={stat.title} stat={stat} />
          ))
        }
      </div>
      <TransactionWidget />
      <ChartWidget />
    </div>
  );
}
