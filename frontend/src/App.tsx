import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './app.css';

const animation = `
  .pulse {
    animation: pulse-animation 2s infinite;
  }

  @keyframes pulse-animation {
    0% {
      box-shadow: 0 0 0 0 rgba(12, 39, 166, 0.7);
    }
    
    70% {
      box-shadow: 0 0 0 10px rgba(12, 39, 166, 0);
    }
    
    100% {
      box-shadow: 0 0 0 0 rgba(12, 39, 166, 0);
    }
  }
`
const getPatients = async () => {
  const response = await api.get(`/diagnosis`);
  return response;
};

export const App = () => {
  const [msgAvailable, setMsgAvailable] = useState(false);
  const [visibleInsights, toggleInsights] = useState(false);

  const patients = getPatients();
  console.log(patients);
  
  const diagnosis = "Diabetes Type 2";
  const patientSample = 4;
  
  return (
    <div className="flex h-screen flex-col">
      <style>{animation}</style>
      <ToastContainer position="bottom-right" pauseOnFocusLoss={false} />
      {/* <div className="w-full h-full relative" style={{background: "url('https://d33v4339jhl8k0.cloudfront.net/docs/assets/5bbe96a22c7d3a04dd5b8761/images/5ea88836042863474d19c944/file-pR2XT8TZj1.png')"}}> */}
      <div className="w-full h-full relative">
        <div
          className={`fixed bottom-12 right-2 h-20 w-20 bg-blue-800 hover:bg-blue-700 rounded-full flex items-center justify-center text-white p-3.5 transition-all ${msgAvailable ? 'pulse' : 'hover:scale-105'}`}>
          <button className='w-full h-full' onClick={() => {
              setMsgAvailable(!msgAvailable);
              toggleInsights(false);
            }}>
            <img src="/public/logo.svg" alt="" />
          </button>
          {msgAvailable && <div className="absolute bg-blue-800 rounded-lg shadow-xl right-[75%] bottom-[75%] text-black w-fit pl-6">
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
          </div>}
        </div>
      
      </div>
      <footer
        className="flex w-full flex-col items-center justify-between bg-blue-800 py-2 text-white">
        <span className='text-xs'>Copyright © 2023 <strong className='text-lg'>hackat3am</strong> Uruguay/Argentina</span>
      </footer>
    </div>
  )
}