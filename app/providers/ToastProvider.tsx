// But if you're planning to customize the Toaster or add more context in the future,
// encapsulating it in ToastProvider would be a good practice.

import { Toaster } from 'react-hot-toast'

const ToastProvider = () => {
  // The Toaster component handles the display of toast notifications in your app
  return (
    <Toaster />
  )
}

export default ToastProvider
