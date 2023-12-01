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
      box-shadow: 0 0 0 0 rgba(6, 182, 212, 0.7);
    }
    
    70% {
      box-shadow: 0 0 0 10px rgba(6, 182, 212, 0);
    }
    
    100% {
      box-shadow: 0 0 0 0 rgba(6, 182, 212, 0);
    }
  }

  .pulse-brain {
    animation: pulse-brain-animation 2s infinite;
  }

  @keyframes pulse-brain-animation {
    0% {
      transform: scale(1);
    }
    
    70% {
      transform: scale(1.15);
    }
    
    100% {
      transform: scale(1);
    }
  }
`;

export const App = () => {
  const [msgAvailable, setMsgAvailable] = useState(false);
  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>();
  const [patientsMatched, setPatientsMatched] = useState<number>(0);
  const [matchedDiagnosis, setMatchedDiagnosis] = useState<Diagnosis[]>([]);

  const queryParameters = new URLSearchParams(window.location.search);
  const patientId = queryParameters.get('patientId');

  const fetchDiagnosis = async () => {
    try {
      if (!patientId) return;
      const response = await getDiagnosis(patientId);
      setDiagnosis(response.data.diagnosesPredicted);
      setPatientsMatched(response.data.patientsBasedPrediction.length);
      setMatchedDiagnosis(response.data.diagnosesMatched);
    } catch (error) {
      console.log(error);
      setDiagnosis([]);
    }
  };

  useEffect(() => {
    void fetchDiagnosis();
  }, [patientId]);

  useEffect(() => {
    if (diagnosis && diagnosis.length > 0) {
      setMsgAvailable(true);
    }
  }, [diagnosis])
  
  return (
    <div className="flex h-screen flex-col">
      <style>{animation}</style>
      <ToastContainer position="bottom-right" pauseOnFocusLoss={false} />
      {!patientId && (
        <div className="flex h-full flex-col items-center justify-center">
          <span className="text-2xl font-semibold text-blue-800">No PatientId provided</span>
        </div>
      )}
      <div className="w-full h-full relative bg-no-repeat bg-contain" style={{backgroundImage: "url('https://d33v4339jhl8k0.cloudfront.net/docs/assets/5bbe96a22c7d3a04dd5b8761/images/5ea88836042863474d19c944/file-pR2XT8TZj1.png')"}}>
        <div className='absolute top-0 bottom-0 left-0 right-0' style={{background: 'linear-gradient(130deg, rgba(229,232,237,0) 93%, rgba(120,120,120,1) 100%)'}} />
      {/* <div className="relative h-full w-full"> */}
        <div
          className={`fixed bottom-4 right-4 flex h-20 w-20 items-center justify-center rounded-full p-3.5 text-white transition-all ${
            msgAvailable ? 'pulse' : 'hover:scale-105'
          }
          ${!diagnosis || diagnosis.length === 0 ? 'bg-blue-900' : 'bg-cyan-500 hover:bg-cyan-600'}`}
        >
          <button
            className="h-full w-full"
            onClick={() => {
              setMsgAvailable(diagnosis?.length > 0 ? !msgAvailable : false);
            }}
          >
            {diagnosis?.length === 0 ? (
              <div className='text-xs'>AFK</div>
            ) : (
              <img className={`${(!diagnosis || diagnosis?.length === 0) ? 'pulse-brain opacity-75' : ''}`} src="/public/logo.svg" alt="" />
            )}
          </button>
          {msgAvailable && diagnosis && <Message onClose={() => {setMsgAvailable(false)}} diagnosis={diagnosis} patientsMatched={patientsMatched} matchedDiagnosis={matchedDiagnosis} />}
        </div>
      </div>
    </div>
  );
};