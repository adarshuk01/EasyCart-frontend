// src/components/Loader.js
import React from 'react';

const Loader = () => {
  return (
    <div className="loader">
      <style jsx>{`
        .loader {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 15px;
        }

        .loader::after {
          content: "";
          border: 6px solid #f3f3f3;
          border-top: 6px solid #3498db;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <div>Loading...</div>
    </div>
  );
};

export default Loader;
