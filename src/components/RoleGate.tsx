'use server';

import DeniedPage from "@/app/(main)/denied/page";
import {auth} from "@/auth";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: boolean;
}

export const RoleGate = async ({
  children,
  allowedRole,
}: RoleGateProps) => {
  const session = await auth();
  const role = session?.user.isAdmin;

  if (role !== allowedRole) {
    return <DeniedPage />;
  }

  return (
    <>
      {children}
    </>
  );
};