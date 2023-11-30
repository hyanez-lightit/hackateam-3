import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getDiagnosis } from './api/diagnosis.api';
import './app.css';
import { Message } from './message';
import { type Diagnosis } from './types';

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
`;

export const App = () => {
  const [msgAvailable, setMsgAvailable] = useState(false);
  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>();
  const [patientsMatched, setPatientsMatched] = useState<number>(0);

  const queryParameters = new URLSearchParams(window.location.search);
  const patientId = queryParameters.get('patientId');

  const fetchDiagnosis = async () => {
    try {
      if (!patientId) return;
      const response = await getDiagnosis(patientId);
      setDiagnosis(response.data.diagnosesPredicted);
      setPatientsMatched(response.data.patientsBasedPrediction.length);
    } catch (error) {
      console.log(error);
      setDiagnosis([]);
    }
  };

  useEffect(() => {
    void fetchDiagnosis();
  }, [patientId]);
  
  if (!diagnosis) return ;
  
  return (
    <div className="flex h-screen flex-col">
      <style>{animation}</style>
      <ToastContainer position="bottom-right" pauseOnFocusLoss={false} />
      {!patientId && (
        <div className="flex h-full flex-col items-center justify-center">
          <span className="text-2xl font-semibold text-blue-800">No PatientId provided</span>
        </div>
      )}
      {/* <div className="w-full h-full relative" style={{background: "url('https://d33v4339jhl8k0.cloudfront.net/docs/assets/5bbe96a22c7d3a04dd5b8761/images/5ea88836042863474d19c944/file-pR2XT8TZj1.png')"}}> */}
      <div className="relative h-full w-full">
        <div
          className={`fixed bottom-12 right-2 flex h-20 w-20 items-center justify-center rounded-full bg-blue-800 p-3.5 text-white transition-all hover:bg-blue-700 ${
            msgAvailable ? 'pulse' : 'hover:scale-105'
          }`}
        >
          <button
            className="h-full w-full"
            onClick={() => {
              setMsgAvailable(!msgAvailable);
            }}
          >
            <img src="/public/logo.svg" alt="" />
          </button>
          {msgAvailable && <Message diagnosis={diagnosis} patientsMatched={patientsMatched} />}
        </div>
      </div>
      <footer className="flex w-full flex-col items-center justify-between bg-blue-800 py-2 text-white">
        <span className="text-xs">
          Copyright © 2023 <strong className="text-lg">hackat3am</strong> Uruguay/Argentina
        </span>
      </footer>
    </div>
  );
};
