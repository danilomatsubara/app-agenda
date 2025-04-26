"use client";

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#e74c3c" />
        <link rel="apple-touch-icon" href="/icons/icon-180x180.png" />
      </head>
      <body>
        <SessionProvider>
          <div className="container">
            {children}
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
