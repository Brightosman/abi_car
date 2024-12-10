import AddMakeForm from '@/app/[locale]/components/form/make/AddMakeForm'
import React, { FormEvent, Fragment, useState } from 'react'

export default function page() {
  return (
    <div className="lg:pt-[11.2rem] md:pt-[5.5rem] sm:pt-[84px] pt-[4.30rem] bg-primary-7">
      
      <AddMakeForm />
    </div>
  )
}
