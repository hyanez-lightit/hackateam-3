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

export const App = () => {
  const [msgAvailable, setMsgAvailable] = useState(false);
  
  return (
    <div className="flex h-screen flex-col">
      <style>{animation}</style>
      <ToastContainer position="bottom-right" pauseOnFocusLoss={false} />
      <div className="w-full h-full relative" style={{background: "url('https://d33v4339jhl8k0.cloudfront.net/docs/assets/5bbe96a22c7d3a04dd5b8761/images/5ea88836042863474d19c944/file-pR2XT8TZj1.png')"}}>
      
        <button onClick={() => {setMsgAvailable(!msgAvailable)}}
          className={`fixed bottom-12 right-2 h-20 w-20 bg-blue-800 hover:bg-blue-700 rounded-full flex items-center justify-center text-white p-3.5 transition-all ${msgAvailable ? 'pulse' : 'hover:scale-105'}`}>
          <div className='w-full h-full'>
            <img src="/public/logo.svg" alt="" />
          </div>
          {msgAvailable && <div className="absolute bg-blue-800 rounded-lg shadow right-[75%] bottom-[75%] text-black w-fit pl-6">
            <div className="bg-white h-full py-4 pl-4 pr-12 rounded-r-lg flex flex-col items-start gap-1">
              <span className='text-[#35388C] text-xs font-semilight uppercase'>Recommendation</span>
              <span className='text-[#4B5563] text-sm font-lg whitespace-nowrap'>Your patient may have Diabetes Type 2</span>
            </div>
          </div>}
        </button>
      
      </div>
      <footer
        className="flex w-full flex-col items-center justify-between bg-blue-800 py-2 text-white">
        <span className='text-xs'>Copyright © 2023 <strong className='text-lg'>hackat3am</strong> Uruguay/Argentina</span>
      </footer>
    </div>
  )
}