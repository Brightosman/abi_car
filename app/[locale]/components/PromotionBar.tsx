// import React from 'react'

// export default function PromotionBar() {
//   return (
//     <div>
//         <div className="fixed inset-x-0 top-0 z-50">
//             <div className="bg-teal-600">
//                 <div className="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8">
//                     <div className="flex flex-col items-center justify-between lg:flex-row lg:justify-center">
//                         <div className="flex flex-1 items-center lg:mr-3 lg:flex-none">
//                             <p className="ml-3 text-center font-medium text-white">
//                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
//                                     stroke="currentColor" aria-hidden="true" className="mr-2 hidden h-6 w-6 lg:inline">
//                                     <path stroke-linecap="round" stroke-linejoin="round"
//                                         d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z">
//                                     </path>
//                                 </svg>To celebrate our
//                                 <span className="font-semibold">Big Version 3</span> release, use
//                                 <span className="font-black">VERSION3</span> code to get <span className="font-black">50% off</span>
//                             </p>
//                         </div>
//                         <div className="mt-2 w-full flex-shrink-0 lg:mt-0 lg:w-auto"><a
//                                 className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-teal-600 shadow-sm hover:bg-teal-50"
//                                 href="#pricing">Buy now
//                             </a>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
//   )
// }


import React from 'react';

export default function PromotionBar() {
  return (
    <div className="fixed inset-x-0 top-0 z-50 bg-teal-600">
      <div className="mx-auto max-w-7xl py-3 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between lg:flex-row lg:justify-center">
          <div className="flex items-center text-center lg:mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              aria-hidden="true"
              className="hidden h-6 w-6 mr-2 lg:inline"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
              />
            </svg>
            <p className="ml-3 text-sm font-medium text-white">
              To celebrate our <span className="font-semibold">Big Version 3</span> release, use{' '}
              <span className="font-black">VERSION3</span> code to get{' '}
              <span className="font-black">50% off</span>.
            </p>
          </div>
          <div className="mt-2 lg:mt-0">
            <a
              href="#pricing"
              className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-teal-600 shadow-sm hover:bg-teal-50"
            >
              Buy now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
