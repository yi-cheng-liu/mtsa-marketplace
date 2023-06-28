import './globals.css'
import { Nunito } from 'next/font/google'
import Navbar from './components/navbar/Navbar'
import Modals from './components/modals/Modals'
import RegisterModal from './components/modals/RegisterModal';

const font = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: 'MTSA marketplace',
  description: 'mtsa buy and sell',
}

export default function RootLayout({children,}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <RegisterModal />
        <Navbar />        
        {children}
      </body>
    </html>
  )
}
