import React from 'react';

const TitleComponenet = ({title}: {title: string;}) => {
  return (
    <div className="inline-flex items-center justify-center w-full">
      <hr className="w-full h-px my-4  border-rosegold" />
      <span className="absolute px-3 bg-white font-medium text-lg md:text-2xl  -translate-x-1/2  left-1/2">{title}</span>
    </div>
  );
};

export default TitleComponenet;