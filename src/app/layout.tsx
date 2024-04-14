import type {Metadata} from 'next';
import {Lato} from 'next/font/google';
import './globals.css';
import {Toaster} from '@/components/ui/sonner';
import Provider from '@/components/Provider';
import QueryProvider from '@/components/QueryProvider';

const lato = Lato({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700', '900'],
  style: ['italic', 'normal'],
});

export const metadata: Metadata = {
  title: 'Mo Skin Care',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className='h-full bg-white'
    >
      <body className={lato.className} suppressHydrationWarning={true}>
        <Provider>
          <QueryProvider>
            <div>
              {children}
            </div>
            <Toaster />
          </QueryProvider>
        </Provider>
      </body>
    </html>
  );
}
