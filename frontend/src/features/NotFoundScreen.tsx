import React from 'react';
import { useNavigate } from 'react-router-dom';
import { goToTop } from '../utils';

export const NotFoundScreen = () => {
  const navigate = useNavigate();
  return (
    <div className="not-found my-20 flex h-screen flex-col items-center justify-center">
      <br />
      <p className="mb-10 text-2xl">Screen not found </p>
      <p className="mb-6 text-xl">Go back</p>
      <button
        onClick={() => {
          goToTop();
          navigate('/', { replace: true });
        }}
      >
        Go back
      </button>
    </div>
  );
};
