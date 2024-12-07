import AddMakeForm from '@/app/[locale]/components/form/make/AddMakeForm'
import React, { FormEvent, Fragment, useState } from 'react'

export default function page() {
  return (
    <div className="bg-BG p-32px my-rounded-20 relative w-full h-full">
      <h2 className="section-title sm:mb-3 mb-2">Add Main Category</h2>
      <p className="my-text-16 gap-mb-40">Buy In Seconds</p>
      <AddMakeForm />
    </div>
  )
}
