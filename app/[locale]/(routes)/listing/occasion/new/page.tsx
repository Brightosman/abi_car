import React from 'react'
import { useUser } from '@clerk/nextjs

export default function page() {
    const { user} = useUser()
  return (
    <div>page</div>
  )
}
