import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './app.css';
import { routes } from './routes';

export const App = () => (
  <div className="flex h-screen flex-col">
    <ToastContainer position="bottom-right" pauseOnFocusLoss={false} />
    <BrowserRouter>
      <div className="mt-24 w-full" />
    
      <Routes>
        {routes.map((route) => (
          <Route path={route.path} element={route.element} key={route.path} />
        ))}
      </Routes>
      <footer
        className="flex w-full flex-col items-center justify-between 
      bg-blue-800 py-5 text-white"
      >
        Copyright © 2023 hackat3am Uruguay
      </footer>
    </BrowserRouter>
  </div>
);
