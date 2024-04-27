'use client';

import {signOut} from "@/auth";
import {SignOut} from "@phosphor-icons/react/dist/ssr";
import {Button} from "./ui/button";
import {logout} from "@/actions/logout";
// import {signOut} from "next-auth/react";

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