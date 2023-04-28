import React from 'react';
import { useChromeStorageLocal } from 'use-chrome-storage';

export default function App() {
  const [value, setValue, isPersistent, error, isInitialStateResolved] = useChromeStorageLocal('token', "");
  // const pages = routes
  return (
    <div className="pod-order-react-chrome-app">
      <header className="App-header">
        <div>Value: {value}</div>
        <button
          onClick={() => {
            setValue(prev => "ABC123");
          }}
        >
          Increment in Local Storage
        </button>
      </header>
    </div>
  );
}