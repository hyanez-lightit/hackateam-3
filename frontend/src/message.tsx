import React, { useState } from 'react';

export const Message = () => {
  const [visibleInsights, toggleInsights] = useState(false);

  const diagnosis = "Diabetes Type 2";
  const patientSample = 4;
  
  return (
    <div className="absolute bg-blue-800 rounded-lg shadow-xl right-[75%] bottom-[75%] text-black w-fit pl-6">
      <div className="bg-white h-full py-4 pl-4 rounded-r-lg flex flex-col items-start gap-4 transition-all">
        <div className="flex flex-col pr-12 gap-1">
          <span className='text-[#35388C] text-sm font-semibold uppercase tracking-wide'>Possible diagnosis</span>
          <span className='text-[#4B5563] font-lg whitespace-nowrap'>Your patient may have <span className='font-semibold'>{diagnosis}</span></span>
          {visibleInsights && (
            <>
            <span className='text-[#35388C] text-sm font-semibold uppercase mt-4 tracking-wide'>Why</span>
            <span className='text-[#4B5563] font-lg whitespace-nowrap'>I found {patientSample} patients with similar history that evolved into a <span className='font-semibold'>{diagnosis}</span></span>
            </>
          )}
        </div>
        <div className="flex justify-end w-full pr-4">
          <button className="text-sm font-medium text-[#35388C]" onClick={() => {toggleInsights(!visibleInsights)}}>{visibleInsights ? "Hide insights" : "View insights"}</button>
        </div>
      </div>
    </div>
  )
}