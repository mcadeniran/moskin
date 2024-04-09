import AdminNavbar from "@/components/layout/AdminComponents/AdminNavbar";
import AdminSidebar from "@/components/layout/AdminComponents/AdminSidebar";
import FooterSection from "@/components/layout/Footer";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex bg-white'>
      <div className=' basis-1/5 p-4 min-h-screen border-r'>
        <AdminSidebar />
      </div>
      <div className=" basis-4/5 p-4">
        <AdminNavbar />
        {children}
        <FooterSection />
      </div>
    </div>
  );
}
