// "use client";

// import { useLocale } from 'next-intl';
// import { useRouter } from 'next/navigation';
// import { ChangeEvent, useTransition } from 'react';
// import Image from 'next/image';

// export default function LocaleSwitcher() {
//   const [isPending, startTransition] = useTransition();
//   const router = useRouter();
//   const localActive = useLocale();

//   const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
//     const nextLocale = e.target.value;
//     startTransition(() => {
//       router.replace(`/${nextLocale}`);
//     });
//   };

//   return (
//     <div>
//       <label className="border-2 rounded">
//         <p className="sr-only">Change Language</p>
//         <select
//           defaultValue={localActive}
//           className="bg-transparent py-2"
//           onChange={onSelectChange}
//           disabled={isPending}
//         >
//           <option value="en">
//             {/* EN&emsp;English */}
//             <Image
//                     src="/fr-flag.png"
//                     alt="French"
//                     width={24}
//                     height={16}
//                     className="rounded"
//                   />
//                   <span>English</span>
//           </option>
//           <option value="fr">
//             {/* 🇫🇷&emsp;Française */}
//             <Image
//                     src="/en-flag.png"
//                     alt="English"
//                     width={24}
//                     height={16}
//                     className="rounded"
//                   />
//                   <span>Française</span>

//           </option>
//         </select>
//       </label>
//     </div>
//   );
// }


"use client";

import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';

export default function LocaleSwitcher() {
  const router = useRouter();
  const localActive = useLocale();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleLocaleChange = (nextLocale: string) => {
    router.replace(`/${nextLocale}`);
    setDropdownOpen(false);
  };

  return (
    <div className="relative">
      {/* Current Language Display */}
      <button
        className="flex items-center border border-gray-300 rounded px-4 py-2 bg-transparent"
        onClick={() => setDropdownOpen(!isDropdownOpen)}
      >
        <Image
          src={localActive === "en" ? "/en-flag.png" : "/fr-flag.png"}
          alt={localActive === "en" ? "English" : "French"}
          width={24}
          height={16}
          className="rounded mr-2"
        />
        <span>{localActive === "en" ? "English" : "Française"}</span>
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <ul className="absolute left-0 mt-2 w-full bg-transparent border border-gray-300 rounded shadow-lg">
          <li
            className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 hover:bg-opacity-20"
            onClick={() => handleLocaleChange("en")}
          >
            <Image
              src="/en-flag.png"
              alt="English"
              width={24}
              height={16}
              className="rounded mr-2"
            />
            English
          </li>
          <li
            className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 hover:bg-opacity-20"
            onClick={() => handleLocaleChange("fr")}
          >
            <Image
              src="/fr-flag.png"
              alt="French"
              width={24}
              height={16}
              className="rounded mr-2"
            />
            Française
          </li>
        </ul>
      )}
    </div>
  );
}
