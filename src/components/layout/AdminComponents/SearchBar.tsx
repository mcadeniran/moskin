import React from 'react';
import {MdSearch} from 'react-icons/md';

export default function SearchBar({placeholder}: {
  placeholder: string;
}) {
  return <div className="flex items-center gap-x-2  bg-accent  p-1 rounded-lg">
    <MdSearch />
    <input type="text" className="bg-input rounded-lg border-none px-2 py-2" placeholder={placeholder} />
  </div>;
}
