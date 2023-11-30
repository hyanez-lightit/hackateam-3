import React from 'react';
import { HomeScreen, NotFoundScreen } from './features';
import { type Route } from './types';

export const routes: Route[] = [
  { path: '*', element: <NotFoundScreen /> },
  {
    path: '/',
    element: <HomeScreen />,
  },
];
