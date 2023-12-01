import React, { useState } from 'react';
import { type Diagnosis } from './types';
import { XMarkIcon, ChevronUpIcon } from '@heroicons/react/24/solid'

type props = {
  diagnosis: Diagnosis[] | undefined;
  patientsMatched: number;
  matchedDiagnosis: Diagnosis[];
  onClose: () => void;
}
export const Message = ({ diagnosis, patientsMatched, matchedDiagnosis, onClose }: props) => {
  const [visibleInsights, toggleInsights] = useState(false);
  
  if (!diagnosis) return;

  const diagnosisLabel = diagnosis[0].name;
  return (
    <div className="absolute bg-cyan-500 rounded-lg shadow-2xl shadow-gray-400 right-[75%] bottom-[75%] text-black w-fit pl-6">
      <div className="bg-white h-full py-4 pl-4 rounded-r-lg flex flex-col items-start gap-4 transition-all">
        <div className="flex flex-col gap-1 pr-2">
          <div className="flex items-center justify-between">
            <span className='text-[#35388C] text-sm font-semibold uppercase tracking-wide'>Possible future affliction</span>
            <button onClick={onClose} className='hover:bg-gray-100 p-2 rounded-full'>
              <XMarkIcon className='w-4 h-4' />
            </button>
          </div>
          <span className='text-[#4B5563] font-lg whitespace-nowrap pr-12'>Your patient may develop <span className='font-semibold'>{diagnosisLabel}</span></span>
          {visibleInsights && (
            <>
            <span className='text-[#35388C] text-sm font-semibold uppercase mt-6 tracking-wide'>What I found</span>
            <span className='text-[#4B5563] font-lg'>I found {patientsMatched} patients that share <span className='font-semibold'>{matchedDiagnosis.map((d) => d.name).join(', ')}</span> and they also developed <span className='font-semibold'>{diagnosisLabel}</span></span>
            </>
          )}
        </div>
        <div className="flex items-center w-full pr-4 justify-end gap-2">
          <a href={`https://www.webmd.com/search?query=${diagnosisLabel}`} target='_blank' rel='noreferrer'>
            <button className="flex items-center gap-2 text-sm font-medium text-[#35388C] hover:bg-gray-100 hover:text-blue-800 rounded-full py-2 px-4">
              Check WebMD
            </button>
          </a>
          <button className="flex items-center gap-2 text-sm font-medium text-[#35388C] hover:bg-gray-100 hover:text-blue-800 rounded-full py-2 px-4" onClick={() => {toggleInsights(!visibleInsights)}}>
            {visibleInsights ? "Hide insights" : "View insights"}
            <ChevronUpIcon className={`w-4 h-4 transition-all ${visibleInsights ? 'rotate-180' : 'rotate-0'}`} />
          </button>
        </div>
      </div>
    </div>
  )
}