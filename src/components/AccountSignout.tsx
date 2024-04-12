'use client';

import {SignOut} from "@phosphor-icons/react/dist/ssr";
import {signOut} from "next-auth/react";

function AccountSignout() {
  return (
    <div className="flex items-center" onClick={() => signOut({
      redirect: true,
      callbackUrl: `${window.location.origin}/login`
    })}>
      <SignOut className="mr-2 h-4 w-4" />
      <span>Log out</span>
    </div>
  );
}

export default AccountSignout;