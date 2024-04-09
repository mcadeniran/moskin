import ShopSidebar from "@/components/ShopSidebar";

export default function ShopLayout({children}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="flex w-full ">
    <div className="w-1/6 hidden md:flex flex-col sticky top-20 h-[calc(100vh-128px)]">
      <ShopSidebar />
    </div>
    <div className="flex-grow w-5/6">
      {children}
    </div>
  </div>;
}