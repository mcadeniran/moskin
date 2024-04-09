import FooterSection from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex flex-col justify-between bg-red-400'>
      <Header />

      <main className='flex flex-col  items-center justify-between'>
        {children}
      </main>
      <FooterSection />
    </div>
  );
}
