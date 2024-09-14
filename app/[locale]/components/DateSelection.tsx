'use client';

import React, { useState } from 'react';

// headless ui
import { Menu, MenuButton, MenuItems } from '@headlessui/react';

// icons
import { FaCalendarAlt } from 'react-icons/fa';
import { FaArrowRightLong } from 'react-icons/fa6';

// react date
import { DateRange, Range } from 'react-date-range';
import { format, addDays } from 'date-fns';

// react date range css
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

export default function DateSelection() {
  // Use the Range type from the react-date-range library
  const [date, setDate] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: undefined,
      key: 'selection',
    },
  ]);

  const handleSelect = (ranges: any) => {
    const selection = ranges.selection;
    setDate([selection]);
  };

  return (
    <Menu as="div" className="w-full h-full flex xl:flex-row">
      <div className="relative flex-1">
        {/* button */}
        <MenuButton className="dropdown-btn w-full h-full flex flex-col justify-center items-center xl:items-start xl:pl-8">
          <div className="flex flex-col xl:flex-row items-center xl:gap-x-2 gap-y-2 xl:gap-y-0">
            <FaCalendarAlt className="text-accent" />
            <div className="text-[15px] uppercase font-bold">Select Date</div>
          </div>
          <div className="flex items-center gap-x-3 xl:ml-6">
            <div className="text-[13px] font-medium text-secondary">
              {date[0].startDate ? format(date[0].startDate, 'dd/MM/yyyy') : 'Start Date'}
            </div>
            <FaArrowRightLong className="text-accent text-[12px]" />
            <div className="text-[13px] font-medium text-secondary">
              {date[0].endDate ? format(date[0].endDate as Date, 'dd/MM/yyyy') : 'End Date'}
            </div>
          </div>
        </MenuButton>

        {/* date picker menu */}
        <MenuItems className="dropdown-menu shadow-lg absolute -top-96 xl:top-[90px] left-1/2 xl:left-0 z-50 transform -translate-x-1/2 xl:-translate-x-0 rounded-[10px] overflow-hidden">
          <DateRange
            onChange={handleSelect}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={date}
            rangeColors={['#ed1d24']}
            minDate={addDays(new Date(), 0)}
          />
        </MenuItems>
      </div>
    </Menu>
  );
}
