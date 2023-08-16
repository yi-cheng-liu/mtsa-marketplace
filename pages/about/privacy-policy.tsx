import React from 'react'
import PrivacyPolicy from '../../app/components/about/privacy-policy'

export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />
}


// import React from 'react'
// import PrivacyPolicy from '../../app/components/about/privacy-policy'
// import { Nunito_Sans } from 'next/font/google'
// import Navbar from '../../app/components/navbar/Navbar'
// import ClientOnly from '../../app/components/ClientOnly'
// import SellModal from '../../app/components/modals/SellModal'
// import LoginModal from '../../app/components/modals/LoginModal'
// import RegisterModal from '../../app/components/modals/RegisterModal'
// import ToastProvider from '../../app/providers/ToastProvider'
// import getCurrentUser from '../../app/actions/getCurrentUser'

// const font = Nunito_Sans({ subsets: ['latin'] })

// export default async function PrivacyPolicyPage() {
//   const currentUser = await getCurrentUser()
//   return (
//     <html lang="en">
//       <body className={font.className}>
//         <ClientOnly>
//           <ToastProvider />
//           <SellModal />
//           <LoginModal />
//           <RegisterModal />
//           <Navbar currentUser={currentUser} />
//         </ClientOnly>
//         <PrivacyPolicy />
//       </body>
//     </html>
//   )
// }

