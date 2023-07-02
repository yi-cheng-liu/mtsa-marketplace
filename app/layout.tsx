import './globals.css'
import { Nunito } from 'next/font/google'
import Navbar from './components/navbar/Navbar'
import Modals from './components/modals/Modals'
import ClientOnly from './components/ClientOnly'
import SellModal from './components/modals/SellModal';
import LoginModal from './components/modals/LoginModal';
import RegisterModal from './components/modals/RegisterModal';
import ToastProvider from './providers/ToastProvider';
import getCurrentUser from './actions/getCurrentUser';

const font = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: 'MTSA marketplace',
  description: 'mtsa buy and sell',
}

export default async function RootLayout({children,}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToastProvider />
          <SellModal />
          <LoginModal />
          <RegisterModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div>
          {children}
        </div>
        
      </body>
    </html>
  );
}
