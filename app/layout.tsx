import './globals.css'
import { Nunito } from 'next/font/google'
import Navbar from './components/navbar/Navbar'
import Modals from './components/modals/Modals'
import LoginModal from './components/modals/LoginModal';
import RegisterModal from './components/modals/RegisterModal';
import ToastProvider from './providers/ToastProvider';
import getCurrentUser from './action/getCurrentUser';

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
        <ToastProvider />
        <LoginModal />
        <RegisterModal />
        <Navbar currentUser={currentUser}  />
        {children}
      </body>
    </html>
  );
}
