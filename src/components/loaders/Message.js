// src/components/Message.js
import React from 'react';

const Message = ({ variant = 'info', children }) => {
  return (
    <div className={`message message-${variant}`}>
      <style jsx>{`
        .message {
          padding: 16px;
          border-radius: 4px;
          margin: 10px 0;
          color: red;
          font-weight: bold;
        }
        .message-info {
          background-color: #007bff;
        }
        .message-success {
          background-color:#3B82F6;
        }
        .message-warning {
          background-color: #ffc107;
        }
        .message-error {
          background-color: #dc3545;
        }
      `}</style>
      {children}
    </div>
  );
};

export default Message;
