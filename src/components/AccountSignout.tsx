'use client';

import {logout} from "@/actions/logout";

interface AccountSignoutProps {
  children?: React.ReactNode;
}


function AccountSignout({children}: AccountSignoutProps) {
  const onClick = () => {
    logout();
  };

  return (
    <span onClick={onClick} className="py-4 px-2 cursor-pointer flex items-center hover:bg-accent">
      {children}
    </span>
  );
}

export default AccountSignout;