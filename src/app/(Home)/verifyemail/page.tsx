import VerifyEmail from '@/components/Landingpage/Verifyemail'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
<VerifyEmail />
</Suspense>
  )
}

export default page
