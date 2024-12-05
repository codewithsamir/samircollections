import React, { Suspense } from 'react'
import ForgotPassword from '@/components/Landingpage/Resetpassword'

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <ForgotPassword />
    </Suspense>
  )
}

export default page
