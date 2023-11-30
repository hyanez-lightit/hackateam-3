import { type ReactNode } from 'react';

export type Route = {
  path: string;
  element: ReactNode;
  private?: boolean;
  labelLID?: string;
};
