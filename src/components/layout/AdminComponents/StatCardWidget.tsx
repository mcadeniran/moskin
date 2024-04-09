import React from 'react';
import {MdPeople} from 'react-icons/md';

export default function StatCardWidget({stat}: {
  stat: {
    title: string,
    icon: any,
    value: string,
    percentage: number;
  };
}) {
  return (
    <div className="p-5 flex border rounded-lg gap-3 cursor-pointer hover:bg-gray-100">
      {stat.icon}
      <div className="flex flex-col gap-3">
        <span className="">{stat.title}</span>
        <span className=" text-2xl font-medium">{stat.value}</span>
        <span className=" text-sm font-light">
          <span className={`${stat.percentage < 0 ? 'text-red-600' : 'text-lime-500'}   font-medium`}>
            {stat.percentage}%</span>{' '} <span className="">more than last month</span>
        </span>
      </div>
    </div>
  );
}
