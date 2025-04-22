import React from 'react';
import { Toaster } from 'react-hot-toast';

const CustomToaster = () => (
  <Toaster
    position="top-right"
    toastOptions={{
      style: {
        background: 'linear-gradient(to right, #4822dd, #8222c2, #ff299c)',
        color: '#fff',
        boxShadow: '0 0 20px rgba(255, 41, 156, 0.6), inset 0 0 10px rgba(72, 34, 221, 0.5)',
        borderRadius: '8px',
        padding: '16px',
      },
    }}
  />
);

export default CustomToaster;
