import {RoleGate} from "@/components/RoleGate";
import AdminNavbar from "@/components/layout/AdminComponents/AdminNavbar";
import AdminSidebar from "@/components/layout/AdminComponents/AdminSidebar";
import FooterSection from "@/components/layout/Footer";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RoleGate allowedRole={true}>
      <div className='flex'>
        <div className=' basis-1/6 p-4 bg-accent min-h-screen border-r'>
          <AdminSidebar />
        </div>
        <div className=" basis-5/6 px-4 pt-4">
          <AdminNavbar />
          {children}
          <FooterSection />
        </div>
      </div>
    </RoleGate>
  );
}
