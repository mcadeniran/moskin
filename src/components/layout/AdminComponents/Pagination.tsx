import React from 'react';

export default function Pagination() {
  return (
    <div className='flex justify-between p-2'>
      <button className='px-3 py-2 rounded-lg bg-slate-500 text-white disabled:cursor-not-allowed disabled:bg-slate-300' disabled>Previous</button>
      <button className='px-3 py-2 rounded-lg bg-slate-500 text-white disabled:cursor-not-allowed disabled:bg-slate-300'>Next</button>
    </div>
  );
}
