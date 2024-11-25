import React from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

export default function page() {
    const { user} = useUser()
  return (
    <div>page</div>
  )
}
