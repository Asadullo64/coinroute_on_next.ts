import { Inter } from 'next/font/google';


import ReduxProvider from '@/redux/redux-provovider';

import "../src/assets/sass/index.scss";


const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'CoinRoutes App by Asadullo',
  description: 'Crypto data visualization by Asadullo',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
