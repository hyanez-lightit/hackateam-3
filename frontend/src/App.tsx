import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getDiagnosis } from './api/diagnosis.api';
import './app.css';
import { Message } from './message';
import { type Diagnosis } from './types';
import { classNames } from './utils';

const bgImage = "url('https://d33v4339jhl8k0.cloudfront.net/docs/assets/5bbe96a22c7d3a04dd5b8761/images/5ea88836042863474d19c944/file-pR2XT8TZj1.png')";

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

    40% {
      transform: scale(1.10);
    }

    60% {
      transform: scale(1.10);
    }
    
    100% {
      transform: scale(1);
    }
  }
`;

export const App = () => {
  const [viewApp, setViewApp] = useState(false);

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
    if (viewApp) {
      void fetchDiagnosis();
    }
  }, [patientId, viewApp]);

  useEffect(() => {
    if (diagnosis && diagnosis.length > 0) {
      setMsgAvailable(true);
    }
  }, [diagnosis]);

  const isDisabled = !diagnosis || diagnosis.length === 0;

  return viewApp ? (
    <div className="flex h-screen flex-col">
      <style>{animation}</style>
      <ToastContainer position="bottom-right" pauseOnFocusLoss={false} />
      {!patientId && (
        <div className="flex h-full flex-col items-center justify-center">
          <span className="text-2xl font-semibold text-blue-800">No PatientId provided</span>
        </div>
      )}
      <div
        className="relative h-full w-full bg-contain bg-no-repeat"
        style={{ backgroundImage: bgImage }}
      >
        <div
          className="absolute bottom-0 left-0 right-0 top-0"
          style={{
            background:
              'linear-gradient(130deg, rgba(229,232,237,0) 93%, rgba(120,120,120,1) 100%)',
          }}
        />
        <div
          className={`fixed flex h-20 w-20 items-center justify-center rounded-full p-3.5 text-white transition-all duration-300 ${
            msgAvailable ? 'pulse' : 'hover:scale-90 scale-75'
          }
          ${
            isDisabled
              ? 'cursor-not-allowed bg-gray-500 scale-75 bottom-2 right-2'
              : 'bg-cyan-500 hover:bg-cyan-600 bottom-4 right-4'
          }`}
        >
          <button
            className={classNames(isDisabled ? 'cursor-not-allowed' : '', 'h-full w-full')}
            onClick={() => {
              setMsgAvailable(diagnosis?.length > 0 ? !msgAvailable : false);
            }}
            disabled={isDisabled}
            title={isDisabled ? "I'm looking for possible connections to other patients" : ''}
          >
            {diagnosis?.length === 0 ? (
              <div className="text-xs">AFK</div>
            ) : (
              <img
                className={`${
                  !diagnosis || diagnosis?.length === 0 ? 'pulse-brain opacity-75' : ''
                }`}
                src="/public/logo.svg"
                alt=""
              />
            )}
          </button>
          {msgAvailable && diagnosis && (
            <Message
              onClose={() => {
                setMsgAvailable(false);
              }}
              diagnosis={diagnosis}
              patientsMatched={patientsMatched}
              matchedDiagnosis={matchedDiagnosis}
            />
          )}
        </div>
      </div>
    </div>
  ) : (
    <button
      className="flex h-screen w-full flex-col items-center justify-center gap-6 bg-gray-800 uppercase tracking-widest text-white"
      onClick={() => {
        setViewApp(true);
      }}
    >
      <style>{animation}</style>
      <img className="pulse-brain h-48 w-48" src="/public/logo.svg" alt="" />
      <span className='text-[4rem] tracking-[2rem]'>healthMate</span>
      <span className='text-3xl mt-12'>Click anywhere to start</span>
      <div className="text-xs">hackat3am</div>
    </button>
  );
};
